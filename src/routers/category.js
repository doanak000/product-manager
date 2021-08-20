const express = require('express')
const Category = require('../models/category')
const auth = require('../middleware/auth')
const router = new express.Router()
//Create
router.post('/category', async (req, res) => {
    const category = new Category(req.body)

    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})
//read
router.get('/category', async (req, res) => {
    try {
        products=await Category.find({}).populate('products')
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/category/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const category = await Category.findOne({ _id }).populate('products')

        if (!category) {
            return res.status(404).send()
        }

        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
})
//update
router.patch('/category/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'name','products']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const category = await Category.findOne({ _id: req.params.id})

        if (!category) {
            return res.status(404).send()
        }

        updates.forEach((update) => category[update] = req.body[update])
        await category.save()
        res.send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})
//delete
router.delete('/category/:id', async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({ _id: req.params.id})

        if (!category) {
            res.status(404).send()
        }

        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router