import type { Plugin } from "@elizaos/core";
import { getAllProjects } from "./actions";

export * as actions from "./actions";

export const qaccPlugin: Plugin = {
    name: "qacc",
    description: "Agent bootstrap with basic actions and evaluators",
    actions: [getAllProjects],
    evaluators: [],
    providers: [],
};
export default qaccPlugin;
