import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";
import {
    composeContext,
    elizaLogger,
    generateMessageResponse,
} from "@elizaos/core";
import { fetchAllProjects } from "../services";
import { getScoreProjectsExamples } from "../examples";
import { scoreProjectTemplate } from "../templates";

function calculateProjectScores(projects) {
    // Map runway values to scores
    const runwayScores = {
        "1 to 6 months": 0.33,
        "6 to 12 months": 0.66,
        "More than 12 months": 1.0,
    };

    // Map social media values to scores
    const socialMediaScores = {
        "More than 50K": 1.5,
        "10K to 50K": 1.0,
        "3K to 10K": 0.66,
        "Less than 3K": 0.33,
    };

    // Map token launched values to scores
    const tokenLaunchedScores = {
        "Yes, provide details": 0,
        "No, we have not launched a token": 1,
    };

    // Array to store results for all projects
    const results = [];

    // Iterate over each project in the array
    for (const project of projects) {
        // Calculate individual scores
        const runwayScore = runwayScores[project.runway];
        const socialMediaScore = socialMediaScores[project.socialMedia];
        const tokenLaunchedScore = tokenLaunchedScores[project.tokenLaunched];

        // Calculate total score
        const totalScore =
            runwayScore * 0.2 +
            socialMediaScore * 0.15 +
            tokenLaunchedScore * 0.5;

        // Add the result for this project to the results array
        results.push({
            project_name: project.project_name,
            runway_score: runwayScore,
            socialMedia_score: socialMediaScore,
            tokenLaunched_score: tokenLaunchedScore,
            total_score: totalScore,
        });
    }
    results.sort((a, b) => b.total_score - a.total_score);

    return results.map((project, index) => ({
        rank: index + 1,
        ...project,
        // Add new sorted index
    }));
}
export const scoreQACCProjects: Action = {
    name: "SCORE_QACC_PROJECTS",
    similes: [
        "RANK_PROJECTS",
        "PROJECT_EVALUATION",
        "TOP_PROJECTS",
        "PROJECT_SCORING",
        "BEST_PROJECTS",
    ],
    description: "AI-powered scoring and ranking of QACC projects",

    validate: async (runtime: IAgentRuntime) => true,

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        try {
            // Fetch all projects
            const allProjects = await fetchAllProjects();
            elizaLogger.success("Successfully fetched QACC projects");

            const projectData = allProjects.map((project) => ({
                project_name: project["Project name"], // Extract project name
                runway: project["What is your current financial runway?"],
                socialMedia:
                    project[
                        "What is your estimated total social media reach across all platforms?"
                    ],
                // projectCateory:
                //     project[
                //         "Which of the following categories does your project fit in?"
                //     ],
                tokenLaunched:
                    project["Has your project already launched a token?"],
            }));

            // console.log(projectData);

            const content: any = calculateProjectScores(projectData);
            console.log(content);

            try {
            } catch (parseError) {
                throw new Error("Failed to parse AI scoring response");
            }

            // Prepare callback response
            if (callback) {
                callback({
                    text: "Projects scored and ranked by AI evaluation:",
                    content: {
                        action: "SCORE_QACC_PROJECTS",
                        totalProjects: allProjects.length,
                        projects: content,
                    },
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in SCORE_QACC_PROJECTS handler:", error);

            callback({
                text: `Error scoring projects: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },

    examples: getScoreProjectsExamples as ActionExample[][],
} as Action;
