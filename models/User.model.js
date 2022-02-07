const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: String,
        verified: Boolean,
        verifyToken: String,
        resetToken: String,
        balance: Number,
        transactions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Transaction",
            },
        ],
    },
    {
        timestamps: true,
    }
)

const User = model("User", userSchema)

module.exports = User
