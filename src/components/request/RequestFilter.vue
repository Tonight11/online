<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Начните писать имя" v-model="name">
        </div>
        <div class="form-control">
            <select v-model="status">
                <option disabled selected>Выберите статус</option>
                <option value="done">Завершен</option>
                <option value="cancelled">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>
        <button class="btn warning" v-if="isActive" @click="reset">Очистить</button>
    </div>
</template>

<script setup>
import {watch, ref, computed} from "vue";


const emit = defineEmits(['filter', 'update:modelValue'])
const props = defineProps(['modelValue'])
const name = ref()
const status = ref()
const isActive = computed(() => name.value || status.value)


watch([name, status], value => {
    emit('update:modelValue', {
        name: value[0],
        status: value[1]
    })
})

const reset = () => {
    name.value = ''
    status.value = ''
}

</script>

<style scoped>

</style>