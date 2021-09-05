const users = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

users.get('/', async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

users.post('/', async (req, res) => {
    try {
        const body = req.body
        const saltRounds = 10
        if(body.password === undefined || body.password === ''){
            return res.status(400).json({Error: 'Password field should not to be empty!'}).end()
        }
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        // before to install bcrypt
        // sudo apt install build-essential
        // or
        // sudo apt-get install build-essential python2.7

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()
        console.log('saveduser: ', savedUser)
        res.json(savedUser)
    }catch (exception) {
        console.log('Error: ', exception)
    }

})

module.exports = users