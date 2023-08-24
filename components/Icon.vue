<template>
    <client-only>
        <font-awesome-icon 
        :icon="icon" 
        :style="{color, ...styles}"
        />
    </client-only>
</template>

<script lang="ts" setup>

    import { PropType } from 'vue';

    defineProps({
        icon: {
            type: String as PropType<string>, 
            required: true
        }, 
        color: {
            type: String as PropType<string>
        }, 
        styles: {
            type: Object as PropType<object>, 
            required: false, 
            default: {}
        }
    });

</script>