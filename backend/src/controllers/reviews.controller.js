import db from '../models';

const { Review } = db.models;

class ReviewsController {
  async addNew(req, res, next) {
    const { _id, username } = req.user;
    const { id } = req.params;
    const review = { ...req.body, ...{ userId: _id, username, statement: id }};
    
    const newReview = new Review(review);
  
    try {
      const savedReview = await newReview.save(newReview);
      res.status(201).send(savedReview);
    }
    catch(err) { next(err) }
  }
}

const reviewsController = new ReviewsController();
export default reviewsController;