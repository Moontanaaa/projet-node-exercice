import { Router } from 'express'
import { createUser, deleteUser, getAllUsers , getUserByID } from '../controllers/usersController.js'

const userRouter = Router()

userRouter.get('/users', getAllUsers )

userRouter.get('/users/:id', getUserByID )

userRouter.post('/users',  createUser )

userRouter.delete('/users/:id', deleteUser)


export default userRouter

