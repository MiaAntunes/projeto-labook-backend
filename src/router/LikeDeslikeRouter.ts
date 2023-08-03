
import express from 'express'
import { LikeDeslikeControllers } from '../controllers/LikeDeslikesControllers';


export const likeDeslikeRouter = express.Router()
const likeDeslikeControllers = new LikeDeslikeControllers();


likeDeslikeRouter.get('/:id', likeDeslikeControllers.postLikeDeslike)

