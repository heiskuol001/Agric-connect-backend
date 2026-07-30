import {userRegistrationService, userLoginService} from "../services/user.service.js"


const userRegistrationController = async (req,res) => {
    try {
        const { name, email, password, role, phone, location } = req.body
        const user = await userRegistrationService(
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

const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await userLoginService(email, password);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export {userRegistrationController, userLoginController}