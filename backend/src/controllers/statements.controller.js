import db from '../models';

const { Statement } = db.models;

class StatementsController {
  async fetchAll(req, res, next) {
    try {
      const statements = await Statement.find()
        .populate('author')
        .populate('categories');
      res.status(200).send(statements);
    }
    catch(err) { next(err) }
  }

  async getSelected(req, res, next) {
    const { id } = req.params;
    
    try {
      const statement = await Statement.findById(id)
        .populate('reviews')
        .populate('categories');
      res.status(200).send(statement);
    }
    catch(err) { next(err) }
  }

  async addNew(req, res, next) {
    const newStatement = new Statement(req.body);
    newStatement.author = req.user._id;

    try {
      const savedStatement = await newStatement.save(newStatement);
      res.status(201).send(savedStatement);
    }
    catch(err) { next(err) }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { title, description, categories } = req.body;
    try {
      const statement = await Statement.findById(id);
      statement.title = title;
      statement.description = description;
      statement.categories = categories;
      const updatedStatement = await statement.save();
      res.status(200).send(updatedStatement);
    }
    catch(err) { next(err) }
  }
}

const statementsController = new StatementsController();
export default statementsController;