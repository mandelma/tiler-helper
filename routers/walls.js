const walls = require('express').Router()
const Wall = require('../models/walls')


walls.get('/', async (req, res) => {
    const wallData = await Wall.find({}).populate('sockets')
    res.send(wallData)
})

walls.post('/', async (req, res) => {
    const body = req.body

    try{
        const wallData = new Wall({
            wallx: body.wallx,
            wally: body.wally,
            tilex: body.tilex,
            tiley: body.tiley,
            gap: body.gap
        })

        const newData = await wallData.save()
        res.status(200).json(newData.toJSON())
    } catch (err) {
        console.log('Error: ', err)
    }
})

walls.put('/:id', async (req, res) => {
    const body = req.body
    try {
        const currentData = await Wall.findById(req.params.id)

        //const setData = {...currentData, tilex: body.tilex}
        const newWallData = {
            wallx: body.wallx,
            wally: body.wally,
            tilex: body.tilex,
            tiley: body.tiley,
            gap: body.gap
        }

        const edited = await Wall.findByIdAndUpdate(
            req.params.id, newWallData, {new: true}
        )
        //console.log("current data: ", currentData)
        //console.log("set data: ", setData)
        console.log("edited data: ", edited)
        res.status(200).json(edited.toJSON())
    } catch (err) {
        console.log("Error: ", err)
    }
})

walls.delete('/', async (req, res) => {
    try {
        await Wall.deleteMany({})

        res.status(204).end()
    } catch (error) {
        console.log('Error: ', error)
    }
})

module.exports = walls