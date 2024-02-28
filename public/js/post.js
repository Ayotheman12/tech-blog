// Redirect to the new post editor page
const handleNewPostButton = () => {
    location.replace("/dashboard/edit");
}

// Add event listener
const newPostButtonEl = document.querySelector("#new-post-button");
if (newPostButtonEl) {
    newPostButtonEl.addEventListener("click", handleNewPostButton);
}