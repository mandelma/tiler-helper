const rectangles = require('express').Router()
const Rectangle = require('../models/rectangle')


rectangles.get('/', async (req, res) => {
    const allRectangles = await Rectangle.find({})
    res.send(allRectangles)
})

rectangles.post('/', async (req, res) => {
    try {
        const body = req.body
        const newRect = new Rectangle({
            distance_x: body.distance_x,
            distance_y: body.distance_y,
            x: body.x,
            y: body.y
        })
        console.log("Saved rectangle ", newRect)
        const savedRect = await newRect.save()
        res.status(200).json(savedRect.toJSON())
    } catch (error) {
        res.status(500).json({Error: error.message})
    }
})

module.exports = rectangles