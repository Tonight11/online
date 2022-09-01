import {defineStore} from 'pinia'


export const useAlertStore = defineStore('alertErr', {
    state: () => ({
        err: null
    }),
    getters: {
        msg: state => state.err
    },
    actions: {
        async setMsg(payload) {
            this.err = payload
            setTimeout(() => {
                this.clearMsg()
            }, 10000)
        },
        clearMsg() {
            this.err = null
        },
    },
})
