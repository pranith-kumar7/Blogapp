import axios from 'axios'
import API_BASE_URL from './api'

//get token from session storage
let token=sessionStorage.getItem('token')

export const axiosWithToken=axios.create({
    baseURL: API_BASE_URL,
    headers:{Authorization:`Bearer ${token}`}
})
