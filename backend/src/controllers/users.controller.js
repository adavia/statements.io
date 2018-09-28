import db from '../models';

const { User } = db.models;

class UsersController {
  async fetchAll(req, res, next) {
    try {
      const users = await User.find();
      res.status(200).send(users);
    }
    catch(err) { next(err) }
  }

  async addNew(req, res, next) {
    console.log(req.body)
    const newUser = new User(req.body);

    try {
      const savedUser = await newUser.save(newUser);
      res.status(201).send(savedUser);
    }
    catch(err) { next(err) }
  }
}

const usersController = new UsersController();
export default usersController;