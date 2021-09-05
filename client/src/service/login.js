const axios = require('axios')
const baseUrl = '/api/login'
//const baseUrl = 'http://localhost:3003/api/login'

const login = async loginData => {
    const response = await axios.post(baseUrl, loginData)
    return response.data
}

export default { login }