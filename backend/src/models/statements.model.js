import mongoose from 'mongoose';

const statementSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  }]
}, { 
  toObject: { 
    virtuals: true 
  }, 
  toJSON: { 
    virtuals: true 
  }
});

statementSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'statement'
});

const Statement = mongoose.model('Statement', statementSchema);

export default Statement;
