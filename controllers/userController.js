const jwt = require("jsonwebtoken")
const pool = require("../config/db")
const asyncHandler = require("express-async-handler")


//@desc User  login
//@route POST /user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }

    const accessToken = jwt.sign({
        user: {
            username: 'username',
            email: email,
            id: 'userID'
        },
    },
        process.env.SECRET_TOKEN,
        { expiresIn: '10m' })

    console.log(req.body);
    res.status(200).json({ accessToken })
}
)
//@desc User register
//@route POST /user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }

    const existingUser = loginUser()

    console.log(req.body);
    res.status(201).json({ email, username })
}
)


module.exports = { loginUser, registerUser }