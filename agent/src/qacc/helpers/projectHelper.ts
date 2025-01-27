import {
    composeContext,
    elizaLogger,
    generateMessageResponse,
    IAgentRuntime,
    ModelClass,
    State,
} from "@elizaos/core";

// templates.ts
export const getSummaryTemplate = (data: any) => {
    return `Analyze the following project data and generate a comprehensive summary.

Project : "${data}"

Respond with a JSON object that contains:
1. A concise summary of the project's core functionality and purpose in about 200 words
2. Key technical features and implementation details
3. Main benefits and target users

Example response format:
\\\\json
{
  "summary": "Brief overall summary of the project",
  "technical_features": ["Feature 1", "Feature 2", "Feature 3"],
  "benefits": ["Benefit 1", "Benefit 2"],
  "target_users": ["User type 1", "User type 2"]
}
\\\\

Generate a JSON response based on the project brief provided above.`;
};

// helpers.ts
export const generateSummary = async (
    runtime: IAgentRuntime,
    state: State,
    data: any
) => {
    try {
        // Create dynamic template using the data
        const template = getSummaryTemplate(data);

        // Compose context with state and template
        const summaryContext = composeContext({
            state,
            template,
        });

        // Generate the summary using the context
        const aiSummary = await generateMessageResponse({
            runtime,
            context: summaryContext,
            modelClass: ModelClass.SMALL,
        });

        return aiSummary;
    } catch (error) {
        elizaLogger.error("Error generating summary:", error);
        throw error;
    }
};
