import  express from 'express'
import cors from 'cors';
import { userRouter } from './router/UserRouter';
import { postsRouter } from './router/PostsRouter';
import { likeDeslikeRouter } from './router/LikeDeslikeRouter';

//criação do servidor express 👇🏽
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


// * Users
app.use('/user', userRouter)

// * Posts
app.use('/posts', postsRouter)
app.use('/post', postsRouter)

// * Like Deslike
app.use('/posts/like', likeDeslikeRouter) // ! Como faz isso? -- Like e deslike no post