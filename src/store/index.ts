import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            uninfo: { add: 1 },
            menu: [],
            permission: {},
            locale: 'zh_CN',
        }
    },
    actions: {
        setLocale(locale) {
            this.locale = locale
        },
        login() {
            this.uinfo = {
                name: 'admin',
            }
        },
    },
    persist: true,
})
