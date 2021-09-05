const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rectSchema = new Schema ({
    distance_x: {
        type: "Number",
        required: true
    },
    distance_y: {
        type: "Number",
        required: true
    },
    x: {
        type: "Number",
        required: true
    },
    y: {
        type: "Number",
        required: true
    },
    wall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wall'
    }
})

rectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Rectangle = mongoose.model('Rectangle', rectSchema)

module.exports = Rectangle

