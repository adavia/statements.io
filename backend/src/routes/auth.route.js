import express from 'express';
import authController from '../controllers/auth.controller';
import sessionHandler from '../middleware/session.handler';

const router = express.Router(); 

router.post('/login', authController.login);
router.delete('/logout', sessionHandler, authController.logout);
router.get('/me', sessionHandler, authController.authenticate);

export default router;