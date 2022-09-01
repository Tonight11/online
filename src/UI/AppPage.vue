<template>
    <router-link class="text-white" to="/" v-if="back">Вернуться на главную</router-link>
    <div class="card">
        <h1 class="card-title">
            {{title}}
            <slot name="header"></slot>
        </h1>
        <slot></slot>
    </div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({'title': String, 'back': Boolean})
</script>

<style scoped>

</style>