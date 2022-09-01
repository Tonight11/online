<template>
    <app-page title="Ваш список заявок">
        <template #header>
            <button class="btn primary" @click="popup.showModal">Создать</button>
        </template>

        <request-table :list="lists" canEdit></request-table>
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
import {useModalForm} from "@/use/useModal";
import {useListStore} from "@/store/requests";
import {computed, onMounted} from "vue";

onMounted(async () => {
    await listStore.getAuthorReq()
})

const popup = useModalForm()
const listStore = useListStore()

const lists = computed(() => listStore.authorPost)






</script>

<style scoped>

</style>