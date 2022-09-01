<template>
    <component :is="layouts[layout]"></component>
</template>

<script setup>
import AuthLayout from '@/layout/AuthLayout'
import MainLayout from '@/layout/MainLayout'
import {useRoute} from "vue-router";
import {computed} from "vue";


const route = useRoute()

const layout = computed(() => route.meta.layout)
const layouts = {
    AuthLayout,
    MainLayout
}
</script>

<style lang="scss">

</style>
