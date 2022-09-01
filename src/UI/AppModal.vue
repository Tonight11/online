<template>
    <div class="modal-backdrop" @click="closeModal"></div>
    <div class="modal">
        <h2 class="card-title">
            {{title}}
            <span class="sidebar-close" @click="closeModal">&times;</span>
        </h2>
        <slot></slot>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps(['title'])
const emit = defineEmits(['close-modal'])

function closeModal() {
    emit('close-modal')
}

</script>

<style scoped>

</style>