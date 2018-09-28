import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    index: true,
    ref: 'Category'
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
