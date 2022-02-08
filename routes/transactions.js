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
    const { title, date, type, category, newCategory, user, amount, dateAdded } = req.body

    if (!title) {
        return res.status(400).json({ message: "The title is required" })
    }

    if (!category) {
        return res.status(400).json({ message: "The category is required" })
    }

    Transaction.create({ title, date, type, category, amount, dateAdded })
        .then(createdTransaction => {
            User.findByIdAndUpdate(
                user._id,
                {
                    $push: {
                        transactions: createdTransaction,
                        categories: newCategory,
                    },
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

router.put("/edit-transaction/:id", (req, res, next) => {
    const { title, date, type, category, newCategory, amount, user } = req.body

    if (!title) {
        return res.status(400).json({ message: "The title is required" })
    }

    if (!category) {
        return res.status(400).json({ message: "The category is required" })
    }

    Transaction.findByIdAndUpdate(
        req.params.id,
        {
            title,
            date,
            type,
            category,
            newCategory,
            amount,
        },
        { new: true }
    )
        .then(updatedTransaction => {
            if (newCategory) {
                User.findByIdAndUpdate(
                    user._id,
                    {
                        $push: {
                            categories: newCategory,
                        },
                    },
                    { new: true }
                ).then(updatedUser => {
                    res.status(200).json({
                        user: updatedUser,
                        updatedTransaction,
                    })
                })
            } else {
                res.status(200).json(updatedTransaction)
            }
        })
        .catch(err => next(err))

    // Transaction.create({ title, date, type, category, amount })
    //     .then(createdTransaction => {
    //         User.findByIdAndUpdate(
    //             user._id,
    //             {
    //                 $push: {
    //                     transactions: createdTransaction,
    //                     categories: newCategory,
    //                 },
    //             },
    //             { new: true }
    //         ).then(updatedUser => {
    //             res.status(200).json({
    //                 user: updatedUser,
    //                 createdTransaction,
    //             })
    //         })
    //     })
    //     .catch(err => next(err))
})

router.delete("/delete-transaction/:id", (req, res, next) => {
    Transaction.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Transaction deleted" }))
        .catch(err => next(err))
})

module.exports = router
