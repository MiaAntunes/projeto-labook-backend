import express from 'express'
import { UserControllers } from '../controllers/UserControllers'
import { UsersBusiness } from '../business/UsersBusiness'
import { UserDatabase } from '../sql/heranças/UsersDatabase'
import { IdGenerator } from '../services/idGenerator'
import { TokenManager } from '../services/TokenManager'
import { HashManager } from '../services/HashManager'

export const userRouter = express.Router()

const userControllers = new UserControllers(
    new UsersBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.get('/login', userControllers.getUser)

userRouter.post('/signup', userControllers.postUser)