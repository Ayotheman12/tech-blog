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

        res.json({newPost});
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;