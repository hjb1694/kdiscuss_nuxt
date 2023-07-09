<template>
    <div class="modal">
        <div class="modal__backdrop" @click="closeModal"></div>
        <div class="modal__dialog">
            <header class="modal__header">
                <slot name="modalheader"></slot>
                <button class="modal__close-btn" @click="closeModal">
                    <client-only>
                        <font-awesome-icon icon="fa fa-times"></font-awesome-icon>
                    </client-only>
                </button>
            </header>
            <section class="modal__body">
                <slot name="modalbody"></slot>
            </section>
            <footer class="modal__footer">
                <slot name="modalfooter"></slot>
            </footer>
        </div>
    </div>
</template>

<script lang="ts" setup>

    const emits = defineEmits(['closeModal']);

    function closeModal() {
        emits('closeModal');
    }

</script>

<style lang="scss" scoped>
    .modal{
        @include fullscreen(fixed);
        @include flexCenter;
        z-index:1000;
        padding:1rem;

        &__backdrop{
            @include fullscreen(absolute);
            background: rgba($black,.7);
        }

        &__dialog{
            width:50rem;
            background: $white;
            z-index:1001;
            box-shadow:rgba($black,.7);
            border-radius:5px;
            background: $white;
            animation: fadeSlideDown .3s forwards;
        }

        &__header, 
        &__body, 
        &__footer{
            padding: 1rem;
            position:relative;
        }

        &__body{
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
        }

        &__close-btn {
            position:absolute;
            right:1rem;
            top:1rem;
            font-size:2.4rem;
            color:#aaa;
            border:none;
            background:transparent;
        }

        &__footer{
            display:flex;
            align-items: center;
            justify-content: flex-end;
        }
    }

    @keyframes fadeSlideDown {
        from{opacity:0; transform:translateY(-5rem)}
        to{opacity:1; transform:translateY(0)}
    }
</style>