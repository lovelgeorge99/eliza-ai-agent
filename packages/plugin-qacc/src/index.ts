import type { Plugin } from "@elizaos/core";
import { compareProjectsAction, compareSpecificProjectsAction, getAllProjects, getProjectDetail, readCSVFile } from "./actions";

export * as actions from "./actions";

export const qaccPlugin: Plugin = {
    name: "qacc",
    description: "Agent bootstrap with basic actions and evaluators",
    actions: [getAllProjects,getProjectDetail,compareProjectsAction,compareSpecificProjectsAction,readCSVFile],
    evaluators: [],
    providers: [],
};
export default qaccPlugin;
