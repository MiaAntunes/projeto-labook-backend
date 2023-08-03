import express from 'express'
import { UserControllers } from '../controllers/UserControllers'
import { UsersBusiness } from '../business/UsersBusiness'
import { UserDatabase } from '../sql/heranças/UsersDatabase'

export const userRouter = express.Router()

const userControllers = new UserControllers(
    new UsersBusiness(
        new UserDatabase()
    )
)

userRouter.get('/login', userControllers.getUser)

userRouter.post('/signup', userControllers.postUser)