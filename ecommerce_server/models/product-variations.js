const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variationSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    sub_title: [{
      type: String,
      required: true}
    ] ,     
    price: {
      type: Number,
      required: true
    },
    quantity: {
        type: Number,
        required: true
      },
    available: {
        type: Boolean,
        required: true
      },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product-Variation', variationSchema);
