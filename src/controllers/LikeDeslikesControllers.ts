import { Request, Response } from "express";
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { LikeDeslikeDatabase } from "../sql/heranças/LikeDeslikeDatabase";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";


export class LikeDeslikeControllers {

    // * Post Like Deslike
    public postLikeDeslike = async (req: Request, res: Response) => {
        try{
            // headers.authorization
            const idPost = req.params.id as string
            const likeOrDeslike = req.body.like as boolean

            const postDataBase = new PostsDatabase()
            const [verificationPostExist] = await postDataBase.findPost(idPost)

            if(!verificationPostExist){
                res.status(400)
                throw new Error("Esse post não existe ou id está errado")
            }

            // Verificação
            if(likeOrDeslike){
                if(typeof likeOrDeslike !== "boolean"){
                    res.status(400)
                    throw new Error("O like precisa ser uma booleno.")
                }
            }else{
                res.status(400)
                throw new Error("É obrigatório o like !")
            }

            const likesDeslikesDatabase = new LikeDeslikeDatabase()
            await likesDeslikesDatabase.updateLikeOrDeslike(likeOrDeslike, idPost)

            res.status(200).send("Ok.")            
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