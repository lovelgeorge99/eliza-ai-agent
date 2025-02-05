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
    return projectNames.map((name) => {
        const project = allProjects.find(
            (p) => p["Project name"].toLowerCase() === name.toLowerCase()
        );
        if (!project) {
            throw new Error(`Project "${name}" not found`);
        }
        return project;
    });
}

// Helper function to generate all possible pairs from an array of projects
function generateAllPairs(projects: any[]): [any, any][] {
    const pairs: [any, any][] = [];
    for (let i = 0; i < projects.length - 1; i++) {
        for (let j = i + 1; j < projects.length; j++) {
            pairs.push([projects[i], projects[j]]);
        }
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

        // context -> content
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

            // Find the specified projects
            const selectedProjects = findProjectsByNames(
                allProjects,
                projectNames
            );

            // Generate all possible pairs for comparison
            const projectPairs = generateAllPairs(selectedProjects);

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

                        console.log(
                            "Compared " +
                                pair[0]["Project name"] +
                                " with " +
                                pair[1]["Project name"]
                        );

                        projectsScored.push(analysisResponse);
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
