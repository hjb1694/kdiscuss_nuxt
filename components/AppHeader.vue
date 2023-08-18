<template>
    <div>
        <header class="app-header">
            <img src="~/assets/img/kd_logo.png" alt="Knox Discuss Logo" class="logo"/>
            <button v-if="!isAuth" @click="toggleAuthModal(true)" class="login-btn">
                <Icon icon="fa fa-user" color="#fff" />
                <span>Login / Register</span>
            </button>
            <div v-if="isAuth" class="auth-dropdown">
                <button class="auth-dropdown__toggle" @click="toggleAuthDropdown">
                    <icon icon="fa fa-user" color="#fff" />
                    <span>{{  authAcctName }}</span>
                </button>
                <div v-if="authDropdownIsShown" class="auth-dropdown__items">
                    <button class="auth-dropdown__item">
                        My Profile
                    </button>
                    <button class="auth-dropdown__item" @click="logout">
                        Logout
                    </button>
                </div>
            </div>
        </header>
        <AuthModal/>
    </div>
</template>

<script lang="ts" setup>

    import { computed } from 'vue';
    
    const { toggleAuthModal } = useModalStore();
    const { $auth } = useNuxtApp();
    const { isLoggedIn, accountName, logout } = $auth;

    const authDropdownIsShown = ref<boolean>(false);

    const isAuth = computed(() => isLoggedIn.value);
    const authAcctName = computed(() => accountName.value);

    const toggleAuthDropdown = () => {
        authDropdownIsShown.value = !authDropdownIsShown.value;
    }



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

    .auth-dropdown {
        position:absolute;
        right:0;
        top:0;

        &__toggle {
            border:none;
            background:$dark-grey-3;
            font-family:inherit;
            font-size:1.3rem;
            padding:.5rem;
            border-radius:0 0 0 5px;
            color: $white;
            cursor:pointer;
            box-shadow:0 0 .5rem rgba($black,.5);

            span{
                margin-left:.8rem;
                pointer-events:none;
            }
        }

        &__items {
            z-index:500;
            position:absolute;
            top:3rem;
            right:0;
            background:#fff;
            width:15rem;
            box-shadow:0 0 .5rem rgba($black,.5);
        }

        &__item {
            display:block;
            width:100%;
            text-align: left;
            background:transparent;
            border:none;
            font-family: inherit;
            padding:.8rem 1rem;
            transition:background .3s;

            &:not(:last-child) {
                border-bottom:1px solid #ccc;
            }

            &:hover {
                background:#eee;
            }
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