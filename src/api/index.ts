import service from '@/utils/service'
import { IUser } from '@/views/UserManage.vue'

export const auth = (user: IUser) => {
    return service.post('/auth', user)
}
export const getUsers = () => {
    return service.get('/user')
}
export const addUser = (user: IUser) => {
    return service.post('/user', user)
}
export const saveProject = (data) => {
    return service.post('/project', data)
}
export const deleteProById = (id) => {
    return service.delete('/project', {
        data: { id },
    })
}
export const getAllProject = (params) => {
    return service.get('/project', { params })
}
export const getProjectById = (id) => {
    return service.get(`/project/${id}`)
}
export const uploadSourceMap = (data) => {
    return service.post('/sourcemap', data)
}
export const getErrors = () => {
    return service.get('/error')
}
export const getErrorById = (id) => {
    return service.get(`/parse/${id}`)
}
