import { CreatePostInputDto, CreatePostOutInputDto } from "../dto/PostDTO/createPostdto"
import { PostsModels } from "../models/Posts"
import { PostsDatabase } from "../sql/heranças/PostsDataBase"
import { UserDatabase } from "../sql/heranças/UsersDatabase"
import { TPostsDBCreate, TPostsView } from "../types"

export class PostsBusiness {

    constructor(
        private postDatabase: PostsDatabase,
        private userDatabase: UserDatabase
    ){}

    //Get Posts - OK ESTÁ PEGANDO
    public getPosts =  async ():Promise <TPostsView[]> =>{

        const postDatabase = new PostsDatabase()
        const getPosts = await postDatabase.getPosts()
        

        const resultsPosts: TPostsView[] = getPosts.map((post) => {
            const result: TPostsView = {
                id: post.id,
                content: post.content,
                likes: post.likes,
                deslikes: post.deslikes,
                createdAt: post.created_at,
                updatedAt: post.updated_at,
                creator: {
                    id: post.id,
                    name: post.name
                },
            }
            return result
        })
        
        // console.log(resultsPosts)

        return resultsPosts
    }

    // !Post Posts - Está pegando, porém falta coisa!!
    public postPosts = async (input:CreatePostInputDto): Promise <CreatePostOutInputDto> =>{

        const {idUser, newContent} = input
        // console.log(" USER",idUser)

        const [verificationUserExist] = await this.userDatabase.findUserId(idUser)
        // console.log(verificationUserExist)

        // ! Dúvida no p003
        const newPost = new PostsModels(
            "p003",
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
    public putPosts = async (input:any) =>{
        
        const {idPost, newContent} = input
        
        const [verificationPostExist] = await this.postDatabase.findPost(idPost)
        // console.log(verificationPostExist)

        if (!verificationPostExist) {
            throw new Error("Esse post não existe, crie um novo post!")
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
            if (typeof newContent !== "string") {
                throw new Error("O content precisa ser uma string.")
            }
            if (newContent.length <= 1) {
                throw new Error("O content precisa ter mais que um caracter.")
            }

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
    public deletePost = async (input:any) =>{

        const {idPost} = input

        const [verificationPostExist] = await this.postDatabase.findPost(idPost)

        if (!verificationPostExist) {
            throw new Error("Esse post não existe ou id está errado")
        }

        await this.postDatabase.deletePost(idPost)

        const output = {
            message: "Deletado o post"
        }

        return output
    }
}