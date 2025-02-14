import { ActionExample, composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    Action,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";
import { fetchAllProjects } from "../services";
import { generateCompareTemplateTest } from "../helpers/projectHelper";
import { getProjectNamesForComparisonTemplate } from "../templates";
import { compareSpecificProjectsExamples } from "../examples";

// Helper function to find projects by name
function findProjectsByNames(
    allProjects: any[],
    projectNames: string[]
): any[] {
    return projectNames.reduce((result: any[], name) => {
        const project = allProjects.find(
            (p) => p["Project name"].toLowerCase() === name.toLowerCase()
        );
        if (!project) {
            elizaLogger.error(`Project "${name}" not found`);
            return result; // Skip this project and move to the next
        }

        result.push(project);
        return result;
    }, []);
}

function generateRandomPairs(projects: any[]): [any, any][] {
    const pairs: [any, any][] = [];
    const remainingProjects = [...projects];

    while (remainingProjects.length >= 2) {
        const randomIndex1 = Math.floor(
            Math.random() * remainingProjects.length
        );
        const project1 = remainingProjects.splice(randomIndex1, 1)[0];

        const randomIndex2 = Math.floor(
            Math.random() * remainingProjects.length
        );
        const project2 = remainingProjects.splice(randomIndex2, 1)[0];

        pairs.push([project1, project2]);
    }

    // Handle odd number of projects
    if (remainingProjects.length === 1) {
        pairs.push([remainingProjects[0], projects[projects.length - 1]]);
    }

    return pairs;
}

export const compareSpecificProjectsAction: Action = {
    name: "COMPARE_SPECIFIC_QACC_PROJECTS",
    similes: [
        "COMPARE_NAMED_PROJECTS",
        "COMPARE_SELECTED_PROJECTS",
        "ANALYZE_SPECIFIC_PROJECTS",
        "EVALUATE_CHOSEN_PROJECTS",
    ],
    description: "Compare specific QACC projects by their names",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        const getProjectNamesContext = composeContext({
            state,
            template: getProjectNamesForComparisonTemplate,
        });

        const content = await generateMessageResponse({
            runtime,
            context: getProjectNamesContext,
            modelClass: ModelClass.MEDIUM,
        });

        console.log(content, "content");

        try {
            // Get project names from the message
            const projectNames = content.project_names as string[];
            console.log(projectNames);

            // Fetch all projects
            let allProjects = [];
            if (runtime.cacheManager.get("currentCSVData")) {
                allProjects = await runtime.cacheManager.get("currentCSVData");
                elizaLogger.success("Got data from cache Manager");
            } else {
                allProjects = await fetchAllProjects();
            }

            elizaLogger.success("Got All Project");

            // Find the specified projects
            const selectedProjects = findProjectsByNames(
                allProjects,
                projectNames
            );
            elizaLogger.success("Got Selected Projects");

            // Generate all possible pairs for comparison
            const projectPairs = generateRandomPairs(selectedProjects);

            const projectsScored = [];

            // Compare each pair
            const comparisons = await Promise.all(
                projectPairs.map(async (pair) => {
                    const template = generateCompareTemplateTest(
                        pair[0],
                        pair[1]
                    );

                    try {
                        const comparisonContext = composeContext({
                            state,
                            template: template,
                        });

                        const analysisResponse = await generateMessageResponse({
                            runtime,
                            context: comparisonContext,
                            modelClass: ModelClass.MEDIUM,
                        });

                        const res = {
                            ...analysisResponse,
                            first_project: pair[0],
                            second_project: pair[1],
                        };

                        console.log(
                            "Compared " +
                                pair[0]["Project name"] +
                                " with " +
                                pair[1]["Project name"]
                        );

                        projectsScored.push(res);
                    } catch (e) {
                        console.log(
                            "Error comparing",
                            pair[0]["Project name"],
                            "with",
                            pair[1]["Project name"],
                            ":",
                            e
                        );
                    }
                })
            );

            if (callback) {
                callback({
                    text: `Completed ${projectPairs.length} comparisons between the specified projects: ${projectNames.join(", ")}.`,
                    content: {
                        action: "COMPARE_SPECIFIC_QACC_PROJECTS",
                        projects_compared: projectNames,
                        total_comparisons: projectsScored.length,
                        projectsCompared: projectsScored,
                    },
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error(
                "Error in COMPARE_SPECIFIC_QACC_PROJECTS handler:",
                error
            );

            callback({
                text: `Error comparing projects: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: compareSpecificProjectsExamples as ActionExample[][],
} as Action;