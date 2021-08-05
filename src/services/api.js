import axios from "axios"

const prod = "http://localhost:8080/api/v1/"
const api = axios.create({
  baseURL: prod,
})

export default api
