require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

const User = require("../models/User.model")

const transactions = [
    "62027288d47f2fac1450aa26",
    "62027288d47f2fac1450aa27",
    "62027288d47f2fac1450aa28",
    "62027288d47f2fac1450aa29",
    "62027288d47f2fac1450aa2a",
    "62027288d47f2fac1450aa2b",
    "62027288d47f2fac1450aa2c",
    "62027288d47f2fac1450aa2d",
    "62027288d47f2fac1450aa2e",
    "62027288d47f2fac1450aa2f",
    "62027288d47f2fac1450aa30",
    "62027288d47f2fac1450aa31",
    "62027288d47f2fac1450aa32",
    "62027288d47f2fac1450aa33",
    "62027288d47f2fac1450aa34",
    "62027288d47f2fac1450aa35",
    "62027288d47f2fac1450aa36",
    "62027288d47f2fac1450aa37",
    "62027288d47f2fac1450aa38",
    "62027288d47f2fac1450aa39",
    "62027288d47f2fac1450aa3a",
    "62027288d47f2fac1450aa3b",
    "62027288d47f2fac1450aa3c",
    "62027288d47f2fac1450aa3d",
    "62027288d47f2fac1450aa3e",
    "62027288d47f2fac1450aa3f",
    "62027288d47f2fac1450aa40",
    "62027288d47f2fac1450aa41",
    "62027288d47f2fac1450aa42",
    "62027288d47f2fac1450aa43",
]

User.findOneAndUpdate(
    { _id: "6201a41074cc7e7ab0f9a158" },
    { $push: { transactions: transactions } },
    { new: true }
)
    .then(() => {
        console.log(`Success, ${transactions.length} transactions were pushed to Julien`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
