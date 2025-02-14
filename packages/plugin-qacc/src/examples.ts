import { ActionExample } from "@elizaos/core";

export const getQACCProjectNameExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you tell me about a QACC project?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure! Please provide the name of the QACC project you'd like details about.",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "QACC-Arbitrage-Bot",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch the details for the QACC-Arbitrage-Bot project.",
                action: "GET_QACC_PROJECT_DETAILS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The QACC-Arbitrage-Bot is a project focused on managing liquidity pools, minimizing gas costs, and optimizing trading strategies for QACC assets.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Tell me more about the QACC Gurvez project.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch the details for the QACC Gurvez project.",
                action: "GET_QACC_PROJECT_DETAILS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The QACC Gurvez project provides a comprehensive overview of QACC assets, including performance metrics and analytics for enhanced decision-making.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want details about a project, but I'm not sure which one.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Could you please provide the name of the QACC project you'd like details about? For example, 'QACC-Arbitrage-Bot' or 'QACC Dashboard'.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you provide a summary of the QACC-Arbitrage-Bot project?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll retrieve the summary for the QACC-Arbitrage-Bot project.",
                action: "GET_QACC_PROJECT_DETAILS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Project Summary for QACC-Arbitrage-Bot:\n\n- Purpose: Automated liquidity management and trading optimization\n- Key Features:\n  * Advanced algorithmic trading strategies\n  * Real-time liquidity pool monitoring\n  * Gas cost minimization techniques\n- Primary Objectives: Maximize trading efficiency and reduce transaction costs for QACC assets",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I'd like a project summary, but I'm not specific about which one.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Please provide the specific QACC project name for which you'd like a summary. Examples include 'QACC-Arbitrage-Bot' or 'QACC Gurvez'.",
            },
        },
    ],
];

export const getAllQACCProjectsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me all the QACC projects?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll fetch a list of all QACC projects for you.",
                action: "GET_ALL_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found 3 QACC projects: QACC-Arbitrage-Bot, QACC Dashboard, and QACC Analytics Platform. Each project serves different purposes in the QACC ecosystem.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "How many QACC projects are there in total?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check the total number of QACC projects.",
                action: "GET_ALL_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "There are currently 3 active QACC projects. Would you like me to list them all for you?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Give me an overview of all QACC projects",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll retrieve an overview of all QACC projects.",
                action: "GET_ALL_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here's an overview of all QACC projects: The QACC-Arbitrage-Bot handles automated trading, the QACC Dashboard provides monitoring capabilities, and the QACC Analytics Platform offers detailed data analysis.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "List all available QACC projects",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll get a list of all available QACC projects for you.",
                action: "GET_ALL_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are all available QACC projects: 1. QACC-Arbitrage-Bot, 2. QACC Dashboard, 3. QACC Analytics Platform. Would you like more details about any specific project?",
            },
        },
    ],
];

export const getFilteredProjectsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me all projects with launched tokens",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll find all QACC projects with launched tokens.",
                action: "GET_FILTERED_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Found 2 projects with launched tokens:\n| No. | Project Name | Token Status |\n|-----|--------------|--------------||\n| 1 | QACC-Arbitrage-Bot | Launched |\n| 2 | QACC Analytics | Launched |",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Which projects have more than 5 team members and are based in Singapore?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll search for projects with those specifications.",
                action: "GET_FILTERED_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Found 1 matching project:\n| No. | Project Name | Team Size | Primary Location |\n|-----|--------------|-----------|------------------|\n| 1 | QACC Dashboard | 8 | Singapore |",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "List all DeFi projects that are currently in development",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll find DeFi projects in the development stage.",
                action: "GET_FILTERED_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Found 2 matching projects:\n| No. | Project Name | Project Type | Development Stage |\n|-----|--------------|--------------|------------------|\n| 1 | QACC-Arbitrage-Bot | DeFi | Development |\n| 2 | QACC Yield | DeFi | Development |",
            },
        },
    ],
];

