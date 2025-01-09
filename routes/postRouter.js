import {Router} from 'express'
import { getAllPosts, createPost } from '../controllers/postsController.js'
import express from 'express';

const postsRouter = express.Router()


postsRouter.get('/', getAllPosts )
postsRouter.post('/', createPost)



export default postsRouter