import axios from 'axios'

const BASE_URL = 'https://motion.propulsion-home.ch/backend/api' //our base url for axios api

export const AxiosMotion = axios.create({
  baseURL: BASE_URL,
})
