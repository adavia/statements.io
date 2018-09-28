import { schema } from 'normalizr';

const userSchema = new schema.Entity('users', {
  
}, { idAttribute: '_id' });

export default userSchema;