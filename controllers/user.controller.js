const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const validator = require("validator")

// create user token function 
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({ _id }, jwtkey, { expiresIn: "5h" })
}

// Register a new user
const registerUser = async (req, res) => {

    try {
        const { username, password } = req.body
 
        let user = await userModel.findOne({ username })

        if (user) return res.status(400).json("User with the given username already exit!");

        if (!username || !password) return res.status(400).json("All fields are required...");

        if (!validator.isStrongPassword(password, {
            minSymbols: 0,
            minLength: 5,
            minUppercase: 0,
            minNumbers: 1
        })) return res.status(400).json('Password must be strong password...');

        user = new userModel({
            username,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user.save();

        let token = createToken(user._id)

        res.status(200).json({
            _id: user._id,
            username,
            token
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}

const loginUser = async (req, res) => {

    const { username, password } = req.body

    try {

        let user = await userModel.findOne({ username })

        if (!user) return res.status(400).json('Invalid username or password')

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return res.status(400).json('Invalid username or password')

        let token = createToken(user._id)

        res.status(200).json({
            _id: user._id,
            username,
            token
        })

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

const findUser = async (req, res) => {

    const userId = req.params.userId

    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

}

const getUsers = async (req, res) => {

    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }

}


module.exports = { registerUser, loginUser, findUser, getUsers }