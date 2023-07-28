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
// * Interface para o TS
export interface TPosts{
    id: string,
    creatorId: string,
    content: string,
    likes: number,
    deslikes: number,
    createdAt: string,
    updatedAt: string
}

// * Interface para o SQL
export interface TPostsDB{
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
export interface TPosts{
    userId:string,
    postId:string,
    like:number
}

// * Interface para o SQL
export interface TPostsDB{
    user_id:string,
    post_id:string,
    like:number
}


