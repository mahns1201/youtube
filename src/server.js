import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'express-flash';

// router
import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import apiRouter from './routers/apiRouter';

// middleware
import { localMiddleware } from './middlewares';

// common
const app = express();

// middleware
const logger = morgan('dev');

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(flash());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRETE,
    resave: true,
    saveUninitialized: false, // 세션이 수정될 때만 쿠키를 넘긴다.
    // cookie: {
    //     maxAge: 20000, // (ms)
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  }),
);

app.use(localMiddleware);
app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
app.use('/uploads', express.static('uploads')); // 노출시키고 싶은 폴더를 정의한다.
app.use('/assets', express.static('assets'));
app.use('/', rootRouter);
app.use('/users', userRouter);
app.use('/videos', videoRouter);
app.use('/api', apiRouter);

export default app;
