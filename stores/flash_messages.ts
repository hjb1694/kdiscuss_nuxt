import { FlashMessageType } from '@/types';

export const useFlashMessageStore = defineStore('flash-message-store', () => {

    const isFlashMessageOpen = ref<boolean>(false);
    const flashMessageType = ref<FlashMessageType | null>(null);
    const flashMessageContent = ref<string>('');

    const showFlashMessage = (messageType: FlashMessageType, messageContent: string) => {
        flashMessageType.value = messageType;
        flashMessageContent.value = messageContent;
        isFlashMessageOpen.value = true;
    }   

    const hideFlashMessage = () => {
        isFlashMessageOpen.value = false;
        flashMessageType.value = null;
        flashMessageContent.value = '';
    }

    return {
        isFlashMessageOpen, 
        flashMessageType,
        flashMessageContent, 
        showFlashMessage, 
        hideFlashMessage
    }


})