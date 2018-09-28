import express from 'express';
import usersController from '../controllers/users.controller';

import sessionHandler from '../middleware/session.handler';

const router = express.Router(); 

router.get('/', sessionHandler, usersController.fetchAll);
router.post('/', usersController.addNew);

export default router;