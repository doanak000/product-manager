const mongoose = require('mongoose')

const Category = mongoose.model('Category', {
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
})

module.exports = Category