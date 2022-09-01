<template>
    <div class="container">
        <the-alert></the-alert>
        <div class="card">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import TheAlert from "@/components/AppAlert"
</script>

<style scoped>

</style>