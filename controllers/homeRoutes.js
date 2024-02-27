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
            loggedIn: req.session.loggedIn,
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Dashboard
router.get("/dashboard", async (req, res) => {
    try {
        // Get the user's posts
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId
            }
        });

        // Serialize the data
        const posts = postData.map((post) => post.get({plain: true}));

        // Render the page
        res.render("dashboard", {
            title: "Your Dashboard",
            loggedIn: req.session.loggedIn,
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;