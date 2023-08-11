import { POST_LIKE } from "../../models/LikeDeslike";
import { TLikeDeslikeDB } from "../../types";
import { BaseDatabase } from "../BaseDatabase";


export class LikeDeslikeDatabase extends BaseDatabase {
    // * Create Likes e Deslikes - insert 
    public findLikeOrDeslike = async (likeDeslikeDB: TLikeDeslikeDB): Promise < POST_LIKE | undefined > =>{

        const [result] = await BaseDatabase.connection("likes_deslikes")
        .select()
        .where({
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        })

        if(result === undefined){
            return undefined
        }
        const resultLikeOrDeslike = result.like === 1 ? POST_LIKE.ALREADY_LIKED : POST_LIKE.ALREADY_DESLIKED    


        return resultLikeOrDeslike as POST_LIKE | undefined
    }

    public removeLikeDeslike = async (likeDeslikeDB:TLikeDeslikeDB):Promise<void> =>{
        await BaseDatabase.connection("likes_deslikes")
        .delete()
        .where({
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        })
    }


    public async updateLikeOrDeslike (likeDeslikeDB: TLikeDeslikeDB): Promise <void>{
        await BaseDatabase.connection("likes_deslikes")
        .update(likeDeslikeDB)
        .where({
            user_id: likeDeslikeDB.user_id,
            post_id: likeDeslikeDB.post_id
        }) 
    }

    public async insertLikeDeslike (likeDeslikeDB: TLikeDeslikeDB): Promise <void>{
        await BaseDatabase.connection("likes_deslikes")
        .insert(likeDeslikeDB) 
    }
   
}