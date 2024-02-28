const POST_ID = location.pathname.split("/").slice(-1);

// Handle the submission of an updated post
const handlePostUpdate = async (event) => {
    // Prevent the page from reloading on submit
    event.preventDefault();

    // Grab the updated post's title and content
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();

    // Save the title and content, if they exist, to be the body of the request
    const body = {};
    if (title) {
        body.title = title;
    }
    if (content) {
        body.content = content;
    }

    // Make a request to put the updated post
    const response = await fetch(`/api/posts/${POST_ID}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {"Content-Type": "application/json"}
    });

    // If successful return to the dashboard (which also hides the editor), else alert the user
    if (response.ok) {
        location.replace("/dashboard");
    } else {
        alert(response.statusText + " update");
    }
}

// Handle a click on the delete post button
const handlePostDelete = async (event) => {
    // Prevent the button from submitting the form
    event.preventDefault();

    // Make a request to delete the post
    const response = await fetch(`/api/posts/${POST_ID}`, {
        method: "DELETE",
    });

    // If successful return to the dashboard (which also hides the editor), else alert the user
    if (response.ok) {
        location.replace("/dashboard");
    } else {
        alert(response.statusText + " delete");
    }
}

// Add event listeners
const editorFormEl = document.querySelector("#editor-form");
if (editorFormEl) {
    editorFormEl.addEventListener("submit", handlePostUpdate);
}
document.querySelector("#delete-button").addEventListener("click", handlePostDelete);