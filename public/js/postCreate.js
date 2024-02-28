// Handle the submission of a new post
const handlePostCreate = async (event) => {
    // Prevent the page from reloading on submit
    event.preventDefault();

    // Grab the new post's title and content
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();

    // Create the post
    if (title && content) {
        // Make a request to create the new post
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({title, content}),
            headers: {"Content-Type": "application/json"}
        });

        // If successful return to the dashboard (which also hides the editor), else alert the user
        if (response.ok) {
            location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

// Add event listeners
document.querySelector("#editor-form").addEventListener("submit", handlePostCreate);
