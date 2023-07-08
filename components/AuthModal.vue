<template>
    <div class="auth-modal">
        <Modal>
            <template v-slot:modalheader>
                <div class="tabs">
                    <button class="tab-btn active">Register</button>
                    <button class="tab-btn">Login</button>
                </div>
            </template>
            <template v-slot:modalbody>
                <div class="regiser-part">
                    <h2>Create an Account</h2>
                </div>
            </template>
            <template v-slot:modalfooter>
                <ButtonPrimary>Continue</ButtonPrimary>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
    .tabs {
        display:flex;
    }

    .tab-btn {
        border:1px solid #ccc;
        background:transparent;
        padding:1rem;

        &:last-child{
            border-left:none;
        }

        &.active {
            background:#ddd;
            box-shadow:inset 0 0 .5rem rgba($black, .2);
        }
    }

    h2 {
        text-transform: uppercase;
        font-size:2.2rem;
    }
</style>