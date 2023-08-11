import { Request, Response } from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { CreatePostSchema } from "../dto/PostDTO/createPostdto";
import { EditPostShema } from "../dto/PostDTO/editPostdto";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { GetPostShema } from "../dto/PostDTO/getPostDTO";
import { DeletePostSchema } from "../dto/PostDTO/deletePostDto";


export class PostsControllers {
    constructor(
        private postsBusiness: PostsBusiness
    ) { }

    // Get Posts - OK ESTÁ PEGANDO
    public getPosts = async (req: Request, res: Response) => {
        try {
            const input = GetPostShema.parse({
                token: req.headers.authorization
            })


            const results = await this.postsBusiness.getPosts(input)

            res.status(200).send(results)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    //  Post Posts - OK ESTÁ PEGANDO
    public postPosts = async (req: Request, res: Response) => {
        try {
            //Tem um headers.authorization

            // ! Dúvidas
            const input = CreatePostSchema.parse({
                newContent: req.body.content as string,
                token: req.headers.authorization as string
            })

            const results = await this.postsBusiness.postPosts(input)

            res.status(200).send(results.message)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }

    }

    // Put Posts - OK ESTÁ PEGANDO
    public putPosts = async (req: Request, res: Response) => {
        //Tem um headers.authorization
        try {

            const input = EditPostShema.parse({
                idPost: req.params.id as string,
                newContent: req.body.content as string,
                token: req.headers.authorization as string
            })

            const result = await this.postsBusiness.putPosts(input)

            res.status(200).send(result.message)

        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }

    }

    // * Delete Post - 
    public deletePost = async (req: Request, res: Response) => {
        try {
            //Tem um headers.authorization
            const input = DeletePostSchema.parse({
                idPost: req.params.id,
                token: req.headers.authorization as string
            })

            const result = await this.postsBusiness.deletePost(input)

            res.status(200).send(result.message)
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }
}