// Packages
const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")

const saltRounds = 10

// Get all users
router.get("/user", (req, res, next) => {
    User.find()
        .then(userFromDb => {
            res.status(200).json(userFromDb)
        })
        .catch(err => next(err))
})

// Get user by ID
router.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(userFromDb => res.status(200).json(userFromDb))
        .catch(err => next(err))
})

// Edit account
router.put("/edit", (req, res, next) => {
    const { id, fullName } = req.body

    User.findByIdAndUpdate(id, { fullName }, { new: true })
        .then(updatedUser => {
            res.status(200).json({ user: updatedUser })
        })
        .catch(err => next(err))
})

// Edit password
router.put("/edit-password", (req, res, next) => {
    const { id, password } = req.body

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if (!regex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    return bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            return User.findByIdAndUpdate(id, { password: hashedPassword })
                .then(updatedUser => {
                    res.status(200).json({ user: updatedUser })
                })
                .catch(err => next(err))
        })
})

// Delete account
router.delete("/delete-user/:id", (req, res, next) => {
    const id = req.params.id

    User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "User deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
