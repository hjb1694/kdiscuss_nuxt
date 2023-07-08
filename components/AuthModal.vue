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
                    <div v-show="registrationPartShowStates[0]" class="register-part register-part--intro">
                        <h2>Create an Account</h2>
                        <ul class="benefits-list">
                            <li>
                                <client-only>
                                    <font-awesome-icon icon="fa fa-globe"></font-awesome-icon>
                                </client-only>
                                <p>It's FREE!</p>
                            </li>
                            <li>
                                <client-only>
                                    <font-awesome-icon icon="fa fa-globe"></font-awesome-icon>
                                </client-only>
                                <p>Gain access to all Ktown Portal sites and its features</p>
                            </li>
                            <li>
                                <client-only>
                                    <font-awesome-icon icon="fa fa-globe"></font-awesome-icon>
                                </client-only>
                                <p>Earn points. Redeem for REWARDS.</p>
                            </li>
                            <li>
                                <client-only>
                                    <font-awesome-icon icon="fa fa-globe"></font-awesome-icon>
                                </client-only>
                                <p>Meet other Knoxvillians and form connections</p>
                            </li>
                        </ul>
                    </div>
                    <div v-show="registrationPartShowStates[1]" class="register-part register-part--1">
                        <h3>First Things First...</h3>
                        <p class="instruction">What is your Date of Birth?</p>
                        <FormGroup>
                            <select-field 
                            v-model="selectedMonth"
                            mode="single"
                            :options="months"
                            class="select"
                            placeholder="Month"
                            :searchable="true"
                            />
                        </FormGroup>
                        <FormGroup>
                            <select-field 
                            v-model="selectedDay"
                            mode="single"
                            :options="days"
                            class="select" 
                            placeholder="Day"
                            :searchable="true"
                            />
                        </FormGroup>
                        <FormGroup>
                            <select-field 
                            v-model="selectedYear"
                            mode="single"
                            :options="years"
                            class="select"
                            placeholder="Year"
                            :searchable="true"
                            />
                        </FormGroup>
                    </div>
                    <div v-show="registrationPartShowStates[2]" class="register-part register-part--2">
                        <h3>Next, enter your email address.</h3>
                        <FormGroup>
                            <label class="label">Email Address</label>
                            <input type="email" class="text-input"/>
                        </FormGroup>
                        <div class="info-box">
                            <p>No worries, we will not sell your personal information, and we will remain light on the emails (We promise)!</p>
                        </div>
                    </div>
                    <div v-show="registrationPartShowStates[3]" class="register-part register-part--3">
                        <h3>Next, create your account credentials.</h3>
                        <FormGroup>
                            <label class="label">Account Name</label>
                            <input type="text" class="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <label class="label">Password</label>
                            <input type="password" class="text-input"/>
                        </FormGroup>
                        <FormGroup>
                            <label class="label">Confirm Password</label>
                            <input type="password" class="text-input">
                        </FormGroup>
                    </div>
                    <div v-show="registrationPartShowStates[4]" class="register-part register-part--4">
                        <h3>Now, let's create your personal persona. <em>(Almost done!)</em></h3>
                        <FormGroup>
                            <label class="label">Personal Persona Username</label>
                            <input type="text" class="text-input">
                        </FormGroup>
                    </div>
                </form>
                <form v-if="formShowStates.login" class="login">
                    
                </form>
            </template>
            <template v-slot:modalfooter>
                <ButtonPrimary v-if="formButtonShowStates.regContinueBtn" type="button" @click="regNext">Continue</ButtonPrimary>
                <ButtonPrimary v-if="formButtonShowStates.regNextBtn" type="button" @click="regNext">Next</ButtonPrimary>
                <ButtonPrimary v-if="formButtonShowStates.regCompleteBtn" type="submit" form="registration">Complete Registration</ButtonPrimary>
                <ButtonPrimary v-if="formButtonShowStates.loginBtn" type="submit">Login</ButtonPrimary>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>

    import { computed, reactive, ref } from  'vue';
import FormGroup from './FormGroup.vue';

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
        0: true,
        1: false, 
        2: false, 
        3: false, 
        4: false
    });

    const selectedMonth = ref();
    const selectedDay = ref();
    const selectedYear = ref();

    const months = [
        {
            value: '01', 
            label: 'January'
        },
        {
            value: '02', 
            label: 'February'
        },
        {
            value: '03', 
            label: 'March'
        },
        {
            value: '04', 
            label: 'April'
        },
        {
            value: '05', 
            label: 'May'
        },
        {
            value: '06', 
            label: 'June'
        },
        {
            value: '07', 
            label: 'July'
        },
        {
            value: '08', 
            label: 'August'
        },
        {
            value: '09', 
            label: 'September'
        },
        {
            value: '10', 
            label: 'October'
        }, 
        {
            value: '11', 
            label: 'November'
        },
        {
            value: '12', 
            label: 'December'
        }
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

    const showRegPart = (part) => {
        for(let step in registrationPartShowStates){
            registrationPartShowStates[step] = false;
        }
        registrationPartShowStates[part] = true;
    }

    const showButton = (button) => {
        for(let btn in formButtonShowStates){
            formButtonShowStates[btn] = false;
        }
        formButtonShowStates[button] = true;
    }

    const currentRegStep = ref(0);

    const regNext = () => {
        currentRegStep.value++;
        showRegPart(currentRegStep.value);
        let button: string;
        if(currentRegStep.value > 0 && currentRegStep.value < 5){
            button = 'regNextBtn';
        }else{
            button = 'regCompleteBtn';
        }
        showButton(button);
    }

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
        font-weight:400;
    }

    h2 {
        text-transform: uppercase;
        letter-spacing:1px;
    }

    .instruction {
        font-size:1.6rem;
        margin:2rem 0;
    }

    .benefits-list{
        list-style:none;
        margin:2rem 0;
        border:1px solid #f1f1f1;

        li {
            display:flex;
            align-items: center;
            font-size:1.4rem;
            padding:.8rem;

            &:nth-child(odd){
                background:#f1f1f1;
            }
        }

        p{
            margin-left:.8rem;
            font-size:1.6rem;
        }
    }

    .info-box{
        background:rgb(225, 225, 245);
        border:1px solid rgb(194, 194, 237);
        border-radius:3px;
        padding:1rem;
        font-size:1.4rem;
        color:#333;
    }
</style>