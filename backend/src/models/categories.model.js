import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String, 
    index: true,
    unique: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }]
}, { 
  toObject: { 
    virtuals: true 
  }, 
  toJSON: { 
    virtuals: true 
  }
});

categorySchema.pre('save', function(next) {
  const category = this;
  if (!category.isModified('name')) return next();
  category.slug = category.name
    .toLowerCase()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
  next();
});

categorySchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'category'
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
