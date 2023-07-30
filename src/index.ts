import  express, { Request, Response} from 'express'

//import do CORS 👇🏽
import cors from 'cors';
import { UserControllers } from './controllers/UserControllers';
import { PostsControllers } from './controllers/PostsControllers';
import { LikeDeslikeControllers } from './controllers/LikeDeslikesControllers';

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

const user = new UserControllers();
const posts = new PostsControllers();
const likesDeslikes = new LikeDeslikeControllers();

// * Users
app.get('/login', user.getUser)

app.post('/signup', user.postUser)

// * Posts
app.get('/posts', posts.getPosts)

app.post('/posts', posts.postPosts)

app.put('/post/:id', posts.putPosts)

app.delete('/post/:id', posts.deletePost)

// * Like Deslike
app.put('/posts/:id/like', likesDeslikes.postLikeDeslike) // ! Como faz isso? -- Like e deslike no post