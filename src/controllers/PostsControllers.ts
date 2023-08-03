import { Request, Response } from "express";
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { PostsModels } from "../models/Posts";
import { TPostsDBCreate, TPostsView } from "../types";
import { PostsBusiness } from "../business/PostsBusiness";
import { CreatePostSchema } from "../dto/PostDTO/createPostdto";


export class PostsControllers {
    constructor(
       private postsBusiness: PostsBusiness
    ){}

    // Get Posts - OK ESTÁ PEGANDO
    public getPosts = async (req: Request, res: Response) => {
        try {
            // * Tem um headers.authorization
            const results = await this.postsBusiness.getPosts()
            // console.log(results)

            res.status(200).send(results)
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }
    }

    //  Post Posts - OK ESTÁ PEGANDO
    public postPosts = async (req: Request, res: Response) => {
        try {
            //Tem um headers.authorization

            const input = CreatePostSchema.parse({
                idUser: req.params.id as string,
                newContent: req.body.content as string
            })

            const results = await this.postsBusiness.postPosts(input)

            res.status(200).send(results.message)
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }

    }

    // Put Posts - OK ESTÁ PEGANDO
    public putPosts = async (req: Request, res: Response) => {
        //Tem um headers.authorization
        try {

            const input= {
                idPost: req.params.id as string,
                newContent: req.body.content as string
            }

            const result = await this.postsBusiness.putPosts(input)

            res.status(200).send(result.message)

        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }

    }

    // * Delete Post - 
    public deletePost = async (req: Request, res: Response) => {
        try {
            //Tem um headers.authorization
            const input = {
                idPost:req.params.id
            }

            const result = await this.postsBusiness.deletePost(input)

            res.status(200).send(result.message)
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }
    }
}