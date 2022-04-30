import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            uninfo: { add: 1 },
            menu: [],
            permission: {},
        }
    },
    actions: {
        login() {
            this.uinfo = {
                name: 'admin',
            }
        },
    },
    persist: true,
})
