import { router } from 'express'
import Users from '../models/Users'

const userRouter = Router()

userRouter.get('/users', async (req, res) => {
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
})

userRouter.get('/users/:id', async (req, res) => {
    try {
        const userByID = await Users.findById(id)
        return res.status(200).json(userByID)
    }
    catch (err) {
        return res.status(500).json({ message: 'internal server error' })
    }
})
userRouter.post('/users', async (req, res) => {
    const { first_name, last_name, passion } = req.body
    try {
        const newUser = await Users.create(req.body)
        return res.status(201).json(newUser)
    }
    catch (err) {
        return res.status(500).json({ message: 'internal server error' })
    }
})


export default userRouter