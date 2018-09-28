import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';

import config from './config';
import io from './channels';
import logger from './config/logger';
import routes from './routes';
import session from './config/session';
import errorHandler from './middleware/error.handler';

const app = express();
const ioServer = io(app);

app.use(morgan('combined'));

app.use(cors({
  credentials: true,
  origin: config.app.clientURL
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use(errorHandler);

ioServer.listen(process.env.PORT || 3001, () => console.log('Listening to port 3001'));
