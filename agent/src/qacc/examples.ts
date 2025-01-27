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
