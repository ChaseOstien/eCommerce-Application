const mongoose = require('mongoose');

const { Schema } = mongoose;
const Review = require('./Review');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    }]
},
{
    toJSON: {
        virtuals: true,
    }
});

productSchema.virtual('reviewCount').get(function () {
    return this.reviews.length;
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;