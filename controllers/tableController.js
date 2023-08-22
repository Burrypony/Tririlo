//@desc Get all tables
//@route GET /table
//@access private
const getTables = (req, res) => {
    // const { email, password } = req.body
    // if (!email || !password) {
    //     res.status(400)
    //     res.json({ "error": "All fields mandatory" })
    // }
    res.status(200).json({ data: "Here will be all tables" })
}

//@desc Create tables
//@route POST /table
//@access private
const createTable = (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }
    res.status(201).json({ name })
}

//@desc Get Table
//@route GET /table/:id
//@access private
const getTable = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }
    res.status(200).json({ id })
}

//@desc Update Table
//@route PUT /table/:id
//@access private
const updateTable = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }
    res.status(200).json({ id })
}

//@desc Delete Table
//@route DELETE /table/:id
//@access private
const deleteTable = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }
    res.status(200).json({ id })
}



module.exports = { getTables, createTable, getTable, updateTable, deleteTable }