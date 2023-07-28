import { Request, Response } from "express";
import { UserDatabase } from "../sql/heranças/UsersDatabase";
import { UserModels } from "../models/Users";
import { TUsersDB, TUsersView, USER_ROLES } from "../types";


export class UserControllers {

    // * Login
    public getUser = async (req: Request, res: Response) => {
        try {
            const email = req.body.email as string
            const password = req.body.password as string

            const usersDatabase = new UserDatabase()
            const [verificationEmailExist] = await usersDatabase.findUserEmail(email)

            if (!verificationEmailExist) {
                res.status(400)
                throw new Error("Esse conta não existe, faça o cadastro dela!")
            }

            if (email && password) {

                //Email
                if (typeof email !== "string") {
                    res.status(400)
                    throw new Error("O email precisa ser uma string")
                }
                if (email !== verificationEmailExist.email) {
                    res.status(400)
                    throw new Error("O email está incorreto, tente novamente!")
                }

                //Password
                if (typeof password !== "string") {
                    res.status(400)
                    throw new Error("O password precisa ser uma string!")
                }
                if (password !== verificationEmailExist.password) {
                    res.status(400)
                    throw new Error("O password está incorreto, tente novamente!")
                }
            }else{
                res.status(400)
                throw new Error("É obrigatório o email e password!")
            }

            const resultUser:TUsersView = {
                id: verificationEmailExist.id,
                name: verificationEmailExist.name,
                email: verificationEmailExist.email,
                createdAt: verificationEmailExist.created_at
            }


            res.status(200).send(resultUser)
        }
        catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }

            res.send(error.message)
        }


    }

    // * Sign Up
    public postUser = async (req: Request, res: Response) => {
        try {
            const newId = req.body.id as string
            const newName = req.body.name as string
            const newEmail = req.body.email as string
            const newPassword = req.body.password as string
            const newROLE = req.body.USER_ROLE as string

            const usersDatabase = new UserDatabase();
            const [verificationUserExist] = await usersDatabase.findUserId(newId)

            console.log(verificationUserExist)

            if(newId && newName && newEmail && newPassword && newROLE){

                // Id
                if (typeof newId !== "string") { //
                    res.statusCode = 400
                    throw new Error("O id deve ser do tipo 'string'.")
                } if (newId.length <= 4) { //
                    res.statusCode = 400
                    throw new Error("O id deve ter mais 3 caracteres, exemplo: u000.")
                }
                if (verificationUserExist.id === newId) { // 
                    res.statusCode = 400
                    throw new Error("Esse id já está cadastrado, tente outro novamente.")
                }

                // Name
                if (typeof newName !== "string") { //
                    res.statusCode = 400
                    throw new Error("O name deve ser do tipo 'string'.")
                } 
                if (newName.length <= 3) { //
                    res.statusCode = 400
                    throw new Error("O name deve ter mais 3 caracteres, exemplo: fulano.")
                }

                // Email
                if (typeof newEmail !== "string") { //
                    res.statusCode = 400
                    throw new Error("O email deve ser do tipo 'string'.")
                } 

                const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                const isValidEmail = regexEmail.test(newEmail);// 
                if (!isValidEmail) { // ! 
                    res.statusCode = 400
                    throw new Error("O email está incompleto, exemplo: 'usuario@email.com' .")
                }

                if(verificationUserExist.email === newEmail){
                    res.statusCode = 400
                    throw new Error("Esse email já existe.")
                }

                // Password
                if (typeof newPassword !== "string") { //
                    res.statusCode = 400
                    throw new Error("O password deve ser do tipo 'string'.")
                } 

                const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                const isValidPassword = regexPassword.test(newPassword)
                if (!isValidPassword) {// OK
                    res.statusCode = 400
                    throw new Error(" O password deve ter no mínimo 8 caractere, contendo pelo menos uma letra maiúscula, uma letra minúscula, um número e pelo menos um caractere especial.")
                }

                // USER_ROLE
                if (typeof newROLE !== "string") { //
                    res.statusCode = 400
                    throw new Error("O USER_ROLE deve ser do tipo 'string'.")
                } 
                // ! O que seria esse erro?
                if (newROLE !== USER_ROLES.ADMIN || newROLE !== USER_ROLES.NORMAL ) { //
                    res.statusCode = 400
                    throw new Error("O USER_ROLE deve ser NORMAL ou ADMIN.")
                } 

            }else{
                res.status(400)
                throw new Error("Para criar um novo deverá ter um id, name, email, password, USER_ROLE.")
            }

            const userDB:TUsersDB = {
                id:newId,
                name:newName,
                email: newEmail,
                password: newPassword,
                role:newROLE,
                created_at: new Date().toISOString()
            }


            // console.log(verificationEmailExist)


            res.status(200).send("ok")
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