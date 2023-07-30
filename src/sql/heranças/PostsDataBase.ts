import { TPostsDB, TPostsDBCreate } from "../../types";
import { BaseDatabase } from "../BaseDatabase";


export class PostsDatabase extends BaseDatabase {
    // * Find User by Id
    public async findPost(idPost: string): Promise<TPostsDB[]> {

        let results: TPostsDB[] = []

        results = await BaseDatabase.connection('posts').where({ id: idPost })

        return results

    }

    // * View Posts
    public async getPosts(): Promise<TPostsDB[]> {

        let response: TPostsDB[] = await BaseDatabase
            .connection('posts')
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.deslikes",
                "posts.created_at",
                "posts.updated_at",
                "users.id",
                "users.name"
            )
            .innerJoin("users", "posts.creator_id", "=", "users.id")

        // console.log(response)

        return response
    }

    // * Create Posts - insert 
    public async insertPosts(newPosts: TPostsDBCreate): Promise<void> {

        await BaseDatabase.connection('posts').insert(newPosts)

    }

    // * Edit Posts - update 
    public async updatePost(post: TPostsDBCreate): Promise<void> {

        await BaseDatabase.connection('posts')
            .update(post)
            .where({ id: post.id })

    }

    // * Deelete Posts - delete 
    public async deletePost(idPost: string): Promise<void> {

        await BaseDatabase.connection('posts')
        .where({id:idPost})
        .delete(idPost)

    }
}