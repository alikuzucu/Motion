import axios from 'axios'

const Base_Url = 'https://motion.propulsion-home.ch/backend/api/'

export const AxiosMotion = axios.create({
    baseUrl:Base_Url
})