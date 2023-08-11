import { Request, Response } from "express";
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { LikeDeslikeDatabase } from "../sql/heranças/LikeDeslikeDatabase";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { LikeOrDeslikeBusiness } from "../business/LikeDeslikeBusiness";
import { LikeOrDeslikeSchema } from "../dto/LikeDeslikeDTO/LikeOrDeslikeDto";


export class LikeDeslikeControllers {
    constructor(
        private likeOrDeslikeBusiness : LikeOrDeslikeBusiness
    ){}

    // * Post Like Deslike
    public postLikeDeslike = async (req: Request, res: Response) => {
        try{

            const input = LikeOrDeslikeSchema.parse({
                idPost: req.params.id as string,
                likeOrDeslike:req.body.like as boolean,
                token: req.headers.authorization as string
            })

            const results = await this.likeOrDeslikeBusiness.postLikeOrDeslikeBusiness(input)

            res.status(200).send(results)            
        }
        catch(error:any){
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