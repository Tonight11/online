<template>
    <span :class="['badge', type]">{{text}}</span>
</template>

<script setup>
// imports
import {computed, defineProps} from "vue";

const props = defineProps({
    badgeType: {
        type: String,
        required: true
    }
})

const type = computed(() => props.badgeType === 'active' ? 'primary' : 'danger')

const textForm = {
    'active': 'Активен',
    'cancel': 'Отменен',
    'pending': 'В процессе',
    'done': 'Завершен'
}

const text = computed(() => textForm[props.badgeType] || null)



</script>

<style>

</style>