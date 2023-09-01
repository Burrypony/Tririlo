const jwt = require("jsonwebtoken")
const pool = require("../config/db")
const bcrypt = require('bcrypt');
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

    const userInfo = await getUserByEmail(email)
    console.log(userInfo);
    if (userInfo.length > 0 && (await bcrypt.compare(password, userInfo[0].password))) {
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
    } else {
        res.status(401)
        throw new Error("email or password is not valid")
    }




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

    const existUser = await getUserByEmail(email)
    console.log(existUser);
    if (existUser.length > 0) {
        res.status(400)
        res.json({ "error": "Email already exist" })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const registerUser = await createUser(username, email, hashedPassword)


    console.log(registerUser);
    res.status(201).json({ email, username })
}
)

async function getUserByEmail(email) {
    const [row] = await pool.query(`
        SELECT *
        FROM users
        WHERE email = ?
    `, [email])

    return row
}

async function createUser(name, email, password) {
    const [row] = await pool.query(`
        INSERT INTO users SET name = ?, email =?, password =?
    `, [name, email, password])
    return row
}

module.exports = { loginUser, registerUser }