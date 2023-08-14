<template>
    <div>
        <label class="label">{{ label }}</label>
        <input 
        class="text-input"
        :value="modelValue"
        @input="updateValue($event)"
        :type="type" 
        :maxlength="maxLength"
        />
    </div>
</template>

<script lang="ts" setup>

    import { PropType } from 'vue';

    type InputType = 'text' | 'email' | 'password'

    defineProps({
        modelValue: {
            type: String as PropType<string>, 
            default: ''
        }, 
        label: {
            type: String as PropType<string>, 
            default: '[LABEL]'
        },
        type: {
            type: String as PropType<InputType>, 
            default: 'text'
        }, 
        maxLength: {
            type: String, 
            default: '1000'
        }
    });

    const emit = defineEmits(['update:modelValue']);

    const updateValue = (evt: any) => {
        emit('update:modelValue', evt.target.value);
    }

</script>

<style lang="scss" scoped>
    .text-input {
        border:1px solid #ddd;
        border-radius:3px;
        font-size:1.6rem;
        padding:.8rem;
        display:block;
        width:100%;
        outline:none;

        &:focus {
            border:1px solid #ffb65e;
        }
    }

    .label {
        display:block;
        margin-bottom:3px;
        font-size:1.3rem;
    }
</style>