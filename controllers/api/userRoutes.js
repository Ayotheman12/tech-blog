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
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Log in
router.post("/login", async (req, res) => {
    try {
        // Check that the request's username exists
        const userData = await User.findOne({where: {username: req.body.username}});

        if (!userData) {
            res.status(400).json({message: "Incorrect username or password"});
            return;
        }

        // Check that the request's password matches the one associated with its username
        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: "Incorrect username or password"});
            return;
        }

        // Log in
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;