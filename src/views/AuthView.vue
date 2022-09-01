<template>

    <form action="#" class="" @submit.prevent="onSubmit">
        <h1>Войти</h1>
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
        <button class="btn primary" :disabled="isSubmitting">Войти</button>
    </form>
    <br>
    <div class="no-acc">Еще нет аккаунта? <router-link :to="{name: 'register'}">Зарегестрироваться</router-link></div>
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
        await authStore.logIn(form)
        email.value = ''
        password.value = ''
        router.push('/')
        localStorage.setItem('visited', true)
        alert.clearMsg()
    } catch (e) {
        password.value = ''
    }
})

</script>

<style scoped>

</style>