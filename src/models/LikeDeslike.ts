

export class LikeDeslikeModels{
    constructor(
        private userId:string,
        private postId:string,
        private like:number
    ){}

    // * UserId
    public getUserId = (): string => {
        return this.userId
    }

    public setUserId = (newUserId: string) => {
        this.userId = newUserId
    }

    // * PostId
    public getPostId = ():string =>{
        return this.postId
    }

    public setPostId = (newPostId:string) =>{
        this.postId = newPostId
    }

    public getLike = ():number =>{
        return this.like
    }

    public setLike = (newLike:number)=>{
        this.like = newLike
    }

}