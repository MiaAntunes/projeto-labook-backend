import { Request, Response } from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { CreateUserSchema } from "../dto/UserDTO/createUserdto";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";


export class UserControllers {

    constructor(
        private userBusiness:UsersBusiness
    ){}

    // Login - TESTEi OK
    public getUser = async (req: Request, res: Response) => {
        try {

            const input = {
                email: req.body.email as string,
                password: req.body.password as string
            }

            const response = await this.userBusiness.getUser(input)
            // console.log(response)

            res.status(200).send(response)
            // ! fazer uma resposta de TOKEN 
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }

    // Sign Up - TESTEi OK
    public postUser = async (req: Request, res: Response) => {
        try {

            const input = CreateUserSchema.parse({
                newId: req.body.id , // !Não 
                newName: req.body.name,
                newEmail: req.body.email,
                newPassword:  req.body.password, 
            })

            const response = await  this.userBusiness.postUser(input)


            res.status(200).send(response.message)
             // ! fazer uma resposta de TOKEN 
        }
        catch (error: any) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
              } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
              } else {
                res.status(500).send("Erro inesperado")
              }
        }
    }
}