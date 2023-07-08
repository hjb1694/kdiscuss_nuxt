<template>
    <button class="btn-primary" :type="type" :form="form">
        <slot name="default">[Text Here]</slot>
    </button>
</template>

<script lang="ts" setup>

    import {PropType} from 'vue';

    type HTMLButtonTypeAttr = 'submit' | 'reset' | 'button' | undefined;

    const props = defineProps({
        type: {
            type: String as PropType<HTMLButtonTypeAttr>,
            default: 'button'
        }, 
        form: {
            type: String, 
            default: undefined
        }
    });

</script>

<style lang="scss" scoped>
    .btn-primary {
        border:none;
        background: $darker-orange;
        border-radius: 5px;
        color: $white;
        text-transform: uppercase;
        padding:.7rem 1rem;
        font-size: 1.6rem;
    }
</style>