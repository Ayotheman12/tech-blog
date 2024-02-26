const router = require("express").Router();
const {Post} = require("../../models");

// Create a new post
router.post("/", async (req, res) => {
    try {
        // Create post
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.userId
        });
        // Respond with the new post
        res.json({newPost});
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a post
router.put("/:id", async (req, res) => {
    try {
        // Update post
        const updatedPost = await Post.update(req.body, {where: {id: req.params.id}});
        console.log(updatedPost);
        // Respond with an error if no update occurred (eg, due to nonexistent id or matching content)
        if (!updatedPost[0]) {
            res.status(404).json({message: "Post not updated"});
            return;
        }
        // Respond with the updated post object (just an array with a number in it)
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;