<template>
    <div class="flash-notif" :style="{backgroundColor: bgColor}">
        <span>{{  message }}</span>
    </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted, computed } from 'vue';
import { FlashMessageType } from '@/types';

const props = defineProps({
    message: {
        type: String as PropType<string>, 
        required: true
    }, 
    messageType: {
        type: String as PropType<FlashMessageType | null>, 
        required: true
    }
});

const emit = defineEmits(['onhide']);

const bgColor = computed(() => {
    if(props.messageType === FlashMessageType.SUCCESS){
        return 'green';
    }else if(props.messageType === FlashMessageType.ERROR){
        return 'red';
    }
});

onMounted(() => {
    setTimeout(() => {
        emit('onhide');
    }, 4000);
});


</script>

<style lang="scss" scoped>

    .flash-notif {
        position:fixed;
        left:0;
        top:0;
        width:100%;
        padding:2rem;
        display:flex;
        justify-content: center;
        align-items: center;
        color: $white;
        z-index:1000;
    }

</style>