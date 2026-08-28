import { Timestamp } from 'mongodb'
import mongoose from 'mongoose'


const notificationSchema = new mongoose(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        Timestamp: true
    }
)

const Notification = mongoose.model("Notification", notificationSchema)

export default Notification