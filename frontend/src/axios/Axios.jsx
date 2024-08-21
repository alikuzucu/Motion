import axios from 'axios'

const BASE_URL = 'http://localhost:8000/backend/api'


export const AxiosMotion = axios.create({
    baseURL: BASE_URL,
})