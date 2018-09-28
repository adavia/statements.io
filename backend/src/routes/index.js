import express from 'express';
import authRoute from './auth.route';
import usersRoute from './users.route';
import statementsRoute from './statements.route';
import categoriesRoute from './categories.route';
import chatRoute from './chat.route';

import sessionHandler from '../middleware/session.handler';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/statements', sessionHandler, statementsRoute);
router.use('/categories', sessionHandler, categoriesRoute);
router.use('/chat', sessionHandler, chatRoute);

router.get('/', (req, res) => {
  res.status(200).send('Welcome to the home page');
});

export default router;