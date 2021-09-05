const axios = require('axios')
const baseUrl = "http://localhost:3003/api/socket"

const getAll = async () => {
    const allSockets = await axios.get(baseUrl)
    return allSockets.data
}

const createSocket = async (wallId, socket) => {
    const newSocket = await axios.post(`${baseUrl}/${wallId}`, socket)
    return newSocket.data
}

const editSocket = async (id, socket) => {
    const editedSocket = await axios.put(`${baseUrl}/${id}`, socket)
    return editedSocket.data
}

const deleteSocket = async (id, wallId) => {
    await axios.delete(`${baseUrl}/${id}/${wallId}`)
}

const deleteAll = async () => {
    await axios.delete(`${baseUrl}`)
}

export default { getAll, createSocket, editSocket, deleteSocket, deleteAll }