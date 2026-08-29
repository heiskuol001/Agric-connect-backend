import { userRegistrationService, userLoginService } from "../services/user.service.js"
import User from "../modules/user.module.js"


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

        const { user, token } = await userLoginService(
            email,
            password
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const userLogOutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to get current user"
    });
  }
};

export {userRegistrationController, userLoginController, userLogOutController, getCurrentUser}