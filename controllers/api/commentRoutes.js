const router = require("express").Router();
const {Comment} = require("../../models");

// Create a new comment
router.post("/", async (req, res) => {
    try {
        // Create comment
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.userId
        });
        // Respond with the new comment
        res.json({newComment});
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;