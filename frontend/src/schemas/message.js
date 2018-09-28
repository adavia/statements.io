import { schema } from 'normalizr';

const messageSchema = new schema.Entity('messages', {
}, { idAttribute: '_id' });

export default messageSchema;