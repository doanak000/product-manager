const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
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
    number: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Number must be interger')
            }
        }
    },
    suppliers: [{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Supplier'
    }],
    category:[{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
    }]
})

module.exports = Product