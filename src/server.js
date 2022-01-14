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
const App = express();

// middleware
const logger = morgan('dev');

App.set('view engine', 'pug');
App.set('views', process.cwd() + '/src/views');

App.use(flash());
App.use(logger);
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

App.use(
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

App.use(localMiddleware);
app.use((req, res, next) => {
  res.header('Cross-Origin-Embedder-Policy', 'credentialless');
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  res.header(
    'Access-Control-Allow-Origin',
    'https://mahns-youtube.herokuapp.com',
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
App.use('/uploads', express.static('uploads')); // 노출시키고 싶은 폴더를 정의한다.
App.use('/assets', express.static('assets'));
App.use('/', rootRouter);
App.use('/users', userRouter);
App.use('/videos', videoRouter);
App.use('/api', apiRouter);

export default App;
