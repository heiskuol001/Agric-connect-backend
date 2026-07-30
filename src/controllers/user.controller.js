import userService from "../services/user.service.js"


const userRegistration = async (req,res) => {
    try {
        const { name, email, password, role, phone, location } = req.body
        const user = await userService(
            name,
            email,
            password,
            role,
            phone,
            location
        )
        res.status(201).json({
            message:"user created successfully"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

export default userRegistration