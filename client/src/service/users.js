const axios = require('axios')
//const baseUrl = '/api/users'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createUser = async (newUser) => {
    const response = await axios.post(`${baseUrl}`, newUser)
    return response.data
}

export default  { getAll, createUser }