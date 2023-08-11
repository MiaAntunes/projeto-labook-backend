import { CreatePostInputDto, CreatePostOutInputDto } from "../dto/PostDTO/createPostdto"
import { DeletePostInputDto, DeletePostOutInputDto } from "../dto/PostDTO/deletePostDto"
import { EditPostInputDTO, EditPostOutinputDTO } from "../dto/PostDTO/editPostdto"
import { GetPostInputDTO } from "../dto/PostDTO/getPostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { PostsModels } from "../models/Posts"
import { TokenManager } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { PostsDatabase } from "../sql/heranças/PostsDataBase"
import { UserDatabase } from "../sql/heranças/UsersDatabase"
import { TPostsDBCreate, TPostsView } from "../types"

export class PostsBusiness {

    constructor(
        private postDatabase: PostsDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ){}

    //Get Posts - OK ESTÁ PEGANDO
    public getPosts =  async (input:GetPostInputDTO):Promise <TPostsView[]> =>{
        
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }

        const getPosts = await this.postDatabase.getPosts()
        
        const resultsPosts: TPostsView[] = getPosts.map((post) => {
            const result: TPostsView = {
                postId: post.postId,
                content: post.content,
                likes: post.likes,
                deslikes: post.deslikes,
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                creator: {
                    usersId: post.usersId,
                    name: post.name
                },
            }
            return result
        })
        

        return resultsPosts
    }
    
    public postPosts = async (input:CreatePostInputDto): Promise <CreatePostOutInputDto> =>{

        const { newContent, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }

        const [verificationUserExist] = await this.userDatabase.findUserId(payload.id)

        const newId = this.idGenerator.generate()

        const newPost = new PostsModels(
            newId,
            verificationUserExist.id,
            newContent,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        const newPostsDB: TPostsDBCreate = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            deslikes: newPost.getDeslikes(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getUpdatedAt()
        }

        await this.postDatabase.insertPosts(newPostsDB)

        const output: CreatePostOutInputDto = {
            message: "Criado o novo Post"
        }

        return output
    }

    //Put Posts - OK ESTÁ PEGANDO
    public putPosts = async (input:EditPostInputDTO): Promise <EditPostOutinputDTO> =>{
        
        const {idPost, newContent, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }
        
        const [verificationPostExist] = await this.postDatabase.findPost(idPost)

        if (!verificationPostExist) {
            throw new BadRequestError("Esse post não existe, crie um novo post!")
        }

        const updatePost = new PostsModels(
            verificationPostExist.id,
            verificationPostExist.creator_id,
            verificationPostExist.content,
            verificationPostExist.likes,
            verificationPostExist.deslikes,
            verificationPostExist.created_at,
            verificationPostExist.updated_at
        )

        // Verificação
        if (newContent) {
            updatePost.setContent(newContent)
            updatePost.setUpdatedAt(new Date().toISOString())
        }

        const updatePostDB: TPostsDBCreate = {
            id: updatePost.getId(),
            creator_id: updatePost.getCreatorId(),
            content: updatePost.getContent(),
            likes: updatePost.getLikes(),
            deslikes: updatePost.getDeslikes(),
            created_at: updatePost.getCreatedAt(),
            updated_at: updatePost.getUpdatedAt()
        }

        await this.postDatabase.updatePost(updatePostDB)

        const output = {
            message: "Editado o post"
        }

        return output
    }

    //Delete Posts - OK ESTÁ PEGANDO
    public deletePost = async (input:DeletePostInputDto):Promise <DeletePostOutInputDto> =>{

        const {idPost, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(payload === null){
            throw new BadRequestError("token inválido")
        }

        const [verificationPostExist] = await this.postDatabase.findPost(idPost)

        if (!verificationPostExist) {
            throw new BadRequestError("Esse post não existe ou id está errado")
        }

        await this.postDatabase.deletePost(idPost)

        const output = {
            message: "Deletado o post"
        }

        return output
    }
}