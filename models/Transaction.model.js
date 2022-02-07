const { Schema, model } = require("mongoose")

const transactionSchema = new Schema(
    {
        title: String,
        date: String,
        time: String,
        type: {
            enum: ["income", "expense"],
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    {
        timestamps: true,
    }
)

const Transaction = model("Transaction", transactionSchema)

module.exports = Transaction
