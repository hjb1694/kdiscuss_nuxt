<template>
    <div>
        <div class="profile-heading">
            <img class="profile-heading__bg" src="@/assets/img/default_profile_bg.jpg" alt="profile background image" />
            <img class="profile-heading__profile-img" src="@/assets/img/default_profile_img.jpeg" alt="profile image" />
            <div class="profile-heading__account-name">
                {{ $route.params.accountname }}
            </div>
        </div>
        <div class="profile-body">
            <div class="profile-sidebar">
                <div class="profile-menu">
                    <button class="profile-menu__button">
                        Follow
                    </button>
                    <button class="profile-menu__button">
                        Message
                    </button>
                    <button class="profile-menu__button">
                        Block
                    </button>
                </div>
            </div>
            <div></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .profile-heading {
        position:relative;
        height:18rem;
        border-bottom:2px solid $white;

        &__bg {
            position:absolute;
            left:0; 
            top:0;
            width:100%;
            height:100%;
            object-fit: cover;
            object-position: center;
            filter:blur(3px);
        }

        &__profile-img {
            width:12rem;
            height:12rem;
            object-fit: cover;
            object-position: center;
            position: absolute;
            left:3rem;
            top:3rem;
            border:2px solid orange;
            box-shadow:0 0 1rem rgba($black,.24);
            border-radius:3px;
        }

        &__account-name{
            position:absolute;
            display:inline-block;
            left:18rem;
            top:6rem;
            background:rgba($black, .8);
            color:#fff;
            font-size:1.8rem;
            padding:.7rem;
            border-radius:3px;
            box-shadow:0 0 1rem rgba($black,.24);
        }
    }

    .profile-body{
        padding:1.5rem;
        max-width:110rem;
        margin:2rem auto;
        display:grid;
        grid-gap:2rem;
        grid-template-columns:30rem auto;
    }

    .profile-sidebar {
        background:#fff;
        border:1px solid #ccc;
        padding:1rem;
    }

    .profile-menu__button {
        border:none;
        background:transparent;
        padding:.5rem;
        border-bottom:1px solid #ccc;
        width:100%;
    }


</style>