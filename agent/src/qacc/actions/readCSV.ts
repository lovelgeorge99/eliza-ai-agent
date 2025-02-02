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
import Papa from "papaparse";
import fs from "fs";
import { readCSVFileExamples } from "../examples";

export const readCSVFile: Action = {
    name: "READ_CSV_FILE",
    similes: [
        "PARSE_CSV",
        "LOAD_CSV",
        "OPEN_CSV",
        "READ_CSV",
        "PROCESS_CSV",
        "IMPORT_CSV",
        "VIEW_CSV",
        "ANALYZE_CSV",
        "EXTRACT_CSV_DATA",
    ],
    description: "Read and parse a CSV file provided by the user.",
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
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }

        state = await runtime.updateRecentMessageState(state);

        try {
            // Get the file content from the message or state
            const attachments = message.content?.attachments;

            const csvAttachment = attachments[0] as any;
            let summary: any = {};
            fs.readFile(csvAttachment.url, "utf-8", (err, data) => {
                if (err) {
                    elizaLogger.error("Error reading file:", err);
                    if (callback) {
                        callback({
                            text: `Error reading CSV file: ${err.message}`,
                            content: { error: err.message },
                        });
                    }
                    return;
                }

                // Parse CSV using Papaparse

                Papa.parse(data, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        elizaLogger.success("Successfully parsed CSV file");

                        runtime.cacheManager.set(
                            "currentCSVData",
                            results.data
                        );

                        summary["fileName"] = csvAttachment.title;
                        summary["totalRows"] = results.data.length;
                        summary["sample"] = results.data.slice(0, 5); // First 5 rows as sample
                    },
                    error: (error) => {
                        elizaLogger.error("Error parsing CSV:", error);
                        if (callback) {
                            callback({
                                text: `Error parsing CSV: ${error}`,
                                content: { error: error },
                            });
                        }
                    },
                });
            });

            console.log(summary);

            if (callback) {
                callback({
                    text: `Successfully read CSV file "${csvAttachment.title}"`,
                    content: {
                        action: "READ_CSV_FILE",
                    },
                });
                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in READ_CSV_FILE handler:", error);

            if (callback) {
                callback({
                    text: `Error reading CSV file: ${error.message}`,
                    content: { error: error.message },
                });
            }

            return false;
        }
    },
    examples: readCSVFileExamples as ActionExample[][],
} as Action;

// Optional: Add types for CSV data
export interface CSVSummary {
    totalRows: number;
    columns: string[];
    sample: any[];
}

export interface CSVResponse {
    text: string;
    content: {
        action: string;
        summary: CSVSummary;
        data: any[];
        meta: Papa.ParseMeta;
    };
}
