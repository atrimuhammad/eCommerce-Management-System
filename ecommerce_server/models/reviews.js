const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min:1,
      max:5,
      required: true
    },
    review: {
        type: String,
        required: true
      },     
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product-Reviews', reviewSchema);
