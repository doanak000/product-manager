const mongoose = require('mongoose')

const Supplier = mongoose.model('Supplier', {
    name:{
        type: String,
        required: true,
        trim: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

module.exports = Supplier