export const getScoreProjectsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you show me the top 5 projects?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll score and rank the top 5 QACC projects for you.",
                action: "SCORE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Top 5 QACC Projects ranked by performance score:",
                content: {
                    scoredProjects: [
                        { name: "QACC-Arbitrage-Bot", overallScore: 0.85 },
                        { name: "QACC Dashboard", overallScore: 0.79 },
                        { name: "QACC Gurvez", overallScore: 0.72 },
                        { name: "QACC Risk Manager", overallScore: 0.68 },
                        { name: "QACC Analytics", overallScore: 0.65 },
                    ],
                },
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to know which projects are performing best",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll analyze and rank the QACC projects for you.",
                action: "SCORE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Top performing QACC projects based on comprehensive scoring:",
                content: {
                    scoredProjects: [
                        {
                            name: "QACC-Arbitrage-Bot",
                            overallScore: 0.85,
                            fieldScores: {
                                burn_rate: { normalizedScore: 0.9 },
                                social_media_followers: {
                                    normalizedScore: 0.8,
                                },
                            },
                        },
                    ],
                },
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Which projects have the best funding and team size?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll score projects focusing on funding and team metrics.",
                action: "SCORE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Top projects ranked by funding and team size:",
                content: {
                    scoredProjects: [
                        {
                            name: "QACC Dashboard",
                            overallScore: 0.82,
                            fieldScores: {
                                funding: { normalizedScore: 0.95 },
                                team_size: { normalizedScore: 0.9 },
                            },
                        },
                    ],
                },
            },
        },
    ],
];

export const compareQACCProjectsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you compare all QACC projects with each other?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll analyze and compare all QACC projects in pairs.",
                action: "COMPARE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've completed the project comparisons. QACC-Arbitrage-Bot shows strong metrics in burn rate and runway, while QACC Dashboard excels in user engagement. The Analytics Platform stands out for its comprehensive documentation and development progress.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Which QACC projects are performing better compared to others?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll conduct a comparative analysis of all QACC projects.",
                action: "COMPARE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "After comparing all projects: The QACC Dashboard shows superior metrics in community engagement and deployment status. QACC-Arbitrage-Bot leads in financial efficiency, while the Analytics Platform demonstrates strong technical implementation. Would you like specific details about any comparison?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Run a comparison analysis of all QACC projects",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll perform a detailed comparison analysis of all QACC projects.",
                action: "COMPARE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Comparison analysis complete. Key findings: QACC Dashboard leads in user adoption and community metrics, QACC-Arbitrage-Bot excels in runway and burn rate efficiency, and the Analytics Platform shows strength in documentation and technical implementation. The analysis included 3 head-to-head comparisons.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Evaluate and rank all QACC projects against each other",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll evaluate all QACC projects through paired comparisons.",
                action: "COMPARE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Based on paired comparisons: The QACC Dashboard ranks highest overall due to its strong community metrics and live deployment status. QACC-Arbitrage-Bot follows closely with excellent financial metrics, and the Analytics Platform shows promising potential with its comprehensive documentation. All projects demonstrated unique strengths in different areas.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me how QACC projects stack up against each other",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll analyze how each QACC project compares to the others.",
                action: "COMPARE_QACC_PROJECTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "After comparing the projects: Each shows distinct advantages - QACC Dashboard leads in deployment and user base, QACC-Arbitrage-Bot in financial efficiency, and the Analytics Platform in technical robustness. The comparison revealed complementary strengths across the QACC ecosystem.",
            },
        },
    ],
];

export const readCSVFileExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you read this CSV file for me?",
                file: "data.csv",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll read and analyze the CSV file for you.",
                action: "READ_CSV_FILE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've successfully read your CSV file. It contains 150 rows and 4 columns. The columns are: id, name, category, and value. Would you like to see a sample of the data?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Parse this sales data CSV and tell me what's in it",
                file: "sales_data.csv",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll parse and analyze your sales data CSV file.",
                action: "READ_CSV_FILE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've parsed your sales data CSV. The file contains 200 sales records with 6 columns: date, product_id, quantity, price, customer_id, and region. Would you like me to show you some sample entries?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Import this CSV file and show me what data it contains",
                file: "metrics.csv",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll import and analyze the contents of your CSV file.",
                action: "READ_CSV_FILE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've imported your CSV file. It contains 75 rows of metrics data with 5 columns: timestamp, metric_name, value, unit, and source. The data appears to be time-series metrics. Would you like to see the first few entries?",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Check what's in this CSV file",
                file: "user_data.csv",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll examine the contents of your CSV file.",
                action: "READ_CSV_FILE",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I've analyzed your CSV file. It contains user data with 300 records and 7 columns including: user_id, name, email, signup_date, last_login, status, and subscription_type. Would you like me to provide more details about the data structure?",
            },
        },
    ],
];

