const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toDateString()
    },
    updateAt: {
        type: Date,
        default: Date.now,
        get: (date) => date.toDateString()
    },
},
    {
        toJSON: {
            getters: true,
        }
    });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;