import { MongoClient } from "mongodb";
import { requestGraphQL } from "./requests";
import { GET_PROJECT_BY_SLUG } from "./project.query";

const MONGO_URI = "mongodb+srv://qacc:qaccpassword@cluster0.bfyc2.mongodb.net/"; // Replace with your MongoDB URI
const DATABASE_NAME = "qacc"; // Replace with your database name
const COLLECTION_NAME = "projects";

let client: MongoClient | null = null;

const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DATABASE_NAME);
};

export const fetchAllProjects = async () => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);

        const projects = await collection.find({}).toArray(); // Fetch all documents as an array

        if (!projects.length) {
            throw new Error("No projects found");
        }

        return projects;
    } catch (error) {
        console.error("Error fetching all projects:", error);
        throw error;
    } finally {
        // Optional: close the client if you're done with it
        // await client?.close();
    }
};

export const countProjects = async () => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);

        const count = await collection.countDocuments(); // Count all documents in the collection

        return count;
    } catch (error) {
        console.error("Error counting projects:", error);
        throw error;
    } finally {
        // Optional: close the client if you're done with it
        // await client?.close();
    }
};

export const fetchProjectBySlug = async (slug: string) => {
    try {
        const res = await requestGraphQL<{
            projectBySlug: any;
        }>(GET_PROJECT_BY_SLUG, {
            slug,
        });
        return res?.projectBySlug;
    } catch (error) {
        console.error(error);
    }
};

export const fetchProjectByName = async (name) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);

        const project = await collection.findOne({ "Project name": name }); // Find a project by its name

        if (!project) {
            throw new Error(`Project with name "${name}" not found`);
        }

        return project;
    } catch (error) {
        console.error("Error fetching project by name:", error);
        throw error;
    } finally {
        // Optional: close the client if you're done with it
        // await client?.close();
    }
};

// Mapping of our filter fields to actual database column names
const DB_FIELD_MAPPINGS = {
    token_status: "Has your project already launched a token?",
    project_stage: "How would you describe the stage of this project?",
    project_category:
        "Which of the following categories does your project fit in?",
    polygon_deployment:
        "Has your project already been deployed on Polygon zkEVM?",
    team_size: "How many of your devs are in-house?",
    primary_location: "Is there a primary location of the team?",
    legal_entity: "Does your project have a legal entity?",
    revenue_status: "What is your current revenue?",
    funding_status: "How much have you already raised for this project?",
    development_timeline:
        "When did this team start building this project together?",
    other_chains:
        "Is your project already deployed on, or will it be deployed on, other chains?",
    monthly_burn: "What is your monthly burn rate?",
};

export const fetchProjectsByConditions = async (conditions: any[]) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);

        // Build MongoDB query object
        const query = conditions.reduce((acc, condition) => {
            const dbField = DB_FIELD_MAPPINGS[condition.field];
            if (!dbField) return acc;

            switch (condition.operator) {
                case "equals":
                    acc[dbField] = condition.value;
                    break;

                case "greater_than":
                    acc[dbField] = { $gt: condition.value };
                    break;

                case "less_than":
                    acc[dbField] = { $lt: condition.value };
                    break;

                case "contains":
                    acc[dbField] = { $regex: condition.value, $options: "i" };
                    break;

                case "before":
                    acc[dbField] = { $lt: new Date(condition.value as string) };
                    break;

                case "after":
                    acc[dbField] = { $gt: new Date(condition.value as string) };
                    break;

                default:
                    // Default to equals if no operator specified
                    acc[dbField] = condition.value;
            }

            return acc;
        }, {});

        // Execute query
        const projects = await collection.find(query).toArray();

        // Transform the results back to our expected format
        const transformedProjects = projects.map((project) => ({
            project_name: project["Project name"],
            token_status: project[DB_FIELD_MAPPINGS.token_status],
            project_stage: project[DB_FIELD_MAPPINGS.project_stage],
            project_category: project[DB_FIELD_MAPPINGS.project_category],
            polygon_deployment: project[DB_FIELD_MAPPINGS.polygon_deployment],
            team_size: project[DB_FIELD_MAPPINGS.team_size],
            primary_location: project[DB_FIELD_MAPPINGS.primary_location],
            legal_entity: project[DB_FIELD_MAPPINGS.legal_entity],
            revenue_status: project[DB_FIELD_MAPPINGS.revenue_status],
            funding_status: project[DB_FIELD_MAPPINGS.funding_status],
            development_timeline:
                project[DB_FIELD_MAPPINGS.development_timeline],
            other_chains: project[DB_FIELD_MAPPINGS.other_chains],
            monthly_burn: project[DB_FIELD_MAPPINGS.monthly_burn],
        }));

        if (!transformedProjects.length) {
            console.log("No projects found matching the conditions:", query);
        }

        return transformedProjects;
    } catch (error) {
        console.error("Error fetching projects by conditions:", error);
        throw error;
    }
};

// Helper function to validate and clean filter conditions
export const validateFilterConditions = (conditions: any[]) => {
    return conditions.filter((condition) => {
        // Check if the field exists in our mappings
        if (!DB_FIELD_MAPPINGS[condition.field]) {
            console.warn(`Invalid field: ${condition.field}`);
            return false;
        }

        // Validate number fields
        if (["team_size", "monthly_burn"].includes(condition.field)) {
            if (typeof condition.value !== "number") {
                console.warn(
                    `Invalid value type for ${condition.field}: expected number`
                );
                return false;
            }
        }

        // Validate date fields
        if (condition.field === "development_timeline") {
            if (!Date.parse(condition.value as string)) {
                console.warn(`Invalid date format for ${condition.field}`);
                return false;
            }
        }

        return true;
    });
};