<template>
    <div>
        <header class="app-header">
            <img src="~/assets/img/kd_logo.png" alt="Knox Discuss Logo" class="logo"/>
            <button @click="toggleAuthModal(true)" class="login-btn">
                <Icon icon="fa fa-user" color="#fff" />
                <span>Login / Register</span>
            </button>
        </header>
        <AuthModal/>
    </div>
</template>

<script lang="ts" setup>
    
    const { toggleAuthModal } = useModalStore();

</script>

<style lang="scss">
    .app-header {
        height:10rem;
        background:linear-gradient(to right, $lighter-orange, $darker-orange);
        padding:1rem;
        display:flex;
        align-items: center;
        position:relative;
        border-top:3px solid $dark-grey-2;
    }

    .logo{
        width:20rem;
    }

    .login-btn{
        border:none;
        background:$dark-grey-3;
        font-family:inherit;
        font-size:1.3rem;
        padding:.5rem;
        border-radius:0 0 0 5px;
        position:absolute;
        right:0;
        top:0;
        color: $white;
        cursor:pointer;
        text-transform: uppercase;
        box-shadow:0 0 .5rem rgba($black,.5);

        span{
            margin-left:.8rem;
        }
    }

    @media (max-width: 600px) {
        .logo {
            width:16rem;
        }

        .login-btn {
            font-size:1.2rem;
        }

        .app-header {
            height:8rem;
        }
    }
</style>