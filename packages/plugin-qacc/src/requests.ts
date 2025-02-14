export const requestGraphQL = async <T>(
    query: string,
    variables: Record<string, any> = {},
    options: { auth?: boolean; url?: string } = {}
): Promise<T> => {
    let headers = {
        "Content-Type": "application/json",
    };

    const response = await fetch(
        "https://staging.qacc-be.generalmagic.io/graphql",
        {
            method: "POST",
            headers,
            body: JSON.stringify({
                query,
                variables,
            }),
        }
    );

    const { data, errors } = await response.json();

    if (errors) {
        console.log("errors", errors);
        const errorMessages = errors
            .map((error: any) => error.message)
            .join(", ");
        console.log("errorMessages", errorMessages);

        // Check if any error message contains "Authentication required."
        if (
            errorMessages &&
            errorMessages.includes("Authentication required.")
        ) {
            // Dispatch a custom event to show the sign-in modal
            window.dispatchEvent(new CustomEvent("showSignInModal"));

            // Optionally, you could also throw a specific error or handle it here
            throw new Error("Authentication required. Please sign in.");
        }

        throw new Error(errorMessages);
    }

    return data;
};