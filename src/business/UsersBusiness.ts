import { CreateUserInputDto } from "../dto/UserDTO/createUserdto"
import { BadRequestError } from "../errors/BadRequestError"
import { UserDatabase } from "../sql/heranças/UsersDatabase"
import { TUsersDB, TUsersView, USER_ROLES,} from "../types"

export class UsersBusiness {

    constructor(
        private usersDatabase: UserDatabase
    ) { }

    // TESTEi OK
    public getUser = async (input: any): Promise<TUsersView[]> => {

        const { email, password } = input


        const [verificationEmailExist] = await this.usersDatabase.findUserEmail(email)

        if (!verificationEmailExist) {
            throw new BadRequestError("Esse conta não existe, faça o cadastro dela!")
        }

        if (email && password) {

            //Email
            if (typeof email !== "string") {
                throw new BadRequestError("O email precisa ser uma string")
            }
            if (email !== verificationEmailExist.email) {
                throw new BadRequestError("O email está incorreto, tente novamente!")
            }

            //Password
            if (typeof password !== "string") {
                throw new BadRequestError("O password precisa ser uma string!")
            }
            if (password !== verificationEmailExist.password) {
                throw new BadRequestError("O password está incorreto, tente novamente!")
            }
        } else {
            throw new BadRequestError("É obrigatório o email e password!")
        }

        const resultUser: TUsersView = {
            id: verificationEmailExist.id,
            name: verificationEmailExist.name,
            email: verificationEmailExist.email,
            createdAt: verificationEmailExist.created_at
        }

        const result = [
            resultUser
        ]

        // console.log(result)

        return result
    }

    // TESTEi OK- porém precisa ser revisto !!!
    public postUser = async (input: CreateUserInputDto) => {

        const { newId, newName, newEmail, newPassword} = input

        const [verificationUserExist] = await this.usersDatabase.findUserId(newId)

        if (verificationUserExist) { //  regra de negocio
            throw new BadRequestError("esse id já existe.")
        }

        // ! Esse USER_ROLE é passageiro, arrumar depois isso aqui 
        const userDB: TUsersDB = {
            id: newId,
            name: newName,
            email: newEmail,
            password: newPassword,
            role: USER_ROLES.NORMAL,
            created_at: new Date().toISOString()
        }

        console.log(userDB)


        await this.usersDatabase.insertUser(userDB)

        const output = {
            message: "Criado a conta!"
        }

        return output
    }
}