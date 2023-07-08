<template>
    <div class="auth-modal">
        <Modal>
            <template v-slot:modalheader>
                <div class="tabs">
                    <button class="tab-btn" :class="{active: tabActiveStates.register}">Register</button>
                    <button class="tab-btn" :class="{active: tabActiveStates.login}">Login</button>
                </div>
            </template>
            <template v-slot:modalbody>
                <form v-if="formShowStates.registration" class="registration">
                    <div v-show="registrationPartShowStates.intro" class="register-part register-part--intro">
                        <h2>Create an Account</h2>
                    </div>
                    <div v-show="registrationPartShowStates.part1" class="register-part register-part--1">
                        <h3>First Things First...</h3>
                        <p class="instruction">What is your Date of Birth?</p>
                        <FormGroup>
                            <select-field 
                            mode="single"
                            :options="months"
                            class="select"
                            placeholder="Month"
                            />
                        </FormGroup>
                        <FormGroup>
                            <select-field 
                            :options="days"
                            class="select" 
                            placeholder="Day"
                            />
                        </FormGroup>
                        <FormGroup>
                            <select-field 
                            :options="years"
                            class="select"
                            placeholder="Year"
                            />
                        </FormGroup>
                    </div>
                </form>
                <form v-if="formShowStates.login" class="login">

                </form>
            </template>
            <template v-slot:modalfooter>
                <ButtonPrimary v-if="formButtonShowStates.regContinueBtn" type="button">Continue</ButtonPrimary>
                <ButtonPrimary v-if="formButtonShowStates.regNextBtn" type="button">Next</ButtonPrimary>
                <ButtonPrimary v-if="formButtonShowStates.regCompleteBtn" type="submit" form="registration">Complete Registration</ButtonPrimary>
                <ButtonPrimary v-if="formButtonShowStates.loginBtn" type="submit">Login</ButtonPrimary>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>

    import { computed, reactive } from  'vue';

    const tabActiveStates = reactive({
        register: true, 
        login: false
    });

    const formButtonShowStates = reactive({
        regContinueBtn: true, 
        regNextBtn: false, 
        regCompleteBtn: false, 
        loginBtn: false
    });

    const formShowStates = reactive({
        registration: true, 
        login: false
    });

    const registrationPartShowStates = reactive({
        intro: true,
        part1: false
    });

    const months = [
        'January', 
        'Feburary', 
        'March', 
        'April',
        'May',
        'June', 
        'July', 
        'August',
        'September', 
        'October', 
        'November', 
        'December'
    ]

    const days = computed(() => {
        let d: number[] = [];
        for(let i = 1; i <= 31; i++){
            d.push(i);
        }
        return d;
    });

    const years = computed(() => {
        let y: number[] = [];
        const curYear = (new Date).getFullYear();
        for(let i = curYear; i >= curYear - 100; i--){
            y.push(i);
        }
        return y;
    });

</script>

<style lang="scss" scoped>

    .select {
        --ms-font-size:1.6rem;
        --ms-option-font-size:1.6rem;
        --ms-option-py: 1rem;
        --ms-option-bg-selected: #fdd78e;
        --ms-option-color-selected: #000;
        --ms-option-bg-selected-pointed: #ffce96;
        --ms-option-color-selected-pointed: #000;
        --ms-border-color-active: #ffe4c4;
        --ms-ring-color: #fdd78e50;
        margin:1rem 0;
    }
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

    h2, 
    h3 {
        font-size:2.2rem;
    }

    h2 {
        text-transform: uppercase;
    }

    .instruction {
        font-size:1.6rem;
        margin:2rem 0;
    }
</style>