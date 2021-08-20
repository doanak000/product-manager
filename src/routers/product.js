const express = require('express')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = new express.Router()
//Create
router.post('/product', async (req, res) => {
    const product = new Product(req.body)

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})
//read
router.get('/products', async (req, res) => {
    try {
        products=await Product.find({}).populate('suppliers')
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/product/:id', async (req, res) => {
    const _id = req.params.id

    try {
        
        const product = await Product.findOne({ _id }).populate('suppliers')

        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})
//update
router.patch('/product/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'name','number','suppliers']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const product = await Product.findOne({ _id: req.params.id})

        if (!product) {
            return res.status(404).send()
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})
//delete
router.delete('/product/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id})

        if (!product) {
            res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router