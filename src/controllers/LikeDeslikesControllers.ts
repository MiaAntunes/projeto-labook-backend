import { Request, Response } from "express";
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { LikeDeslikeDatabase } from "../sql/heranças/LikeDeslikeDatabase";


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

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }
    }
}