const router = require("express").Router();
const {User} = require("../../models");

// Create a new account
router.post("/", async (req, res) => {
    try {
        // Create account
        const userData = await User.create(req.body);

        // Log in
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json(userData);
        })
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;