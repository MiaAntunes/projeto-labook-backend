import { USER_ROLES } from "../types"

export class UserModels{
    constructor(
        private id:string,
        private name:string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ){}

    // * ID
    public getId = (): string => {
        return this.id
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    // * Name
    public getName = ():string =>{
        return this.name
    }

    public setName = (newName:string) =>{
        this.name = newName
    }

    // * Email
    public getEmail = ():string =>{
        return this.email
    }

    public setEmail = (newEmail:string)=>{
        this.email = newEmail
    }

    // * Password
    public getPassword = ():string =>{
        return this.password
    }

    public setPassword = (newPassword:string)=>{
        this.email = newPassword
    }

    // * ROLE
    public getROLE = ():string =>{
        return this.role
    }

    public setROLE = (newROLE:USER_ROLES)=>{ // Como fizemosum enum, ele automáticamente torna um tipo para a tipagem!
        this.role = newROLE
    }

    // * Created At
    public getCreatedAt = ():string =>{
        return this.createdAt
    }

    public setCreatedAt= (newCreatedAt:string)=>{
        this.createdAt = newCreatedAt
    }

}