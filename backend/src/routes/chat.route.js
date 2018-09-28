import express from 'express';
import chatController from '../controllers/chat.controller';

const router = express.Router(); 

router.get('/:id', chatController.getSelected);

export default router;