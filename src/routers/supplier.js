const express = require('express')
const Supplier = require('../models/supplier')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/supplier', async (req, res) => {
    const supplier = new Supplier(req.body)
    try {
        await supplier.save()
        res.status(201).send(supplier)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/suppliers', async (req, res) => {
    try {
        const suplliers= await Supplier.find({}).populate('products')
        res.send(suplliers)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/supplier/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const supplier = await Supplier.findOne({ _id })

        if (!supplier) {
            return res.status(404).send()
        }

        res.send(supplier)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/supplier/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'product']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const supplier = await Supplier.findOne({ _id: req.params.id, owner: req.user._id})

        if (!supplier) {
            return res.status(404).send()
        }

        updates.forEach((update) => supplier[update] = req.body[update])
        await supplier.save()
        res.send(supplier)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/supplier/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findOneAndDelete({ _id: req.params.id })

        if (!supplier) {
            res.status(404).send()
        }

        res.send(supplier)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router