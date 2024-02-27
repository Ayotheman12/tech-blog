const router = require("express").Router();
const {Post, User} = require("../models");

// Homepage
router.get("/", async (req, res) => {
    try {
        // Get all blog posts
        const postData = Post.findAll({
            include: {
                model: User,
                attributes: ["username"]
            }
        });

        // Serialize the data
        const posts = (await postData).map((post) => post.get({plain: true}));

        // Render page
        res.render("homepage", {
            title: "Homepage",
            loggedIn: req.session.loggedIn, posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;