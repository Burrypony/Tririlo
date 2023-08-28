const express = require("express")
const validateTokenHandler = require('../middleware/validateTokenHandler')
const { getTables, createTable, getTable, updateTable, deleteTable } = require("../controllers/tableController")
const router = express.Router()

router.use(validateTokenHandler)
router.route("/").get(getTables).post(createTable)
router.route("/:id").get(getTable).put(updateTable).delete(deleteTable)

module.exports = router