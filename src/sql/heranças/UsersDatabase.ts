import { TUsersDB } from "../../types";
import { BaseDatabase } from "../BaseDatabase";


export class UserDatabase extends BaseDatabase {
    // * Find User by Email
    public async findUserEmail (newEmail:string): Promise<TUsersDB[]>{
        
        let results: TUsersDB[] = []

        results = await BaseDatabase.connection('users').where({ email : newEmail})

        return results
    }

    // * Find User by Id
    public async findUserId (newId: string): Promise<TUsersDB[]>{

        let results: TUsersDB[] = [];

        results = await BaseDatabase.connection('users').where({id: newId})
        console.log(results)

        return results
    }
    
    // ! Login - select, where id ?
    public async selectUser ():Promise<TUsersDB[]>{

        let results: TUsersDB[] = []

        results =  await BaseDatabase.connection("users").select("*")
        console.log(results)

        return results
    }

    // * Sign Up - insert 
    public async insertUser (newUser: TUsersDB):Promise<void>{

        await BaseDatabase.connection('users').insert(newUser)
    }
    

   
}