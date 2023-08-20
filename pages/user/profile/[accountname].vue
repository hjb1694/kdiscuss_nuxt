<template>
    <div>
        <div class="profile-heading">
            <img class="profile-heading__bg" src="@/assets/img/default_profile_bg.jpg" alt="profile background image" />
            <div class="profile-heading__content">
                <img class="profile-heading__profile-img" src="@/assets/img/default_profile_img.jpeg" alt="profile image" />
                <div class="profile-heading__account-name">
                    {{ profileAccountName }}
                </div>
            </div>
        </div>
        <div class="profile-body">
            <div class="profile-sidebar">
                <div v-if="!isSelf" class="profile-menu">
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
                <div v-else class="profile-menu">
                    <button class="profile-menu__button">
                        Edit Profile
                    </button>
                </div>
            </div>
            <template v-if="isLoggedIn">
                <div class="profile-about">
                    <h2>About Me</h2>
                    <div class="about-tile">
                        <h3 class="about-tile__heading">My Bio</h3>
                        <div class="about-tile__content">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consectetur incidunt nisi adipisci culpa repellat maxime, deserunt minus exercitationem delectus non, illo excepturi debitis consequatur laborum magnam. Ipsum, eius itaque!
                        </div>
                    </div>
                    <div class="about-tile">
                        <h3 class="about-tile__heading">My Location</h3>
                        <div class="about-tile__content">
                            Knoxville, Tennessee
                        </div>
                    </div>
                    <div class="about-tile">
                        <h3 class="about-tile__heading">Gender</h3>
                        <div class="about-tile__content">
                            Male
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="login-instruction">
                    Login or Register to view {{ profileAccountName }}'s profile.
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>

    import { watch } from 'vue';

    const { $auth } = useNuxtApp();
    const { params } = useRoute();

    const isLoggedIn = computed(() => $auth.isLoggedIn.value);
    const authAccountName = computed(() => $auth.accountName.value);


    const profileAccountName = ref<string>(params.accountname as string);
    const isSelf = ref<boolean>(false);

    const init = () => {

        if(isLoggedIn.value){

            if(authAccountName.value === profileAccountName.value){
                isSelf.value = true;
            }else{
                isSelf.value = false;
            }


        }else{
            isSelf.value = false;
        }

    }

    watch(() => isLoggedIn.value, () => {
        console.log('init called!');
        init();
    });

    init();



</script>

<style lang="scss" scoped>

    .profile-heading {
        position:relative;
        height:18rem;
        border-bottom:2px solid $white;
        padding:2rem;

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

        &__content {
            position:relative;
            max-width:120rem;
            margin:0 auto;
            height:100%;
        }

        &__profile-img {
            width:12rem;
            height:12rem;
            object-fit: cover;
            object-position: center;
            position: absolute;
            left:2rem;
            top:1rem;
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

    .login-instruction {
        background: #fff;
        border: 1px solid #ccc;
        padding: 1rem;
        font-size: 1.4rem;
        border-radius: 3px;
        color:#555;
    }

    .profile-body{
        padding:1.5rem;
        max-width:120rem;
        margin:2rem auto;
        display:grid;
        grid-gap:2rem;
        grid-template-columns:30rem auto;
        align-items: start;
    }

    .profile-sidebar, 
    .profile-about {
        background:#fff;
        border:1px solid #ccc;
        padding:1rem;
    }

    .profile-about h2 {
        color:#555;
        padding:1rem 0;
        border-bottom:1px solid #ccc;
    }

    .profile-menu__button {
        border:none;
        background:transparent;
        padding:.5rem;
        border-bottom:1px solid #ccc;
        width:100%;
        transition:background .3s;

        &:hover {
            background:#f4f4f4;
        }
    }

    .about-tile {
        margin:2rem 0;
        border:1px solid #ccc;
        border-radius:3px;
        overflow:hidden;

        &__heading {
            background:orange;
            padding:.5rem;
            color:#fff;
            font-size:1.6rem;
        }

        &__content {
            background:#fafafa;
            padding:.5rem;
            font-size:1.4rem;
        }
    }

    @media (max-width:900px) {

        .profile-body {
            display:block;
        }

        .profile-sidebar {
            margin-bottom:2rem;
        }

    }


</style>