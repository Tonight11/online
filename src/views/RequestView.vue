<template>
    <app-loader v-if="listStore.load"></app-loader>
    <app-page v-else-if="item" back>
        <p><strong>Имя владельца</strong>: {{item.fio}}</p>
        <p><strong>Телефон</strong>: {{item.phone}}</p>
        <p><strong>Сумма</strong>: {{item.sum}}</p>
        <p><strong>Статус</strong>: <app-status :badge-type="item.status" /></p>

        <div class="form-control">
            <label for="status">Статус</label>
            <select id="status" v-model="newStatus">
                <option value="done">Завершен</option>
                <option value="cancel">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn danger" @click.prevent="remove">Удалить</button>
        <button class="btn" @click.prevent="update" v-if="statusHasChanged">Обновить</button>
    </app-page>
    <app-page v-else back :title="'Записи с id ' + $route.params.id + ' нет'" />


</template>

<script setup>
    import AppPage from "@/UI/AppPage"
    import AppStatus from "@/components/AppStatus"
    import AppLoader from "@/components/AppLoader";
    import {useListStore} from "@/store/requests";
    import {computed, onMounted, ref} from "vue";
    import router from "@/router";

    const props = defineProps(['id'])
    const listStore = useListStore()
    const item = ref()
    const newStatus = ref()

    onMounted(async () => {
        try {
            item.value = await listStore.getReqById(props.id)
            newStatus.value = item.value.status
        } catch (e) {
            router.push('/')
        }
    })

    const statusHasChanged = computed(() => newStatus.value !== item.value.status)

    const remove = async () => {
        await listStore.delete(props.id)
        router.push('/')

    }

    const update = async () => {
        await listStore.update({
            ...item.value,
            status: newStatus.value,
        })
        item.value.status = newStatus.value
    }

</script>

<style scoped>

</style>