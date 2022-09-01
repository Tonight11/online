import {defineStore} from 'pinia'
import {useAlertStore} from "@/store/alertError";
import axios from "@/axios/request";

const TOKEN = 'jwt-token'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        auth: localStorage.getItem(TOKEN) || null
    }),
    getters: {
        token: state => state.auth,
        isAuth(state) {
            return !!this.token
        }
    },
    actions: {
        setToken(token) {
            this.auth = token
            localStorage.setItem(TOKEN, token)
        },
        logOut() {
            this.auth = null
            localStorage.removeItem(TOKEN)
            localStorage.removeItem('userRole')
            localStorage.removeItem('visited')
            localStorage.removeItem('author-id')

        },
        async logIn(payload) {
            try {
                const {data} = await axios.post('/auth/login', payload)
                localStorage.setItem( 'userRole', JSON.stringify(data.roles));
                localStorage.setItem( 'author-id', JSON.stringify(data.id));

                console.log(data)
                this.setToken(data.token)
            } catch (e) {
                const alert = useAlertStore()
                alert.clearMsg()
                alert.setMsg({
                    value: e.response.data.message,
                    type: 'danger'
                })
                throw new Error()
            }
        },
        async register(payload) {
            const alert = useAlertStore()
            try {
                const {data} = await axios.post('/auth/register', payload)

                alert.clearMsg()
                alert.setMsg({
                    value: data,
                    type: 'primary'
                })
            } catch (e) {
                alert.clearMsg()
                alert.setMsg({
                    value: e.response.data.message,
                    type: 'danger'
                })
                throw new Error()
            }
        }
    },
})
