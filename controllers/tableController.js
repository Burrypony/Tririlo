const pool = require("../config/db")
const asyncHandler = require("express-async-handler")
//@desc Get all tables
//@route GET /table
//@access private
const getTables = asyncHandler(async (req, res) => {
    const userID = req.user.id
    const tables = await getAllTablesForUserRequest(userID)
    if(!tables[0]){
        res.status(404)
        res.json({ "error": "Tables not found" })
    }
    res.status(200).json(tables)
})

//@desc Create tables
//@route POST /table
//@access private
const createTable = asyncHandler (async (req, res) => {
    const userID = req.user.id
    const { name } = req.body

    const newTableData = await createTableRequest(name)
    const newTableUserData = await createTableUserRequest(newTableData.insertId,userID)


    if (!newTableData&&!newTableUserData) {
        res.status(502)
        res.json({ "error": "something goes wrong :(" })
    }
    res.status(201).json({ name })
})

//@desc Get Table
//@route GET /table/:id
//@access private
const getTable = asyncHandler(async(req, res) => {
    const userID = req.user.id
    const { id } = req.params.id

    if (!id) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }

    const correctUser = await checkIfUserAssignToThisTableRequest(userID,id)

    if(!correctUser.length){
        res.status(404)
        res.json({ "error": "Table not found" })
    }

    const tableData = await getTableRequest(id)
    if (!tableData.length) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }
    res.status(200).json(tableData)
})

//@desc Update Table
//@route PUT /table/:id
//@access private
const updateTable = asyncHandler(async(req, res) => {
    const { name } = req.params.name
    const userID = req.user.id
    if (!name) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }

    const correctUser = await checkIfUserAssignToThisTableRequest(userID,id)

    if(!correctUser.length){
        res.status(404)
        res.json({ "error": "Table not found" })
    }

    const updatedTableData = await updateTableRequest(id,name)
    if (!updatedTableData.length) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }
    res.status(200).json({ name })
})

//@desc Delete Table
//@route DELETE /table/:id
//@access private
const deleteTable = asyncHandler(async(req, res) => {
    const { id } = req.params.id
    const userID = req.user.id

    const correctUser = await checkIfUserAssignToThisTableRequest(userID,id)

    if(!correctUser.length){
        res.status(404)
        res.json({ "error": "Table not found" })
    }
        
    const deleteTableData = await deleteTableRequest(id)
    if (!deleteTableData.length) {
        res.status(404)
        res.json({ "error": "Table not found" })
    }

    res.status(200).json({ id })
})

async function getAllTablesForUserRequest(userID){
    const [rows] = await pool.query(`
    SELECT *
    FROM tables
    WHERE table_id IN (SELECT table_id FROM table_users WHERE user_id = ?)
`, [userID])

    return rows
}

async function createTableRequest(name){
    const [rows] = await pool.query(`
    INSERT INTO tables SET name = ?
    `,[name])

    return rows
}

async function createTableUserRequest(id,userID){
    const [rows] = await pool.query(`
    INSERT INTO user_tables SET user_id = ?, table_id = ?
    `,[userID,id])

    return rows
}
async function checkIfUserAssignToThisTableRequest(userID,tableID){
    const [rows] = await pool.query(`
    SELECT * FROM table_users WHERE user_id = ? AND table_id =?)
`, [userID,tableID])

    return rows
}

async function getTableRequest(id){
    const [rows] = await pool.query(`
    SELECT *
    FROM tables
    WHERE table_id = ?)
`, [id])

return rows
}

async function updateTableRequest(name,id){
    const [rows] = await pool.query(`
    INSERT INTO tables SET name = ? WHERE table_id = ?
    `,[name,id])

    return rows
}

async function deleteTableRequest(id){
    const [rows] = await pool.query(`
    DELETE FROM tables WHERE table_id = ?
    `,[id])

    return rows
}


module.exports = { getTables, createTable, getTable, updateTable, deleteTable }