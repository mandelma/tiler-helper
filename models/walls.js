const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wallSchema = new Schema({
    wallx: {
        type: Number,
        unique: true,
        required: true
    },
    wally: {
        type: Number,
        unique: true,
        required: true
    },
    tilex: {
        type: Number,
        unique: true,
        required: true
    },
    tiley: {
        type: Number,
        unique: true,
        required: true
    },
    gap: {
        type: Number,
        unique: true,
        required: true
    },
    sockets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Socket'
        }
    ]
})

wallSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Wall = mongoose.model('Wall', wallSchema)
module.exports = Wall