export const useModalStore = defineStore('modal', () => {

    const authModalIsOpen = ref(false);

    const toggleAuthModal = (isOpen: boolean) => {
        authModalIsOpen.value = isOpen
    }

    return {
        authModalIsOpen, 
        toggleAuthModal
    }


});