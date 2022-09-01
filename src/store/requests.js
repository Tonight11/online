import {defineStore} from 'pinia'
import {useAlertStore} from "@/store/alertError";
import {useAuthStore} from "@/store/auth";
import axios from "@/axios/request";


const url = process.env.VUE_APP_LISTS


export const useListStore = defineStore('request', {
    state: () => ({
        requests: [],
        authorList: [],
        loader: false
    }),
    getters: {
        list: state => state.requests,
        authorPost: state => state.authorList,
        load: state => state.loader
    },
    actions: {

        setReq(payload) {
            this.requests = payload
        },
        addReq(payload) {
            this.requests.push(payload)
            this.authorList.push(payload)
        },
        addOwnReq(payload) {
            this.authorList = payload
        },
        createReq: async function (list) {
            const authorId = JSON.parse(localStorage.getItem('author-id'))
            const alert = useAlertStore()
            const authToken = useAuthStore()
            try {
                const {data} = await axios.post('/api/post', {
                    ...list,
                    author_id: authorId
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken.token}`,
                    }
                })

                this.addReq({
                    _id: data._id,
                    ...list,
                    author_id: authorId
                })
                alert.setMsg({
                    value: 'Запись успешно создана',
                    type: 'primary'
                })
            } catch (e) {
                console.log(e)
                alert.setMsg({
                    value: e.response.data.message,
                    type: 'danger'
                })
            }
        },
        async getReq() {
            const authToken = useAuthStore()
            try {
                this.loader = true
                const { data } = await axios.get('/api/post', {
                    headers: {
                        'Authorization': `Bearer ${authToken.token}`
                    }
                })

                const items = Object.keys(data).map((e) => data[e]);
                this.setReq(items)
                this.loader = false
            } catch (e) {
                this.loader = false
                console.log(e)
            }
        },
        async getAuthorReq() {
            const authorId = JSON.parse(localStorage.getItem('author-id'))
            const authToken = useAuthStore()
            try {
                this.loader = true
                const response = await axios.get(`/api/post/author/${authorId}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken.token}`
                    }
                })

                this.addOwnReq(response.data)
                this.loader = false
            } catch (e) {
                this.loader = false
                console.log(e)
            }
        },
        async getReqById(id) {
            const authToken = useAuthStore()
            const alert = useAlertStore()
            const authorId = JSON.parse(localStorage.getItem('author-id'))
            try {
                this.loader = true
                const {data} = await axios.get(`/api/post/${id}?authorId=${authorId}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken.token}`
                    }
                })

                this.loader = false
                return data
            } catch (e) {
                this.loader = false
                alert.setMsg({
                    value: e.response.data.message,
                    type: 'warning'
                })
            }
        },
        async delete(id) {
            const authToken = useAuthStore()
            const alert = useAlertStore()
            try {
                this.loader = true
                const { data } = await axios.delete(`/api/post/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken.token}`
                    }
                })
                this.loader = false
                alert.setMsg({
                    value: 'Запись успешно удалена',
                    type: 'primary'
                })
            } catch (e) {
                this.loader = false
                alert.setMsg({
                    value: e.response.data.message,
                    type: 'danger'
                })
            }
        },
        async update(changeItem) {
            const authorId = JSON.parse(localStorage.getItem('author-id'))
            const alert = useAlertStore()
            const authToken = useAuthStore()
            try {
                const {data} = await axios.put('/api/post/', changeItem, {
                    headers: {
                        'Authorization': `Bearer ${authToken.token}`
                    }
                })
                alert.setMsg({
                    value: 'Запись успешно обновлена',
                    type: 'primary'
                })
            } catch (e) {
                alert.setMsg({
                    value: e.response.data.message,
                    type: 'danger'
                })
            }
        }
    }
})