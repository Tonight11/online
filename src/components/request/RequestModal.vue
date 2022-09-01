<template>
    <form action="#" @submit.prevent="create.onSubmit">
        <div :class="['form-control', {
            invalid: create.fError.value
        }]">
            <label for="fio">ФИО</label>
            <input type="text" id="fio" v-model="create.fio.value" @blur="create.fBlur">
            <small v-if="create.fError.value">{{ create.fError.value }}</small>
        </div>
        <div class="form-control">
            <label for="phone">Телефон</label>
            <MazPhoneNumberInput
                id="phone"
                v-model="create.phone.value"
                show-code-on-list
                color="info"
                default-country-code="RU"
                :only-countries="['RU', 'US', 'KG']"
                @update="results = $event"
                :success="results?.isValid"
            />
            <small v-if="create.pError.value">{{ create.pError.value }}</small>
        </div>
        <div :class="['form-control', {
            invalid: create.sError.value
        }]">
            <label for="sum">Сумма</label>
            <input type="number" id="sum" v-model="create.sum.value" @blur="create.sBlur">
            <small v-if="create.sError.value">{{ create.sError.value }}</small>
        </div>
        <div class="form-control">
            <label for="select">Статус</label>
            <select id="select" v-model="create.status.value">
                <option value="done">Завершен</option>
                <option value="cancel">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">В процессе</option>
            </select>
        </div>
        <button class="btn" :disabled="!create.isSubmitting || !disableBtn">Добавить</button>
    </form>
</template>

<script setup>
import {useCreateForm} from "@/use/useCreate";
import {useListStore} from "@/store/requests";
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import {ref, watch} from "vue";

const emit = defineEmits(['close'])
const results = ref()
const disableBtn = ref(true)
watch((results), (newV, oldV) => {
    disableBtn.value = false
    if (oldV !== undefined) {
        if (newV.countryCode !== oldV.countryCode) {
            disableBtn.value = false
        }
    }
    if (results.value.isValid === true) {
        disableBtn.value = true
    }
})
const listStore = useListStore()

const submit = async (e) => {
    await listStore.createReq(e)
    emit('close')
}

const create = useCreateForm(submit)

</script>

<style scoped>

</style>