<template>
    <nav class="navbar">
        <h2>Bank</h2>
        <ul class="navbar-menu">
            <li>
                <router-link to="/">Заявки</router-link>
            </li>
            <li>
                <router-link to="/help">Мои Заявки</router-link>
            </li>
            <li>
                <a href="#" @click.prevent>Сообщения</a>
            </li>
            <a href="#" @click.prevent='logOut'>Выход</a>
        </ul>
    </nav>
</template>

<script setup>
import {useAuthStore} from "@/store/auth";
import router from "@/router";

const authStore = useAuthStore()

function logOut() {
    authStore.logOut()
    router.push('/auth')
}
</script>

<style scoped>

</style>