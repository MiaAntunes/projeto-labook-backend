import { PostsBusiness } from "../business/PostsBusiness";
import { PostsControllers } from "../controllers/PostsControllers";
import express from 'express'
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { UserDatabase } from "../sql/heranças/UsersDatabase";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";


export const postsRouter = express.Router()
const postsControllers = new PostsControllers(
    new PostsBusiness(
        new PostsDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
);


postsRouter.get('/', postsControllers.getPosts)

// temporário esse id
postsRouter.post('/', postsControllers.postPosts)

postsRouter.put('/:id', postsControllers.putPosts)

postsRouter.delete('/:id', postsControllers.deletePost)