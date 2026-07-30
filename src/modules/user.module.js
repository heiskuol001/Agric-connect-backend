import mongoose, { Schema } from "mongoose"


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [50, "Name can not exceed 50 characters"],
            match: [
                /^[A-Za-z\s]+$/,
                "Name can only contain letters and spaces"
            ]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false,
        },
        role: {
            type: String,
            enum: ["farmer", "buyer"],
            required: [true, "Role is required"],
            default: "buyer",
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
            unique: true,
            match: [
                /^\+[1-9]\d{1,14}$/,
                "Please enter a valid phone number in international format (e.g. +256701234567)"
            ]
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
            minlength: [2, "Location must be at least 2 characters"],
            maxlength: [100, "Location cannot exceed 100 characters"],
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
export default User;