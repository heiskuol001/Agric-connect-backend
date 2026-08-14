import mongoose from "mongoose"


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_MONGO_URI)
        console.log('mongoDB connected successfully')
    } catch (error) {
        console.log('error, failed to connect to the database', error)
    }
}

export default connectDB