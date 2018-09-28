import { schema } from 'normalizr';
import reviewSchema from './review';
import categorySchema from './category';
import userSchema from './user';

const statementSchema = new schema.Entity('statements', {
  reviews: [reviewSchema],
  categories: [categorySchema],
  author: userSchema
}, { idAttribute: '_id' });

export default statementSchema;