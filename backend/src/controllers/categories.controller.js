import db from '../models';

const { Category } = db.models;

class CategoriesController {
  async fetchAll(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(200).send(categories);
    }
    catch(err) { next(err) }
  }
}

const categoriesController = new CategoriesController();
export default categoriesController;