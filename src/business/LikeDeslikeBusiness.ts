import { LikeOrDeslikeInputDto, LikeOrDeslikeOutInputDto } from "../dto/LikeDeslikeDTO/LikeOrDeslikeDto";
import { BadRequestError } from "../errors/BadRequestError";
import { LikeDeslikeModels, POST_LIKE } from "../models/LikeDeslike";
import { PostsModels } from "../models/Posts";
import { TokenManager } from "../services/TokenManager";
import { LikeDeslikeDatabase } from "../sql/heranças/LikeDeslikeDatabase";
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { TLikeDeslikeDB, TPostsDB } from "../types";


export class LikeOrDeslikeBusiness {
    constructor(
        private postDataBase: PostsDatabase,
        private likesDeslikesDatabase: LikeDeslikeDatabase,
        private tokenManager: TokenManager
    ){}

    public postLikeOrDeslikeBusiness = async (input: LikeOrDeslikeInputDto): Promise <LikeOrDeslikeOutInputDto> => {

        const {idPost, likeOrDeslike, token} = input

        const [verificationPostExist] = await this.postDataBase.findPost(idPost)

        const payload = this.tokenManager.getPayload(token) 

        if(!verificationPostExist){
            throw new BadRequestError("Esse post não existe ou id está errado")
        }

        if(payload === null){
            throw new BadRequestError("Não autorizado")
        }

        if(verificationPostExist.creator_id === payload.id){
            throw new BadRequestError("Você não pode curtir seu próprio post")
        }

        const postModels = new PostsModels(
            verificationPostExist.id,
            verificationPostExist.creator_id,
            verificationPostExist.content,
            verificationPostExist.likes,
            verificationPostExist.deslikes,
            verificationPostExist.created_at,
            verificationPostExist.updated_at
        )

        const likeSQLlite = likeOrDeslike ? 1 : 0

        const likeDeslikeDB: TLikeDeslikeDB = {
            user_id: payload.id,
            post_id: postModels.getId(),
            like: likeSQLlite
        }


        const resultAlreadyLikeOrDeslike = await this.likesDeslikesDatabase.findLikeOrDeslike(likeDeslikeDB)

        if( resultAlreadyLikeOrDeslike === POST_LIKE.ALREADY_LIKED){
            if(likeOrDeslike){

                await this.likesDeslikesDatabase.removeLikeDeslike(likeDeslikeDB) 
                postModels.removeLike()

            }else{

                await this.likesDeslikesDatabase.updateLikeOrDeslike(likeDeslikeDB)
                postModels.removeLike()
                postModels.addDeslike()

            }
        }else if(resultAlreadyLikeOrDeslike === POST_LIKE.ALREADY_DESLIKED){
            if(likeOrDeslike === false){
                await this.likesDeslikesDatabase.removeLikeDeslike(likeDeslikeDB)
                postModels.removeDeslike()
            }else{
                await this.likesDeslikesDatabase.updateLikeOrDeslike(likeDeslikeDB)
                postModels.removeDeslike()
                postModels.addLike()
            }
        }else{
            await this.likesDeslikesDatabase.insertLikeDeslike(likeDeslikeDB)
            likeOrDeslike ? postModels.addLike() : postModels.addDeslike()
        }

        // Update
        const updatePostDB: TPostsDB = {
            id: postModels.getId(),
            creator_id: postModels.getCreatorId(),
            content: postModels.getContent(),
            likes: postModels.getLikes(),
            deslikes:postModels.getDeslikes(),
            created_at: postModels.getCreatedAt(),
            updated_at: postModels.getUpdatedAt()
        }

        await this.postDataBase.updatePost(updatePostDB)

        const output = {
            message: "Deu certo"
        }

        return output
    }
}