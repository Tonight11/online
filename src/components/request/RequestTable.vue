<template>
    <app-loader v-if="listStore.load"></app-loader>
    <div class="text-center" v-else-if="!list.length">Заявок пока нет</div>
    <table v-else class="table">
        <thead>
        <tr>
            <td>#</td>
            <td>ФИО</td>
            <td>ТЕЛЕФОНЫ</td>
            <td>СУММА</td>
            <td>СТАТУС</td>
            <td v-if="isAdmin || canEdit">ДЕЙСТВИЕ</td>
        </tr>
        </thead>
        <tbody>
        <TransitionGroup name="list">
            <tr v-for="(r, idx) in list" :key="r._id">
                <td>{{ idx + 1 }}</td>
                <td>{{ r.fio }}</td>
                <td>{{ r.phone }}</td>
                <td>{{ r.sum }}</td>
                <td>
                    <app-status :badge-type="r.status"></app-status>
                </td>
                <td v-if="isAdmin || canEdit">
                    <router-link custom v-slot="{navigate}" :to="{name: 'request', params: {id: r._id}}">
                        <button class="btn" @click="navigate">Open</button>
                    </router-link>
                </td>
            </tr>
        </TransitionGroup>
        </tbody>
    </table>
</template>

<script setup>
import AppStatus from "@/components/AppStatus"
import AppLoader from "@/components/AppLoader";
import {computed} from "vue";
import {useListStore} from "@/store/requests";

const listStore = useListStore()

const props = defineProps({
    'list': Array,
    'canEdit': Boolean
})

const isAdmin = JSON.parse(localStorage.getItem('userRole')).includes('admin')


</script>

<style scoped>
tr {
    text-align: center;
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>