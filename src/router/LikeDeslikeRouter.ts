
import express from 'express'
import { LikeDeslikeControllers } from '../controllers/LikeDeslikesControllers';
import { LikeOrDeslikeBusiness } from '../business/LikeDeslikeBusiness';
import { LikeDeslikeDatabase } from '../sql/heranças/LikeDeslikeDatabase';
import { TokenManager } from '../services/TokenManager';
import { PostsDatabase } from '../sql/heranças/PostsDataBase';


export const likeDeslikeRouter = express.Router()
const likeDeslikeControllers = new LikeDeslikeControllers(
    new LikeOrDeslikeBusiness(
        new PostsDatabase(),
        new LikeDeslikeDatabase(),
        new TokenManager()
    )
);


likeDeslikeRouter.put('/:id', likeDeslikeControllers.postLikeDeslike)

