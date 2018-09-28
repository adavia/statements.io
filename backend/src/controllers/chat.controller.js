import db from '../models';

const { Category } = db.models;

class ChatController {
  async getSelected(req, res, next) {
    const { id } = req.params;

    try {
      const category = await Category.findById(id);
      res.status(200).send(category);
    }
    catch(err) { next(err) }
  }
}

const chatController = new ChatController();
export default chatController;