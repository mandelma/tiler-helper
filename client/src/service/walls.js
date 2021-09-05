const axios = require('axios')
//const baseUrl = '/api/wallData'
const baseUrl = 'http://localhost:3003/api/wallData'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createData = async (data) => {
    const created = await axios.post(baseUrl, data)
    return created.data
}

const editData = async (id, newData) => {
    const editedData = await axios.put(`${baseUrl}/${id}`, newData)
    return editedData.data
}

const deleteAllData = async () => {
    const deletedData = await axios.delete(baseUrl)
    return deletedData.data
}

export default { getAll, createData, editData, deleteAllData }