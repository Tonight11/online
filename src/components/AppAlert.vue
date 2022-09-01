<template>
    <div :class="['alert', error.type]" v-if="error">
        <h2 class="alert-title">{{status[error.type]}}</h2>
        <p>{{error.value}}</p>
        <span class="alert-close" @click="alert.clearMsg">&times;</span>
    </div>
</template>

<script setup>
import {useAlertStore} from "@/store/alertError";
import {computed, watch} from "vue";
import {useRoute} from "vue-router";

const alert = useAlertStore()
const route = useRoute()

const status = {
    'primary': "Успешно!",
    'danger': "Ошибка",
    'warning': "Предупреждение",
}
if (route.query.errMsg) {
    alert.setMsg({
        value: 'Пожалуйста авторизуйтесь',
        type: 'warning'
    })
}

const error = computed(() => alert.msg)

</script>

<style scoped>

</style>