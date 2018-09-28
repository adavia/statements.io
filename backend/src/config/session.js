import session from 'express-session';
import config from './';
import db from '../models';
import mongoStore from 'connect-mongo';

const init = () => {
  const sessionStore = mongoStore(session);

  return session({
    name: 'qid',
    secret: config.app.sessionSecret,
    resave: false,
    saveUninitialized: process.env.NODE_ENV === 'development',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    },
    store: new sessionStore({
      mongooseConnection: db.mongoose.connection
    })
  });
}

export default init();