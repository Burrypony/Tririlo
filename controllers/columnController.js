//@desc Get all columns
//@route GET /column
//@access private
const getColumns = (req, res) => {
    // const { email, password } = req.body
    // if (!email || !password) {
    //     res.status(400)
    //     res.json({ "error": "All fields mandatory" })
    // }
    res.status(200).json({ data: "Here will be all columns" })
}

//@desc Create Column
//@route POST /column
//@access private
const createColumn = (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }
    res.status(201).json({ name })
}

//@desc Update Column
//@route PUT /column/:id
//@access private
const updateColumn = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Column not found" })
    }
    res.status(200).json({ id })
}

//@desc Delete Column
//@route DELETE /column/:id
//@access private
const deleteColumn = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }
    res.status(200).json({ id })
}



module.exports = { getColumns, createColumn, updateColumn, deleteColumn }