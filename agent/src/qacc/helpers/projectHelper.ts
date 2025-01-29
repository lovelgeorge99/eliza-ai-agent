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

export const generateCompareTemplate = (project1, project2) => {
    return `You are evaluating two blockchain projects to determine which one shows more promise. Perform a detailed analysis of the following metrics:

    If you encoutner any error just return empty values
    \\\json
    {

        "project1": "${project1["Project name"]}",
        "project2": "${project2["Project name"]}",

        "selected_project": "",

        "detailed_reasoning": "",
        "risk_factors": "",
        "recommendation_confidence": ""
    }
    \\\

    1. Financial Health Analysis:
       - Monthly Burn Rate: ${project1["What is your monthly burn rate?"]} vs ${project2["What is your monthly burn rate?"]}
       - Financial Runway: ${project1["What is your current financial runway?"]} vs ${project2["What is your current financial runway?"]}
       - Current Revenue: ${project1["What is your current revenue?"]} vs ${project2["What is your current revenue?"]}
       - Total Funding: ${project1["How much have you already raised for this project?"]} vs ${project2["How much have you already raised for this project?"]}

    2. Development Status:
       - Polygon zkEVM Status: ${project1["Has your project already been deployed on Polygon zkEVM?"]} vs ${project2["Has your project already been deployed on Polygon zkEVM?"]}
       - Multi-chain Presence: ${project1["Is your project already deployed on, or will it be deployed on, other chains?"]} vs ${project2["Is your project already deployed on, or will it be deployed on, other chains?"]}
       - Project Stage: ${project1["How would you describe the stage of this project?"]} vs ${project2["How would you describe the stage of this project?"]}

    3. Token Status:
       - Token Launch Status: ${project1["Has your project already launched a token?"]} vs ${project2["Has your project already launched a token?"]}

    4. Project Information:
       - Project Brief: ${project1["Project brief"]} vs ${project2["Project brief"]}
       - Additional Information: ${project1["Project more info"]} vs ${project2["Project more info"]}

    Evaluation Criteria (in order of importance):
    1. Financial Sustainability
       - Prefer lower burn rates
       - Value longer runways
       - Consider revenue generation
       - Evaluate funding efficiency

    2. Technical Implementation
       - Prioritize Polygon zkEVM deployment
       - Value multi-chain strategy
       - Consider development stage

    3. Market Position
       - Evaluate token strategy (prefer pre-token)
       - Assess market differentiation
       - Consider competition and unique value proposition

    4. Documentation & Clarity
       - Quality of project documentation
       - Clarity of vision and roadmap
       - Technical sophistication

    Compare ${project1["Project name"]} with ${project2["Project name"]} and provide a detailed analysis in the following JSON format:

    \\\json
    {

        "project1": "${project1["Project name"]}",
        "project2": "${project2["Project name"]}"

        "selected_project": "Name of the better project",

        "detailed_reasoning": "Provide a comprehensive analysis with specific metrics, comparing actual values and explaining why the selected project is superior. Include specific numbers and percentages where possible.",
        "risk_factors": "List potential risks or concerns for the selected project",
        "recommendation_confidence": "High/Medium/Low"
        "recommendation_confidence explanation":"explanation for the confidence"
    }
    \\\
    `;
};
