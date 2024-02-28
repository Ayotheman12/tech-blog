// Handle the submission of a new comment
const handleNewComment = async (event) => {
    // Prevent the page from reloading on submit
    event.preventDefault();

    // Grab the new comment's content
    const content = document.querySelector("#comment-input").value.trim();

    if (content) {
        // Make a request to post the new comment
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                content,
                post_id: document.querySelector(".post").dataset.postId
            }),
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
const handleEditorToggle = (event) => {
    document.querySelector("#new-comment-editor").setAttribute("style", "");
    document.querySelector("#editor-toggle-button").setAttribute("style", "display: none");
}

// Add event listeners
document.querySelector("#new-comment-form").addEventListener("submit", handleNewComment);
document.querySelector("#editor-toggle-button").addEventListener("click", handleEditorToggle);