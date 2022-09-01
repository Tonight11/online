<template>
    <app-page title="Список заявок">
        <template #header>
            <button class="btn primary" @click="popup.showModal">Создать</button>
        </template>
        <request-filter v-model="filter"></request-filter>

        <request-table :list="lists"></request-table>

    </app-page>

    <teleport to="body">
        <app-modal v-if="popup.modal.value" title="Создать заявку" @closeModal="popup.modal.value = false">
            <request-modal @close="popup.modal.value = false"></request-modal>
        </app-modal>
    </teleport>
</template>

<script setup>
import AppPage from "@/UI/AppPage";
import AppModal from "@/UI/AppModal"
import RequestTable from "@/components/request/RequestTable";
import RequestModal from "@/components/request/RequestModal";
import RequestFilter from "@/components/request/RequestFilter"
import {useListStore} from "@/store/requests";
import {computed, onMounted, ref, watch} from "vue";
import {useModalForm} from "@/use/useModal";

const listStore = useListStore()


onMounted(async () => {
    await listStore.getReq()
})


const filter = ref({})
const popup = useModalForm()

const lists = computed(() => listStore.list
    .filter(list => {
        if (filter.value.name) {
            return list.fio.toLowerCase().includes(filter.value.name.toLowerCase())
        }
        return list
    })
    .filter(list => {
        if (filter.value.status) {
            return list.status === filter.value.status
        }
        return list
    })
)

</script>

<style scoped>

</style>