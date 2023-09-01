//@desc Get all card
//@route GET /card
//@access private
const getCards = (req, res) => {
    // const { email, password } = req.body
    // if (!email || !password) {
    //     res.status(400)
    //     res.json({ "error": "All fields mandatory" })
    // }
    res.status(200).json({ data: "Here will be all cards" })
}

//@desc Create card
//@route POST /card
//@access private
const createCard = (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400)
        res.json({ "error": "All fields mandatory" })
    }
    res.status(201).json({ name })
}

//@desc Get Card
//@route GET /card/:id
//@access private
const getCard = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Card not found" })
    }
    res.status(200).json({ id })
}

//@desc Update Card
//@route PUT /card/:id
//@access private
const updateCard = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Card not found" })
    }
    res.status(200).json({ id })
}

//@desc Delete Card
//@route DELETE /card/:id
//@access private
const deleteCard = (req, res) => {
    const { id } = req.params.id
    if (!id) {
        res.status(404)
        res.json({ "error": "Card not found" })
    }
    res.status(200).json({ id })
}



module.exports = { getCards, createCard, getCard, updateCard, deleteCard }