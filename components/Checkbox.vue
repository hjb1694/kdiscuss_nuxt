<template>
    <div class="outer">
        <label>
            <input type="checkbox" ref="checkboxInp" class="checkbox-input" @change="checkboxOnChange($event)">
            <div class="checkbox">
                <client-only>
                    <font-awesome-icon class="check-icon" icon="fa fa-check"/>
                </client-only>
            </div>
            <span class="checkbox-label">{{ label }}</span>
        </label>
    </div>
</template>

<script lang="ts" setup>

    import { PropType, watch , ref} from 'vue';

    const checkboxInp = ref<HTMLInputElement>();

    const props = defineProps({
        label: {
            type: String as PropType<string>, 
            required: true
        },
        modelValue: {
            type: Boolean as PropType<boolean>
        }
    })

    const emit = defineEmits(['update:modelValue']);

    watch(() => props.modelValue, (newValue) => {
        checkboxInp.value!.checked = newValue!;
    })

    const checkboxOnChange = (evt: any) => {
        emit('update:modelValue', evt.target.checked);
    }

</script>

<style lang="scss" scoped>
    .outer{
        display:inline-block;
    }

    label {
        display:flex;
        align-items:center;
        cursor: pointer;
    }

    .checkbox{
        margin-right:.8rem;
        height:1.8rem;
        width:1.8rem;
        border:1px solid #ccc;
        @include flexCenter;
    }

    .checkbox-input{
        display:none;
    }

    .check-icon {
        display:none;
        font-size:1.4rem;
        color: $white;
    }

    .checkbox-input:checked + .checkbox {
        background: $darker-orange;
        border:1px solid $darker-orange;
    }

    .checkbox-input:checked + .checkbox > .check-icon{
        display:block;
    }

    .checkbox-label {
        font-size:1.4rem;
    }
</style>