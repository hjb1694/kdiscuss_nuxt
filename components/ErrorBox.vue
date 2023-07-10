<template>
    <div class="errbox animate__animated animate__headShake">
        <ul>
            <li v-for="err of errors">
                <Icon icon="fa fa-warning" color="#f00" />
                {{ err }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

    import { PropType } from 'vue';

    defineProps({
        errors: {
            type: Array as PropType<string[]>, 
            required: true
        }
    });

</script>

<style lang="scss" scoped>
    .errbox {
        background:rgb(255, 222, 222);
        border:1px solid rgb(255, 163, 163);
        margin:1rem 0;
        @include textBox;

        ul{
            list-style:none;
        }
    }

</style>