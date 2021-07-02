const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category:{
      type:String,
      required:true
    },
    variations:[{
      type: Schema.Types.ObjectId,
       ref: 'Product-Variation'
    }],

    reviews:[{
      type: Schema.Types.ObjectId,
       ref: 'Product-Reviews'
    }],
    creator: {
      type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    belongs:{
      type: Schema.Types.ObjectId,
        ref: 'Shop',
        required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
