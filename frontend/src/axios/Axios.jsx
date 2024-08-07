import axios from 'axios'

const BASE_URL = (window.location.hostname === 'localhost')
        ? 'http://localhost:8000/backend/api'
        : 'https://panelista.propulsion-learn.ch/backend/api'

export const AxiosMotion = axios.create({
  baseURL: BASE_URL,
})
