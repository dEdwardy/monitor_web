import { defineStore } from 'pinia'
import { auth } from '@/api'
import { ElMessage } from 'element-plus'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            uinfo: null,
            // menu: [],
            // permission: {},
            locale: 'zh_CN',
        }
    },
    actions: {
        setLocale(locale) {
            this.locale = locale
        },
        login(user) {
            return auth(user).then(({ data }) => {
                this.uinfo = data
                ElMessage.success('登录成功')
            })
        },
    },
    persist: true,
})
