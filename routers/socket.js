const sockets = require('express').Router()
const Socket = require('../models/socket')
const Wall = require('../models/walls')


sockets.get('/', async (req, res) => {
    const allSockets = await Socket.find({})
    res.send(allSockets)
})

sockets.post('/:wallId', async (req, res) => {
    const body = req.body
    try {
        const wall = await Wall.findById(req.params.wallId)
        const newSocket = new Socket({
            distance_x: body.x_distance,
            distance_y: body.y_distance,
            diameter: body.diameter,
            wall: wall._id
        })

        const savedSocket = await newSocket.save()
        console.log("socket", savedSocket)
        wall.sockets = wall.sockets.concat(savedSocket._id)
        await wall.save()
        res.status(200).json(savedSocket.toJSON())
    } catch (err) {
        console.log("Error: ", err)
    }

})

sockets.put('/:id', async (req, res) => {
    try {
        const body = req.body
        const newSocket = {
            distance_x: body.distance_x,
            distance_y: body.distance_y,
            diameter: body.diameter
        }
        const edited = await Socket.findByIdAndUpdate(
            req.params.id, newSocket, {new: true}
        )
        console.log("saved......... ", edited)
        res.status(200).json(edited.toJSON())
    } catch (error) {
        res.status(500).json({Error: error.message})
    }
})

sockets.delete('/:id/:wallId', async (req, res) => {
    try {
        const wall = await Wall.findById(req.params.wallId)
        console.log("wall id here in backend ", req.params.wallId)
        let pos = wall.sockets.indexOf(req.params.id)
        wall.sockets.splice(pos, 1)
        await wall.save()
        await Socket.findByIdAndDelete(req.params.id)
        res.status(204).end()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

sockets.delete('/', async (req, res) => {
    try {
        //const wall = await Wall.findById(req.params.wallId)
        //wall.sockets.splice(0, wall.sockets.length)
        //await wall.save()
        await Socket.deleteMany({})
        res.status(204).end()
    } catch (error) {
        res.status(5000).json({error: error.message})
    }
})

module.exports = sockets