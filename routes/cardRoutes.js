const express = require("express")
const validateTokenHandler = require('../middleware/validateTokenHandler')
const { getCards, createCard, getCard, updateCard, deleteCard } = require("../controllers/cardController")
const router = express.Router()

router.use(validateTokenHandler)
router.route("/").get(getCards).post(createCard)
router.route("/:id").get(getCard).put(updateCard).delete(deleteCard)

module.exports = router