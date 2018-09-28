import { schema } from 'normalizr';
import userSchema from './user';

const categorySchema = new schema.Entity('categories', {
  users: [userSchema],
}, { idAttribute: '_id' });

export default categorySchema;