import { BaseDatabase } from "../BaseDatabase";


export class LikeDeslikeDatabase extends BaseDatabase {
    // * Create Likes e Deslikes - insert 
    public async updateLikeOrDeslike (likeOrDeslike: boolean, idPost: string): Promise <void>{
        if(likeOrDeslike === true){
            await BaseDatabase.connection("likes_deslikes")
            .where({post_id: idPost})
            .update({like: 1}) // ! Como fazer para somar?
        }else{
            await BaseDatabase.connection("likes_deslikes")
            .where({post_id: idPost})
            .update({like: 0})
        }
    }
   
}