import { schema } from 'normalizr';

const reviewSchema = new schema.Entity('reviews', {
  
}, { idAttribute: '_id' });

export default reviewSchema;