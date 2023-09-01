const pool = require("../config/db")
const asyncHandler = require("express-async-handler")
//@desc Get all tables
//@route GET /table
//@access private
const getTables = asyncHandler(async (req, res) => {
    const userID = req.user.id
    const tables = await getAllTablesForUser(userID)
    if(!tables[0]){
        res.status(404)
        res.json({ "error": "Tables not found" })
    }
    res.status(200).json(tables)
})

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
    const { name } = req.params.name
    const userID = req.user.id
    if (!name) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }
    res.status(200).json({ name })
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

async function getAllTablesForUser(userID){
    const [rows] = await pool.query(`
    SELECT *
    FROM tables
    WHERE table_id IN (SELECT table_id FROM table_users WHERE user_id = ?)
`, [userID])
}



module.exports = { getTables, createTable, getTable, updateTable, deleteTable }