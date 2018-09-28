import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  statement: {
    type: mongoose.Schema.Types.ObjectId, 
    index: true,
    ref: 'Statement'
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
