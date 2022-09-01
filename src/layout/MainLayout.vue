<template>
    <the-navbar></the-navbar>
    <div class="container with-nav">
        <the-alert></the-alert>
        <router-view></router-view>
    </div>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar";
import TheAlert from "@/components/AppAlert"
</script>

<style scoped>

</style>