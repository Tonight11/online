import {ref} from "vue";

export function useModalForm() {
    let modal = ref(false)

    const showModal = () => {
        modal.value = true
    }

    return {
        showModal, modal
    }
}