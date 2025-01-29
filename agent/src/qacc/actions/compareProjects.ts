import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";
import { compareQACCProjectsExamples } from "../examples";
import { fetchAllProjects } from "../services";
import { generateCompareTemplate } from "../helpers/projectHelper";

// Helper function to generate random pairs
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
        pairs.push([remainingProjects[0], projects[0]]); // Compare with first project
    }

    return pairs;
}

export const compareProjectsAction: Action = {
    name: "COMPARE_QACC_PROJECTS",
    similes: [
        "COMPARE_PROJECTS",
        "PROJECT_COMPARISON",
        "EVALUATE_PROJECTS",
        "RANK_PROJECTS",
        "ANALYZE_PROJECTS",
        "MATCH_PROJECTS",
        "ASSESS_PROJECTS",
    ],
    description:
        "Compare QACC projects in random pairs based on multiple criteria.",
    validate: async (runtime: IAgentRuntime) => {
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

        try {
            const allProjects = await fetchAllProjects();
            elizaLogger.success("Successfully fetched projects for comparison");

            const projectsScored = [];
            const projectPairs = generateRandomPairs(allProjects);
            const comparisons = await Promise.all(
                projectPairs.map(async (pair, index) => {
                    const firstProject = {
                        "Project name": pair[0]["Project name"],
                        "Project brief": pair[0]["Project brief"],
                        "Project more info": pair[0]["Project more info"],
                        "Has your project already launched a token?":
                            pair[0][
                                "Has your project already launched a token?"
                            ],
                        "How would you describe the stage of this project?":
                            pair[0][
                                "How would you describe the stage of this project?"
                            ],
                        "Has your project already been deployed on Polygon zkEVM?":
                            pair[0][
                                "Has your project already been deployed on Polygon zkEVM?"
                            ],
                        "Is your project already deployed on, or will it be deployed on, other chains?":
                            pair[0][
                                "Is your project already deployed on, or will it be deployed on, other chains?"
                            ],
                        "What is your current revenue?":
                            pair[0]["What is your current revenue?"],
                        "How much have you already raised for this project?":
                            pair[0][
                                "How much have you already raised for this project?"
                            ],
                        "What is your monthly burn rate?":
                            pair[0]["What is your monthly burn rate?"],
                        "What is your current financial runway?":
                            pair[0]["What is your current financial runway?"],
                    };

                    const secondProject = {
                        "Project name": pair[1]["Project name"],
                        "Project brief": pair[1]["Project brief"],
                        "Project more info": pair[1]["Project more info"],
                        "Has your project already launched a token?":
                            pair[1][
                                "Has your project already launched a token?"
                            ],
                        "How would you describe the stage of this project?":
                            pair[1][
                                "How would you describe the stage of this project?"
                            ],
                        "Has your project already been deployed on Polygon zkEVM?":
                            pair[1][
                                "Has your project already been deployed on Polygon zkEVM?"
                            ],
                        "Is your project already deployed on, or will it be deployed on, other chains?":
                            pair[1][
                                "Is your project already deployed on, or will it be deployed on, other chains?"
                            ],
                        "What is your current revenue?":
                            pair[1]["What is your current revenue?"],
                        "How much have you already raised for this project?":
                            pair[1][
                                "How much have you already raised for this project?"
                            ],
                        "What is your monthly burn rate?":
                            pair[1]["What is your monthly burn rate?"],
                        "What is your current financial runway?":
                            pair[1]["What is your current financial runway?"],
                    };

                    const template = generateCompareTemplate(
                        firstProject,
                        secondProject
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
                                firstProject["Project name"] +
                                " with " +
                                secondProject["Project name"]
                        );
                        console.log(analysisResponse);

                        projectsScored.push(analysisResponse);
                    } catch (e) {
                        console.log(
                            "Error ",
                            firstProject["Project name"] +
                                " " +
                                secondProject["Project name"]
                        );
                    }
                })
            );

            if (callback) {
                callback({
                    text: `Completed ${projectPairs.length} project comparisons.`,
                    content: {
                        action: "COMPARE_QACC_PROJECTS",
                        total_comparisons: projectPairs.length,
                        projectsCompared: projectsScored,
                    },
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in COMPARE_QACC_PROJECTS handler:", error);

            callback({
                text: `Error comparing projects: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: compareQACCProjectsExamples as ActionExample[][],
} as Action;
