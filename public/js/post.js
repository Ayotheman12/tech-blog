// Handle the submission of a new or updated post
const handlePostEdit = async (event) => {
    // Prevent the page from reloading on submit
    event.preventDefault();

    // Grab the new post's title and content
    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").value.trim();

    // Create or update the post
    let method;
    if (event.target.dataset.editorType === "create") {
        method = "POST";
    } else {
        method = "PUT";
    }
    let post_id = (event.target.dataset.postId) ? event.target.dataset.postId : null;
    editPost(method, {title, content, post_id});
}

// Create a new post or update an existing post
const editPost = async (method, body) => {
    if (body.title && body.content) {
        // Determine path based on the method
        let path;
        if (method === "POST") {
            path = "/api/posts";
        } else if (method === "PUT") {
            path = `/api/posts/${body.post_id}`;
        } else {
            return;
        }

        // Make a request to post/put the new/updated post
        const response = await fetch(path, {
            method,
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        });

        // If successful reload the page (which also hides the editor and shows the toggle button), else alert the user
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

// Make the comment editor visible
const handleEditorToggle = () => {
    document.querySelector("#post-editor").setAttribute("style", "");
    document.querySelector("#new-post-button").setAttribute("style", "display: none");
}

// Add event listeners
document.querySelector("#editor-form").addEventListener("submit", handlePostEdit);
// document.querySelector("#delete-button").addEventListener("click", handlePostDelete);
document.querySelector("#new-post-button").addEventListener("click", handleEditorToggle);