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
            <div v-if="!profileData.isDeactivated" class="profile-sidebar">
                <div class="profile-menu">
                    <template v-if="!isSelf">
                        <button v-if="followButtonIsShown" class="profile-menu__button">
                            Follow
                        </button>
                        <button class="profile-menu__button">
                            Message
                        </button>
                        <button class="profile-menu__button">
                            Block
                        </button>
                    </template>
                    <button v-else class="profile-menu__button">
                        Edit Profile
                    </button>
                </div>
            </div>
            <div v-else></div>
            <template v-if="isLoggedIn && !profileData.isPrivateProfile">
                <div class="profile-about">
                    <h2>About Me</h2>
                    <div class="about-tile">
                        <h3 class="about-tile__heading">My Bio</h3>
                        <div v-if="profileData.about.bio !== null" class="about-tile__content">
                            {{ profileData.about.bio }}
                        </div>
                        <div v-else class="about-tile__content">
                            <i>[No Bio]</i>
                        </div>
                    </div>
                    <div class="about-tile">
                        <h3 class="about-tile__heading">My Location</h3>
                        <div v-if="profileData.about.location" class="about-tile__content">
                            {{ profileData.about.location }}
                        </div>
                        <div v-else class="about-tile__content">
                            <i>[Not Specified]</i>
                        </div>
                    </div>
                    <div class="about-tile">
                        <h3 class="about-tile__heading">Gender</h3>
                        <div v-if="profileData.about.gender !== 'NOT_SPECIFIED'" class="about-tile__content">
                            {{ profileData.about.gender }}
                        </div>
                        <div v-else class="about-tile__content">
                            <i>[Not Specified]</i>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="isLoggedIn && profileData.isPrivateProfile">
                <div class="private-banner">
                    Private Profile
                </div>
            </template>
            <template v-if="!isLoggedIn">
                <div class="login-instruction-banner">
                    Login or Register to view {{ profileAccountName }}'s profile.
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>

    import { watch, reactive } from 'vue';

    definePageMeta({
        middleware: defineNuxtRouteMiddleware(async (to) => {
            const data: any = await $fetch(`/api/profile/profile-exists?account_name=${to.params.accountname}`);

            if(!data.exists){
                console.log('not exists');
                return navigateTo('/user/not-found');
            }
        })
    });

    const { $auth } = useNuxtApp();
    const { params } = useRoute();

    const isLoggedIn = computed(() => $auth.isLoggedIn.value);
    const authAccountName = computed(() => $auth.accountName.value);
    const profileAccountName = ref<string>(params.accountname as string);
    const isSelf = ref<boolean>(authAccountName.value === profileAccountName.value);

    const profileData = reactive({
        isDeactivated: false,
        profileUserId: null,
        isPrivateProfile: false, 
        profileImageURI: null,
        accountType: null,
        social: {
            userViewedIsBlocked: false, 
            followStatus: null
        }, 
        about: {
            bio: null, 
            location: null, 
            gender: 'NOT_SPECIFIED'
        }
    });

    const followButtonIsShown = computed(() => profileData.social.followStatus === null);

    const resetProfileData = () => {
        profileData.isDeactivated = false;
        profileData.profileUserId = null;
        profileData.isPrivateProfile = false;
        profileData.profileImageURI = null;
        profileData.accountType = null;
        profileData.social.userViewedIsBlocked = false;
        profileData.social.followStatus = null;
        profileData.about.bio = null;
        profileData.about.location = null;
        profileData.about.gender = 'NOT_SPECIFIED';
    }

    const fetchPublicProfile = async () => {

        const data = await $fetch(`/api/profile/public?account_name=${profileAccountName.value}`);

        profileData.profileUserId = data.user_id;
        profileData.profileImageURI = data.profile_image_uri;

    }

    const fetchProfileForAuthUser = async () => {

        const data = await $fetch(`/api/profile/auth-user?profile_user_account_name=${profileAccountName.value}`, {
            headers: useRequestHeaders(['cookie'])
        });

        console.log(data);

        profileData.isDeactivated = data.isDeactivated;
        profileData.isPrivateProfile = data.is_private_profile;
        profileData.accountType = data.account_type
        profileData.social.followStatus = data.social.follow_status;
        profileData.social.userViewedIsBlocked = data.social.user_viewed_is_blocked;

        if(!profileData.isPrivateProfile){
            profileData.about.bio = data.about.bio;
            profileData.about.gender = data.about.gender;
            profileData.about.location = data.about.location;
        }

    }

    const init = async () => {

        resetProfileData();

        if(process.client){

            const data: any = await $fetch(`/api/profile/profile-exists?account_name=${profileAccountName.value}`);

            if(!data.exists){
                console.log('not exists');
                await navigateTo('/');
                return;
            }

        }

        if(isLoggedIn.value){

            if(authAccountName.value === profileAccountName.value){
                isSelf.value = true;
            }else{
                isSelf.value = false;
            }

            fetchProfileForAuthUser();

        }else{
            isSelf.value = false;
            fetchPublicProfile();
        }

    }

    watch(() => isLoggedIn.value, () => {
        init();
    });

    if(process.server) init();



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

    .login-instruction-banner, 
    .private-banner {
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