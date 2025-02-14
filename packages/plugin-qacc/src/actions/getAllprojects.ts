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
    Content,
} from "@elizaos/core";
import { fetchAllProjects } from "../services";
import { getAllProjectsTemplate } from "../templates";
import { getAllQACCProjectsExamples } from "../examples";

export const getAllProjects: Action = {
    name: "GET_ALL_QACC_PROJECTS",
    similes: [
        "LIST_ALL_PROJECTS",
        "SHOW_ALL_PROJECTS",
        "GET_PROJECTS_LIST",
        "FETCH_ALL_PROJECTS",
        "VIEW_ALL_PROJECTS",
        "ALL_QACC_PROJECTS",
        "PROJECTS_OVERVIEW",
        "LIST_PROJECTS",
        "SHOW_PROJECTS",
    ],
    description: "Fetch information about all available QACC projects.",
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
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }

        state = await runtime.updateRecentMessageState(state);

        // state -> context
        const allProjectsContext = composeContext({
            state,
            template: getAllProjectsTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: allProjectsContext,
            modelClass: ModelClass.SMALL,
        });

        console.log(content);

        try {
            let allProjects = [];
            if (runtime.cacheManager.get("currentCSVData")) {
                allProjects = await runtime.cacheManager.get("currentCSVData");
                elizaLogger.success("Got data from cache Manager");
            } else {
                allProjects = await fetchAllProjects();
            }
            elizaLogger.success("Successfully fetched all QACC projects");

            // Extract project names
            // const projectNames = allProjects.map(
            //     (project) => project["Project name"]
            // );

            const projects = allProjects?.map((project, index) => ({
                index: index + 1,
                project_name: project["Project name"],
            }));

            // Format response based on request type
            let responseText = "";
            if (content?.include_count) {
                responseText = `Found ${allProjects.length} QACC projects. `;
            }

            if (callback) {
                callback({
                    text:
                        responseText ||
                        `Found ${allProjects.length} QACC projects`,
                    content: {
                        action: "GET_ALL_QACC_PROJECTS",
                        total: allProjects.length,
                        projects: projects,
                    },
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_ALL_QACC_PROJECTS handler:", error);

            callback({
                text: `Error fetching projects: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: getAllQACCProjectsExamples as ActionExample[][],
} as Action;