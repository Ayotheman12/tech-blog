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

        // If successful reload the page, else alert the user
        if (response.ok) {
            location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

// Add event listener
document.querySelector("#new-comment-form").addEventListener("submit", handleNewComment);