const express = require("express")
const { getColumns, createColumn, updateColumn, deleteColumn } = require("../controllers/columnController")
const router = express.Router()

router.route("/").get(getColumns).post(createColumn)
router.route("/:id").put(updateColumn).delete(deleteColumn)

module.exports = router