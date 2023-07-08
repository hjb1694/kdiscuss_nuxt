<template>
    <button class="btn-primary">
        <slot name="default">[Text Here]</slot>
    </button>
</template>

<script lang="ts" setup>
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