import express from 'express';
import statementsController from '../controllers/statements.controller';
import reviewsController from '../controllers/reviews.controller';

const router = express.Router(); 

router.get('/', statementsController.fetchAll);
router.get('/:id', statementsController.getSelected);
router.post('/', statementsController.addNew);
router.put('/:id', statementsController.update);
router.post('/:id/reviews', reviewsController.addNew);

export default router;