import axios from 'axios'

const service = axios.create({
    baseURL: '',
    timeout: 10000,
})

service.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        return Promise.reject(err)
    },
)

service.interceptors.response.use(
    (res) => {
        return res.data
    },
    (err) => {
        return Promise.reject(err)
    },
)
