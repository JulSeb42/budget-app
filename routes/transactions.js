const router = require("express").Router()
const Transaction = require("../models/Transaction.model")
const User = require("../models/User.model")

router.get("/transactions", (req, res, next) => {
    Transaction.find()
        .then(foundTransaction => res.status(200).json(foundTransaction))
        .catch(err => next(err))
})

router.get("/transaction/:id", (req, res, next) => {
    Transaction.findById(req.params.id)
        .then(foundTransaction => res.status(200).json(foundTransaction))
        .catch(err => next(err))
})

router.post("/new-transaction", (req, res, next) => {
    const {
        title,
        date,
        type,
        category,
        newCategory,
        user,
        newBalance,
        amount,
    } = req.body

    if (!title) {
        return res.status(400).json({ message: "The title is required" })
    }

    if (!category) {
        return res.status(400).json({ message: "The category is required" })
    }

    Transaction.create({ title, date, type, category, amount })
        .then(createdTransaction => {
            User.findByIdAndUpdate(
                user._id,
                {
                    $push: {
                        transactions: createdTransaction,
                        categories: newCategory,
                    },
                    balance: newBalance,
                },
                { new: true }
            ).then(updatedUser => {
                res.status(200).json({
                    user: updatedUser,
                    createdTransaction,
                })
            })
        })
        .catch(err => next(err))
})

module.exports = router