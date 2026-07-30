import User from '../modules/user.module.js'
import bcrypt from 'bcrypt'


const userService = async (name, email, password, role, phone, location) => {
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

export default userService