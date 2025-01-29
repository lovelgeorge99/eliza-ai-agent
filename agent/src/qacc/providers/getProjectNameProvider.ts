import { IAgentRuntime, Memory, Provider } from "@elizaos/core";

// Provider implementation
export const getProjectNameProvider: Provider = {
    get: async (runtime: IAgentRuntime, message: Memory) => {
        // const cacheManager = new CacheManager(runtime);
        const cacheKey = `${runtime.character.name}/${message.userId}/user_data`;

        try {
            return {
                status: "NEED_MORE_INFO",
                message:
                    "Which QACC project would you like to know more about?",
                requiredEntities: [
                    {
                        name: "project_name",
                        type: "string",
                        description: "The name of the QACC project",
                    },
                ],
            };
        } catch (error) {
            console.error("Error in userDataProvider:", error);
            return "Can you provide the name again.";
        }
    },
};
