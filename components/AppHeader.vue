<template>
    <div>
        <header class="app-header">
            <img src="~/assets/img/kd_logo.png" alt="Knox Discuss Logo" class="logo"/>
            <button class="login-btn">
                <client-only>
                    <font-awesome-icon icon="fas fa-user" :style="{color: '#fff', marginRight: '.5rem'}"></font-awesome-icon>
                </client-only>
                <span>Login / Register</span>
            </button>
        </header>
        <AuthModal/>
    </div>
</template>

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
        margin-right:1rem;
        position:absolute;
        right:1.5rem;
        top:1.5rem;
        color: $white;
        cursor:pointer;
        text-transform: uppercase;
        box-shadow:0 0 .5rem rgba($black,.5);
    }

    @media (max-width: 600px) {
        .logo {
            width:16rem;
        }

        .login-btn {
            font-size:1.2rem;
        }
    }
</style>