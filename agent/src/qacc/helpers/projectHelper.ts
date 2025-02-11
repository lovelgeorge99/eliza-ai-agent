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
        "not_selected_project":"",

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
        "not_selected_project":"Name of the other project",

        "detailed_reasoning": "Provide a comprehensive analysis with specific metrics, comparing actual values and explaining why the selected project is superior. Include specific numbers and percentages where possible.",
        "risk_factors": "List potential risks or concerns for the selected project",
        "recommendation_confidence": "High/Medium/Low"
        "recommendation_confidence explanation":"explanation for the confidence"
    }
    \\\
    `;
};

export const generateCompareTemplateTest = (project1, project2, configs?) => {
    return `You are evaluating two blockchain projects to determine which one shows more promise. Your evaluation should focus on identifying both high-performing and promising early-stage projects using a weighted scoring system across four key areas.

    If you encounter any error just return empty values
    \\\\json
    {
        "project1": "${project1["Project name"]}",
        "project2": "${project2["Project name"]}",
        "selected_project": "",
         "not_selected_project":"",
        "detailed_reasoning": "",
        "risk_factors": "",
        "recommendation_confidence": "",
        "recommendation_confidence_explanation": "",
        "marketing": 0,
        "product": 0,
        "team": 0,
        "finance": 0,
        "total_weighted_score": 0

    }
    \\\\

    Project Data Analysis:

    1. Marketing Assessment (40%):
       - Social Media & Community:
         * Total Reach: ${project1["What is your estimated total social media reach across all platforms?"]} vs ${project2["What is your estimated total social media reach across all platforms?"]}
         * Social Presence: ${project1["Please provide social media links for your project."]} vs ${project2["Please provide social media links for your project."]}
         * Engagement Strategy: ${project1["What are your community engagement strategies?"]} vs ${project2["What are your community engagement strategies?"]}
       - Market Influence:
         * KOL Support: ${project1["Who are the subject matter experts and KOL (key opinion leaders) that will promote your project and participate in the initialization phase?"]} vs ${project2["Who are the subject matter experts and KOL (key opinion leaders) that will promote your project and participate in the initialization phase?"]}
       - Market Position:
         * Competitors: ${project1["Who are your main competitors?"]} vs ${project2["Who are your main competitors?"]}
         * Differentiation: ${project1["What differentiates your product from the competition?"]} vs ${project2["What differentiates your product from the competition?"]}

    2. Product Evaluation (30%):
       - Project Overview:
         * Brief: ${project1["Project brief"]} vs ${project2["Project brief"]}
         * Additional Info: ${project1["Project more info"]} vs ${project2["Project more info"]}
         * Category: ${project1["Which of the following categories does your project fit in?"]} vs ${project2["Which of the following categories does your project fit in?"]}
       - Development Status:
         * Stage: ${project1["How would you describe the stage of this project?"]} vs ${project2["How would you describe the stage of this project?"]}
         * Polygon zkEVM: ${project1["Has your project already been deployed on Polygon zkEVM?"]} vs ${project2["Has your project already been deployed on Polygon zkEVM?"]}
         * Multi-chain: ${project1["Is your project already deployed on, or will it be deployed on, other chains?"]} vs ${project2["Is your project already deployed on, or will it be deployed on, other chains?"]}
       - Documentation:
         * Pitch/Docs: ${project1["Do you have a pitch deck or other document (white paper, demo) you want to share with us?"]} vs ${project2["Do you have a pitch deck or other document (white paper, demo) you want to share with us?"]}
       - Roadmap:
         * Milestones: ${project1["What are the key milestones on your 6-month roadmap?"]} vs ${project2["What are the key milestones on your 6-month roadmap?"]}
       - Token Strategy:
         * Status: ${project1["Has your project already launched a token?"]} vs ${project2["Has your project already launched a token?"]}
         * Details: ${project1["Tell us about your existing token."]} vs ${project2["Tell us about your existing token."]}
         * Utility: ${project1["What will be the top 1 to 3 utilities of your token?"]} vs ${project2["What will be the top 1 to 3 utilities of your token?"]}

    3. Team Assessment (20%):
       - Founders:
         * Background: ${project1["Who are the founders and how did they meet? What have they built in the past?"]} vs ${project2["Who are the founders and how did they meet? What have they built in the past?"]}
         * Other Commitments: ${project1["Are the founders currently engaged with other projects?"]} vs ${project2["Are the founders currently engaged with other projects?"]}
         * Profiles: ${project1["Please link to the Founders' Github, Farcaster, X and/or LinkedIn profiles."]} vs ${project2["Please link to the Founders' Github, Farcaster, X and/or LinkedIn profiles."]}
       - Team Composition:
         * Development Team: ${project1["How many of your devs are in-house?"]} vs ${project2["How many of your devs are in-house?"]}
         * Location: ${project1["Is there a primary location of the team?"]} vs ${project2["Is there a primary location of the team?"]}
         * Growth Needs: ${project1["If you could hire three more people right now, what positions would you fill?"]} vs ${project2["If you could hire three more people right now, what positions would you fill?"]}
       - Team Strengths:
         * Key Advantages: ${project1["Why is this team best positioned to build the product that solves the problem you are addressing? What is your biggest strength as a team?"]} vs ${project2["Why is this team best positioned to build the product that solves the problem you are addressing? What is your biggest strength as a team?"]}
       - Project History:
         * Timeline: ${project1["When did this team start building this project together?"]} vs ${project2["When did this team start building this project together?"]}
       - Legal Structure:
         * Entity Status: ${project1["Does your project have a legal entity? Or a legal strategy?"]} vs ${project2["Does your project have a legal entity? Or a legal strategy?"]}

    4. Financial Health (10%):
       - Revenue:
         * Model: ${project1["How would you describe your revenue model?"]} vs ${project2["How would you describe your revenue model?"]}
         * Current: ${project1["What is your current revenue?"]} vs ${project2["What is your current revenue?"]}
       - Funding:
         * Raised: ${project1["How much have you already raised for this project?"]} vs ${project2["How much have you already raised for this project?"]}
         * Future Plans: ${project1["If you are planning to raise capital in the next 6 months, how?"]} vs ${project2["If you are planning to raise capital in the next 6 months, how?"]}
       - Runway:
         * Burn Rate: ${project1["What is your monthly burn rate?"]} vs ${project2["What is your monthly burn rate?"]}
         * Current Runway: ${project1["What is your current financial runway?"]} vs ${project2["What is your current financial runway?"]}

    Project Challenges:
    - Key Issues: ${project1["What is the biggest thorn in your side?"]} vs ${project2["What is the biggest thorn in your side?"]}

    Evaluation Guidelines:
    1. Marketing (40%):
       - Evaluate community size, engagement quality, and growth trajectory
       - Assess social media presence and strategy effectiveness
       - Consider market positioning and competitive advantage
       - Value strategic partnerships and KOL relationships

    2. Product (30%):
       - Assess technical innovation and market fit
       - Evaluate development progress and roadmap clarity
       - Consider multi-chain strategy and execution
       - Value product differentiation and token utility
       - Examine documentation quality and transparency

    3. Team (20%):
       - Evaluate founder experience and track record
       - Assess team composition and technical capabilities
       - Consider team commitment and focus
       - Value legal structure and compliance approach
       - Examine team location and coordination strategy

    4. Financial Health (10%):
       - Assess revenue model and current traction
       - Evaluate funding efficiency and runway management
       - Consider burn rate sustainability
       - Value future funding strategy

    Special Consideration:
    - Projects should be evaluated not just on current performance but also on potential for growth
    - Early-stage projects with strong fundamentals should be valued alongside more established projects
    - Innovation and unique value propositions should be weighted heavily
    - Consider both short-term viability and long-term potential

    Compare ${project1["Project name"]} with ${project2["Project name"]} and provide a detailed analysis in the following JSON format:

    \\\\json
    {
        "project1": "${project1["Project name"]}",
        "project2": "${project2["Project name"]}",
        "selected_project": "Name of the project with more promise",
        "not_selected_project":"Name of the other project",
        "detailed_reasoning": "Provide a comprehensive analysis across all four categories (Marketing, Product, Team, Finance). Include specific metrics and comparisons where possible. Explain both current performance and future potential.",
        "risk_factors": "List potential risks or concerns for the selected project",
        "recommendation_confidence": "High/Medium/Low",
        "recommendation_confidence_explanation": "Detailed explanation of the confidence level",

        "marketing": "Score between 0 to 1 for marketing (40% weight)",
        "product": "Score  between 0 to 1 for product (30% weight)",
        "team": "Score  between 0 to 1 for team (20% weight)",
        "finance": "Score  between 0 to 1 for finance (10% weight)",
        "total_weighted_score": "Calculated weighted total score"

    }
    \\\\
    `;
};