export const compareSpecificProjectsExamples: ActionExample[][] = [
    // Direct comparison requests
    [
        {
            user: "{{user1}}",
            content: {
                text: "Compare QACC Dashboard with QACC-Arbitrage-Bot",
                projectNames: ["QACC Dashboard", "QACC-Arbitrage-Bot"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll compare QACC Dashboard with QACC-Arbitrage-Bot.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Using 'vs' or 'versus'
    [
        {
            user: "{{user1}}",
            content: {
                text: "QACC Dashboard vs Analytics Platform - which is better?",
                projectNames: ["QACC Dashboard", "Analytics Platform"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll analyze QACC Dashboard versus Analytics Platform to determine which shows more promise.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Using 'and'
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you analyze QACC-Arbitrage-Bot and Analytics Platform?",
                projectNames: ["QACC-Arbitrage-Bot", "Analytics Platform"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll perform a comparative analysis of QACC-Arbitrage-Bot and Analytics Platform.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Question format
    [
        {
            user: "{{user1}}",
            content: {
                text: "Which is performing better between QACC Dashboard and QACC-Arbitrage-Bot?",
                projectNames: ["QACC Dashboard", "QACC-Arbitrage-Bot"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll evaluate the performance of QACC Dashboard and QACC-Arbitrage-Bot.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Multi-project comparison
    [
        {
            user: "{{user1}}",
            content: {
                text: "Please compare these three: QACC Dashboard, Analytics Platform and QACC-Arbitrage-Bot",
                projectNames: [
                    "QACC Dashboard",
                    "Analytics Platform",
                    "QACC-Arbitrage-Bot",
                ],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll compare all three projects: QACC Dashboard, Analytics Platform, and QACC-Arbitrage-Bot.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Informal request
    [
        {
            user: "{{user1}}",
            content: {
                text: "hey can u tell me how QACC Dashboard stacks up against Analytics Platform?",
                projectNames: ["QACC Dashboard", "Analytics Platform"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll analyze how QACC Dashboard compares to Analytics Platform.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Performance comparison
    [
        {
            user: "{{user1}}",
            content: {
                text: "Show me the performance metrics for QACC-Arbitrage-Bot compared to QACC Dashboard",
                projectNames: ["QACC-Arbitrage-Bot", "QACC Dashboard"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll compare the performance metrics of QACC-Arbitrage-Bot and QACC Dashboard.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Evaluation request
    [
        {
            user: "{{user1}}",
            content: {
                text: "Evaluate Analytics Platform and QACC-Arbitrage-Bot side by side",
                projectNames: ["Analytics Platform", "QACC-Arbitrage-Bot"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll provide a side-by-side evaluation of Analytics Platform and QACC-Arbitrage-Bot.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Detailed analysis request
    [
        {
            user: "{{user1}}",
            content: {
                text: "Give me a detailed comparison between QACC Dashboard and Analytics Platform",
                projectNames: ["QACC Dashboard", "Analytics Platform"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll create a detailed comparison between QACC Dashboard and Analytics Platform.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
    // Metrics-focused request
    [
        {
            user: "{{user1}}",
            content: {
                text: "What are the key differences between QACC-Arbitrage-Bot and QACC Dashboard?",
                projectNames: ["QACC-Arbitrage-Bot", "QACC Dashboard"],
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll analyze the key differences between QACC-Arbitrage-Bot and QACC Dashboard.",
                action: "COMPARE_SPECIFIC_QACC_PROJECTS",
            },
        },
    ],
];

export const updateProjectConfigsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you change the configs for the project comparison... Marketing:0.85 Product:90 Team:75 Financial:80",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll update the project comparison configurations with your new values.",
                action: "UPDATE_PROJECT_CONFIGS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The project comparison configurations have been updated successfully with your specified values.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Update the project comparison scores to Marketing:70 Product:85 Team:80 Financial:75",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll modify the project comparison scores according to your specifications.",
                action: "UPDATE_PROJECT_CONFIGS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The project comparison scores have been successfully updated with your new values.",
            },
        },
    ],
];