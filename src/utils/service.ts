import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store'
const service = axios.create({
    baseURL: '/nest-monitor-api',
    timeout: 10000,
})

service.interceptors.request.use(
    (config) => {
        const { uinfo } = useAppStore()
        if (uinfo?.token) {
            config.headers['access-token'] = `${uinfo.token}`
            // config.headers.token = `Bear ${uinfo.token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    },
)

service.interceptors.response.use(
    (res) => {
        const { status } = res.data
        if (![200, 201].includes(status)) {
            ElMessage.error(res.data?.error?.message ?? '请求失败')
            return Promise.reject(
                new Error(res.data?.error?.message ?? '请求失败'),
            )
        }
        return res.data
    },
    (err) => {
        return Promise.reject(err)
    },
)

export default service
