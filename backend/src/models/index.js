import mongoose from 'mongoose';
import config from '../config';
import User from './users.model';
import Statement from './statements.model';
import Review from './reviews.model';
import Category from './categories.model';
import Message from './messages.model';

mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
	if (err) throw err;
});

export default { mongoose, 
	models: {
		User,
		Statement,
		Review,
		Category,
		Message
	}
};