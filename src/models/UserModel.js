import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    email: {
        type: String,
        required: false,
        index: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 11,
        index: true,
        unique: true
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    systemOS: {
        type: String,
        required: true,
    },
    tokenExpiration: {
        type: String,
        required: false,
        default: "3h"
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {
    timestamps: true,
})

export default mongoose.models.User || mongoose.model("User", userSchema)