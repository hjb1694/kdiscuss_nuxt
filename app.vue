<template>
  <div>
    <FlashNotif v-if="isFlashMessageOpen" :message-type="flashMessageType" :message="flashMessageContent" @flashhide="onFlashMessageHide" />
    <NuxtLayout>
      hi
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>

    import { computed } from 'vue';
    import { useFlashMessageStore } from '@/stores/flash_messages';

    const flashMessageStore = useFlashMessageStore();

    const isFlashMessageOpen = computed(() => flashMessageStore.isFlashMessageOpen);
    const flashMessageType = computed(() => flashMessageStore.flashMessageType);
    const flashMessageContent = computed(() => flashMessageStore.flashMessageContent);

    const onFlashMessageHide = () => {
      console.log('hide flash');
      flashMessageStore.hideFlashMessage();
    }

</script>
