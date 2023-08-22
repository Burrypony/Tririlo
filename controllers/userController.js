//@desc User  login
//@route POST /user/login
//@access public
const loginUser = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }
    console.log(req.body);
    res.status(201).json({ email })
}

//@desc User register
//@route POST /user/register
//@access public
const registerUser = (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }
    console.log(req.body);
    res.status(200).json({ email, username })
}



module.exports = { loginUser, registerUser }