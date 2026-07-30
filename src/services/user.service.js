import User from '../modules/user.module.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userRegistrationService = async (name, email, password, role, phone, location) => {
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new Error('user already exist')
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create(
            {
                name,
                email,
                password : hashedPassword,
                role,
                phone,
                location
            }
        )
        return user;
    } catch (error) {
        throw error;
    }
}

const userLoginService = async (email, password) => {
    const userExist = await User.findOne({ email }).select("+password");
    console.log(userExist);
console.log("Stored password:", userExist.password);

    if (!userExist) {
        throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        userExist.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: userExist._id,
            role: userExist.role
        },
        process.env.JWT_TOKEN,
        {
            expiresIn: "1d"
        }
    );

    const { password: _, ...user } = userExist.toObject();

    return {
        user,
        token
    };
};
export {userRegistrationService, userLoginService}