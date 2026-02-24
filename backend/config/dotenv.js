require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    PORT,
    MONGO_URI,
    SALT_ROUNDS,
    JWT_SECRET
}
