import axios from 'axios'

const token = localStorage.getItem('token')
const headers = { Authorization: 'Bearer ' + token }

const api = axios.create({
  baseURL: 'https://frequencimetro-api.herokuapp.com',
  headers
})
export default api
