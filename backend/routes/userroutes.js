const express = require("express");
const { createUser, validate, updateUser, changePassword } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const signinMiddleware = require("../middleware/signinMiddleware");
const signupMiddleware = require("../middleware/signupMiddleware");

//user routes
router.post("/signup", signupMiddleware, async (req, res) => {
    const { firstName, lastName, email, password } = req.body; //Get user details
    const response = await createUser({ firstName, lastName, email, password }); //Create user
    if (response.success) { //If user is created
        res.status(201).json(response); //Return user
    } else {
        res.status(400).json(response); //Return error
    }
});

//user routes
router.post("/signin", signinMiddleware, async (req, res) => {
    const { password } = req.body; //Get password 
    const user = req.user; //Get user

    const response = await validate(user, password); //Validate user

    if (response.success) { //If user is valid
        res.status(200).json({ 
            token: response.token, //Return token
            userDetails: { //Return user details
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user._id
            }
        });
    } else {
        res.status(400).json(response); //Return error
    }
});

//user routes
router.put("/update", authMiddleware, async (req, res) => {
    const userId = req.user.userId; //Get user id
    const updates = req.body; //Get updates
    const response = await updateUser(userId, updates); //Update user
    if (response.success) { //If user is updated
        res.status(200).json(response); //Return user
    } else {
        res.status(400).json(response); //Return error
    }
});

//user routes
router.put("/change-password", authMiddleware, async (req, res) => {
    const userId = req.user.userId; //Get user id
    const { currentPassword, newPassword } = req.body; //Get password
    const response = await changePassword(userId, currentPassword, newPassword); //Change password
    if (response.success) { //If password is changed
        res.status(200).json(response); //Return user
    } else {
        res.status(400).json(response); //Return error
    }
});

module.exports = router;
