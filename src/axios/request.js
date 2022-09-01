import axios from 'axios'
import router from "@/router";
import { useAuthStore } from "@/store/auth";

const requestAxios = axios.create({
    baseURL: 'https://basic-server123.herokuapp.com'
})

requestAxios.interceptors.response.use(null, error => {
    const authStore = useAuthStore()
    if (error.response.status === 401) {
        authStore.logOut()
        router.push('/auth?errMsg=auth')
    }

    return Promise.reject(error)
})

export default requestAxios