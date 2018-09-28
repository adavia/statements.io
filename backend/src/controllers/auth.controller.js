import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import db from '../models';

const { User } = db.models;

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id, (err, user) => next(err, user));
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, next) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !user.validPassword(password)) {
      return next(null, false, { error: 'Credentials are not correct!' });
    }
    next(null, user);
  }
  catch(err) { next(err) }
}));

class AuthController {
  login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { 
        return res.status(401).send(info)
      }
      req.login(user, (err) => {
        if (err) { return next(err); } 
        res.status(200).send(user);
      });
    })(req, res, next);
  }

  authenticate(req, res, next) {
    res.status(200).send(req.user);
  }

  logout(req, res, next) {
    req.logout();
    req.session = null;
    res.status(200).send();
  }
}

const authController = new AuthController();
export default authController;