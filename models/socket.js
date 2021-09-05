const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const socketSchema = new Schema({
    distance_x: {
        type: Number,
        required: true
    },
    distance_y: {
        type: Number,
        reguired: true
    },
    diameter: {
        type: Number,
        required: true
    },
    wall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wall'
    }
})

socketSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Socket = mongoose.model('Socket', socketSchema)
module.exports = Socket