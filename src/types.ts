export enum USER_ROLES{
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

///// Users
// * Interface para o TS - View
export  interface TUsersView{
    id: string,
    name: string,
    email: string,
    createdAt: string
}

// * Interface para o TS - Edit
export  interface TUsersEdit{
    id: string,
    name: string,
    email: string,
    password: string ,
    role: USER_ROLES ,
    createdAt: string
}

// * Interface para o SQL
export interface TUsersDB{
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

///// Posts
// * Interface para o TS - View
export interface TPostsView{
    postId: string,
    content: string,
    likes: number,
    deslikes: number,
    createdAt: string,
    updatedAt: string
    creator: {
        usersId: string,
        name: string
    }
}

// * Interface para o SQL
export interface TPostsDBView{
    postId: string,
    usersId: string,
    content: string,
    likes: number,
    deslikes: number,
    created_at: string,
    updated_at: string
    name:string 
}

export interface TPostsDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    deslikes: number,
    created_at: string,
    updated_at: string
}

export interface TPostsDBCreate{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    deslikes: number,
    created_at: string,
    updated_at: string
}

///// Likes & Deslikes
// * Interface para o TS
export interface TLikeDeslike{
    userId:string,
    postId:string,
    like:number
}

// * Interface para o SQL
export interface TLikeDeslikeDB{
    user_id:string,
    post_id:string,
    like:number
}


