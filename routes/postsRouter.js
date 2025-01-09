import {Router} from 'express'
import { getAllPosts, createPost } from '../controllers/postsController.js'

const postsRouter = Router()


postsRouter.get('/posts', getAllPosts )
postsRouter.post('/posts', createPost)



export default postsRouter