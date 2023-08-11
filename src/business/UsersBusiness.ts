import { CreateUserInputDto, CreateUserOutInputDto } from "../dto/UserDTO/createUserdto"
import { LoginUserInputDTO, LoginUserOutinputDTO } from "../dto/UserDTO/loginUserdto"
import { BadRequestError } from "../errors/BadRequestError"
import { UserModels } from "../models/Users"
import { HashManager } from "../services/HashManager"
import { TokenManager, TokenPayload } from "../services/TokenManager"
import { IdGenerator } from "../services/idGenerator"
import { UserDatabase } from "../sql/heranças/UsersDatabase"
import { TUsersDB, TUsersView, USER_ROLES,} from "../types"

export class UsersBusiness {

    constructor(
        private usersDatabase: UserDatabase,
        private idGenerator : IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }


    public getUser = async (input: LoginUserInputDTO): Promise<LoginUserOutinputDTO> => {

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

            const hashedPassword = verificationEmailExist.password
            const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
            if(!isPasswordCorrect){
                throw new BadRequestError("'email' ou 'password' incorretos")
            }

        } else {
            throw new BadRequestError("É obrigatório o email e password!")
        }

        const resultUser = new UserModels( 
            verificationEmailExist.id,
            verificationEmailExist.name,
            verificationEmailExist.email,
            verificationEmailExist.password,
            verificationEmailExist.role,
            verificationEmailExist.created_at
        )

        const payload: TokenPayload = {
            id: resultUser.getId(),
            name: resultUser.getName(),
            role: resultUser.getROLE() as USER_ROLES
        }

        const token = this.tokenManager.createToken(payload)

        const output = {
            token: token
        }

        return output
    }


    public postUser = async (input: CreateUserInputDto): Promise<CreateUserOutInputDto> => {

        const { newName, newEmail, newPassword} = input

        const [verificationUserExist] = await this.usersDatabase.findUserEmail(newEmail) // Ok está pegando

        if (verificationUserExist) { //  regra de negocio
            throw new BadRequestError("esse email já existe.")
        }

        const newId = this.idGenerator.generate()

        const hashedPassword = await this.hashManager.hash(newPassword)

        const userDB: TUsersDB = {
            id: newId,
            name: newName,
            email: newEmail,
            password: hashedPassword,
            role: USER_ROLES.NORMAL,
            created_at: new Date().toISOString()
        }

        await this.usersDatabase.insertUser(userDB)

        const tokenPayload: TokenPayload = {
            id: userDB.id,
            name: userDB.name,
            role: userDB.role
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output = {
            message: "Criado a conta!",
            token: token
        }

        return output
    }
}