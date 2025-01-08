import Users from "../models/Users";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find()
        if (users.length < 1) {
            return res.status(400).json({ message: 'Users not found' })
        }
        return res.status(200).json(users)
    }
    catch (err) {
        return res.status(500).json({ message: 'internal server error' })
    }
}