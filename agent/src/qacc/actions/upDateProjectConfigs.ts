import { composeContext, elizaLogger } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { updateProjectConfigsExamples } from "../examples";

interface ProjectScores {
    marketing: number;
    product: number;
    teamAssessment: number;
    financial: number;
}

export const updateProjectConfigs: Action = {
    name: "UPDATE_PROJECT_CONFIGS",
    similes: [
        "CHANGE_PROJECT_CONFIGS",
        "UPDATE_CONFIGS",
        "MODIFY_PROJECT_SETTINGS",
        "CHANGE_COMPARISON_VALUES",
        "UPDATE_COMPARISON_CONFIGS",
        "MODIFY_PROJECT_SCORES",
    ],
    description:
        "Update the configuration values for project comparison scoring.",

    validate: async (runtime: IAgentRuntime) => {
        return true;
    },

    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        try {
            // Initialize state if needed
            // if (!state) {
            //     state = (await runtime.composeState(message)) as State;
            // }

            // Parse the message content to extract config values
            const configValues = parseConfigMessage(message.content.text);
            console.log(configValues);

            // Update state with new configs
            state.projectConfigs = configValues;

            elizaLogger.success(
                "Successfully updated project configuration values"
            );

            // Send success response

            callback({
                text: "Project comparison configurations have been updated successfully.",
                content: {
                    action: "UPDATE_PROJECT_CONFIGS",
                    status: "success",
                    configs: configValues,
                },
            });
            return true;
        } catch (error) {
            elizaLogger.error(
                "Error in UPDATE_PROJECT_CONFIGS handler:",
                error
            );

            callback({
                text: `Error updating project configs: ${error.message}`,
                content: {
                    status: "error",
                    error: error.message,
                },
            });

            return false;
        }
    },
    examples: updateProjectConfigsExamples as ActionExample[][],
} as Action;

// Helper function to parse the config message
function parseConfigMessage(message: string): ProjectScores {
    const scores: ProjectScores = {
        marketing: 0,
        product: 0,
        teamAssessment: 0,
        financial: 0,
    };

    // Extract values using regex
    const marketingMatch = message.match(/Marketing:\s*(\d+)/i);
    const productMatch = message.match(/Product:\s*(\d+)/i);
    const teamMatch = message.match(/Team:\s*(\d+)/i);
    const financialMatch = message.match(/Financial:\s*(\d+)/i);

    if (marketingMatch) scores.marketing = parseInt(marketingMatch[1]);
    if (productMatch) scores.product = parseInt(productMatch[1]);
    if (teamMatch) scores.teamAssessment = parseInt(teamMatch[1]);
    if (financialMatch) scores.financial = parseInt(financialMatch[1]);

    return scores;
}
