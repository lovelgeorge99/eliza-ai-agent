export const getSingleProjectTemplate = `Respond with a JSON object containing the project details request.
Ask the user to specify agrresively untill u get a response the name of the QACC project they want to know more about. If no project name is provided, respond with an error.

The response must include:
- project_name: The name of the QACC project provided by the user.

Example response:
\\\json
{
 "project_name": "QACC-Arbitrage-Bot"
}
\\\
{{recentMessages}} Extract the QACC project name from the most recent message
Respond with a JSON markdown block containing the project_name or an error message.`;

export const getAllProjectsTemplate = `Respond with a JSON object containing the request for all QACC projects.
Determine if the user is requesting:
1. A list of all projects
2. The total number of projects
3. An overview of all projects

The response must include:
- request_type: "all_projects" (indicates this is a request for all projects rather than a specific one)
- include_count: boolean (true if user specifically asked about the number of projects)
- include_overview: boolean (true if user asked for details/overview of projects)

Example response:
\\\json
{
  "request_type": "all_projects",
  "include_count": true,
  "include_overview": false
}
\\\

{{recentMessages}} Analyze the most recent message to determine what type of project information is being requested.
Respond with a JSON markdown block containing the request details.`;

export const getFilteredProjectsTemplate = `Respond with a JSON object containing the filter conditions for QACC projects.
Extract filter conditions from the user's message and format them appropriately.

Valid filter fields and their values:
- token_status: "Yes, provide details", "No, we have not launched a token", in_progress
- project_stage: idea, mvp, beta, live, scaling
- project_category: defi, nft, gaming, infrastructure, dao, social, other
- polygon_deployment: deployed, not_deployed, in_progress
- team_size: number (use greater_than, less_than, equals operators)
- primary_location: string
- legal_entity: yes, no, in_progress
- revenue_status: number (use greater_than, less_than, equals operators)
- funding_status: bootstrapped, seed_funded, series_a, series_b, not_disclosed
- development_timeline: date (use before, after operators)
- other_chains: yes, no, planned
- monthly_burn: number (use greater_than, less_than, equals operators)

Example responses:
\\\json
{
  "conditions": [
    {
      "field": "token_status",
      "value": "No, we have not launched a token",
      "operator": "equals"
    },
    {
      "field": "project_stage",
      "value": "live",
      "operator": "equals"
    }
  ]
}
\\\

\\\json
{
  "conditions": [
    {
      "field": "team_size",
      "value": 10,
      "operator": "greater_than"
    },
    {
      "field": "revenue_status",
      "value": "revenue_generating",
      "operator": "equals"
    }
  ]
}
\\\

{{recentMessages}} Extract filter conditions from the most recent message.
Respond with a JSON markdown block containing the conditions array.`;
