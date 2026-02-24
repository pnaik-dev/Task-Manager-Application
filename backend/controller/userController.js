const bcrypt = require("bcryptjs")
const {SALT_ROUNDS,JWT_SECRET} = require("../config/dotenv");
const User = require("../model/User");
const jwt = require("jsonwebtoken")

//user registration
const createUser = async({firstName,lastName,email,password})=>{
    try{
        //hashing
        const hashedPassword = await bcrypt.hashSync(password,SALT_ROUNDS);
        //Creating user
        await User.create({firstName,lastName,email,password:hashedPassword});
        //success
        return {
            "success":true,
            "error":"user registration successfull!"
        };
    }
    catch(error){
        //failure
        return {
            "success":false,
            "error":"user registration failed!"+ error
        };
    }
}

//user authentication
const validate = async(user,password) =>{
    try {
        const userId = user._id;
        const firstName = user.firstName;
        const lastName = user.lastName;
        const email = user.email;
        const storedPassword = user.password;
        //validating
        const isValidCredentials = await bcrypt.compareSync(password,storedPassword)
        //If credentials are not valid
        if(!isValidCredentials){
            //failure
            return {
                "success":false,
                "message":"invalid credentials!"
            }
        }
        //creating token
        const token = 'Bearer ' + jwt.sign({userId,firstName,lastName,email},JWT_SECRET,{ expiresIn: '1h' })
        //Success
        return {
            "success":true,
            "token":token
        }

    } catch (error) {
        //failure
        return {
            "success":false,
            "message":"user authentication failed!"+error
        }
    }

}

//user update
const updateUser = async (userId, updates) => {
    try {
        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        // Success
        return {
            success: true,
            updatedUser
        };
    } catch (error) {
        // Failure
        return {
            success: false,
            error: "Failed to update user profile: " + error.message
        };
    }
};

//user password change
const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        // Find user
        const user = await User.findById(userId);
        // If user not found
        if (!user) {
            // Failure
            return { success: false, error: "User not found." };
        }
        // Validate current password
        const isMatch = await bcrypt.compareSync(currentPassword, user.password);
        // If current password is incorrect
        if (!isMatch) {
            // Failure
            return { success: false, error: "Invalid current password." };
        }
        // Hash new password
        const hashedPassword = await bcrypt.hashSync(newPassword, SALT_ROUNDS);
        // Update password
        user.password = hashedPassword;
        // Save user
        await user.save();
        return { success: true, message: "Password changed successfully." };
    } catch (error) {
        return { success: false, error: "Failed to change password: " + error.message };
    }
};

//token verification
const verifyToken = (token) => {
    try {
        // Remove the "Bearer " prefix
        const actualToken = token.split(" ")[1];
        // Verify the token
        const decoded = jwt.verify(actualToken, JWT_SECRET);
        // Return the decoded token
        return decoded;
    } catch (error) {
        // Token verification failed
        return null;
    }
};

//export
module.exports = {
    createUser,
    validate,
    updateUser,
    changePassword,
    verifyToken
}
