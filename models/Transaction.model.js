const { Schema, model } = require("mongoose")

const transactionSchema = new Schema(
    {
        title: String,

        amount: Number,

        date: String,

        dateShort: String,

        type: {
            enum: ["income", "expense"],
            type: String,
        },

        category: String,

        dateAdded: String,
    },
    {
        timestamps: true,
    }
)

const Transaction = model("Transaction", transactionSchema)

module.exports = Transaction
