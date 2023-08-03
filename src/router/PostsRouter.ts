import { PostsBusiness } from "../business/PostsBusiness";
import { PostsControllers } from "../controllers/PostsControllers";
import express from 'express'
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { UserDatabase } from "../sql/heranças/UsersDatabase";


export const postsRouter = express.Router()
const postsControllers = new PostsControllers(
    new PostsBusiness(
        new PostsDatabase(),
        new UserDatabase()
    )
);


postsRouter.get('/', postsControllers.getPosts)

// temporário esse id
postsRouter.post('/:id', postsControllers.postPosts)

postsRouter.put('/:id', postsControllers.putPosts)

postsRouter.delete('/:id', postsControllers.deletePost)