<template>
    <router-link to="/auth">Вернуться назад</router-link>
    <form action="#" class="" @submit.prevent="onSubmit">
        <h1>Зарегестрироваться</h1>
        <div :class="['form-control', {
            invalid: emailError
        }]">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email" @blur="emailBlur"/>
            <small v-if="emailError">{{ emailError }}</small>
        </div>
        <div :class="['form-control', {
            invalid: passwordError
        }]">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" @blur="passwordBlur"/>
            <small v-if="passwordError">{{ passwordError }}</small>
        </div>
        <button class="btn primary" :disabled="isSubmitting">Зарегестрироваться</button>
    </form>
</template>

<script setup>
import * as yup from 'yup';
import {useField, useForm} from "vee-validate";
import {useAuthStore} from "@/store/auth";
import router from "@/router";
import {useAlertStore} from "@/store/alertError";

const authStore = useAuthStore()
const alert = useAlertStore()

const {handleSubmit, isSubmitting} = useForm()

const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField('email',
    yup
        .string()
        .trim()
        .required('Пожалуйста введите Email')
        .email('Введите коректный Email')
)
const {value: password, errorMessage: passwordError, handleBlur: passwordBlur} = useField('password',
    yup
        .string()
        .trim()
        .required('Пожалуйста введите пароль')
        .min(6, 'Пароль должен состоять из минимум 6 символов')
)

const onSubmit = handleSubmit(async (form) => {
    try {
        console.log(form)
        await authStore.register(form)
        email.value = ''
        password.value = ''
        router.push('/auth')
    } catch (e) {
        password.value = ''
    }
})

</script>

<style scoped>

</style>