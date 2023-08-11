
export class PostsModels{
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes: number,
        private deslikes: number,
        private createdAt: string,
        private updatedAt: string
    ){}

    public getId = (): string => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public getCreatorId = ():string =>{
        return this.creatorId
    }

    public setCreatorId = (newCreatorId:string) =>{
        this.creatorId = newCreatorId
    }

    public getContent = ():string =>{
        return this.content
    }

    public setContent = (newContent:string)=>{
        this.content = newContent
    }

    public getLikes = ():number =>{
        return this.likes
    }

    public setLikes = (newLikes:number)=>{
        this.likes = newLikes
    }

    public addLike = ():void =>{
        this.likes++
    }

    public removeLike = ():void =>{
        this.likes--
    }

    public getDeslikes = ():number =>{
        return this.deslikes
    }

    public setDeslikes = (newDeslikes:number)=>{ 
        this.deslikes = newDeslikes
    }

    public addDeslike = ():void =>{
        this.deslikes++
    }

    public removeDeslike = ():void =>{
        this.deslikes--
    }

    public getCreatedAt = ():string =>{
        return this.createdAt
    }

    public setCreatedAt= (newCreatedAt:string)=>{
        this.createdAt = newCreatedAt
    }

    public getUpdatedAt = ():string =>{
        return this.updatedAt
    }

    public setUpdatedAt= (newUpdateAt:string)=>{
        this.updatedAt = newUpdateAt
    }

}