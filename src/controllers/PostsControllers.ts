import { Request, Response } from "express";
import { PostsDatabase } from "../sql/heranças/PostsDataBase";
import { PostsModels } from "../models/Posts";
import { TPostsDBCreate, TPostsView } from "../types";


export class PostsControllers {

    // * Get Posts - OK !
    public getPosts = async (req: Request, res: Response) => {
        try {
            // * Tem um headers.authorization
            const postDatabase = new PostsDatabase()
            const getPosts = await postDatabase.getPosts()
            // console.log(getPosts)

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


            res.status(200).send(resultsPosts)
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }
    }

    // * Post Posts - OK !
    public postPosts = async (req: Request, res: Response) => {
        try {
            //Tem um headers.authorization
            const id = req.params.id as string
            const newContent = req.body.content as string

            const postDataBase = new PostsDatabase()

            // ! Dúvidas
            const newPost = new PostsModels(
                "p003",
                "u001",
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

            await postDataBase.insertPosts(newPostsDB)

            res.status(200).send("Criado o novo Post")
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }

    }

    // * Put Posts - OK !
    public putPosts = async (req: Request, res: Response) => {
        //Tem um headers.authorization
        try {
            const id = req.params.id as string
            const newContent = req.body.content as string

            const postDataBase = new PostsDatabase()
            const [verificationPostExist] = await postDataBase.findPost(id)
            // console.log(verificationPostExist)

            if (!verificationPostExist) {
                res.status(400)
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
                    res.status(400)
                    throw new Error("O content precisa ser uma string.")
                }
                if (newContent.length <= 1) {
                    res.status(400)
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

            await postDataBase.updatePost(updatePostDB)

            res.status(200).send("Seu post foi editado com sucesso.")

        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }

    }

    // * Delete Post - OK!
    public deletePost = async (req: Request, res: Response) => {
        try {
            //Tem um headers.authorization
            const idPost = req.params.id

            const postDataBase = new PostsDatabase()
            const [verificationPostExist] = await postDataBase.findPost(idPost)

            if (!verificationPostExist) {
                res.status(400)
                throw new Error("Esse post não existe ou id está errado")
            }

            await postDataBase.deletePost(idPost)

            res.status(200).send("Seu post foi deletado com sucesso.")
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