<template>
    <div v-if="authModalIsOpen" class="auth-modal">
        <Modal @closeModal="closeAuthModal">
            <template v-slot:modalheader>
                <div class="tabs">
                    <button 
                    class="tab-btn" 
                    :class="{active: tabActiveStates.registration}" 
                    :disabled="tabActiveStates.registration" 
                    @click="toggleFormShowState('registration')"
                    >
                    Register
                    </button>
                    <button 
                    class="tab-btn" 
                    :class="{active: tabActiveStates.login}" 
                    :disabled="tabActiveStates.login" 
                    @click="toggleFormShowState('login')"
                    >
                    Login
                    </button>
                </div>
            </template>
            <template v-slot:modalbody>
                <form v-if="formShowStates.registration" class="registration">
                    <div v-show="registrationPartShowStates[0]" class="register-part register-part--intro">
                        <h2>Create an Account</h2>
                        <ul class="benefits-list">
                            <li>
                                <Icon icon="fa fa-globe"/>
                                <p>It's FREE!</p>
                            </li>
                            <li>
                                <Icon icon="fa fa-globe"/>
                                <p>Gain access to all Ktown Portal sites and its features</p>
                            </li>
                            <li>
                                <Icon icon="fa fa-globe" />
                                <p>Earn points. Redeem for REWARDS.</p>
                            </li>
                            <li>
                                <Icon icon="fa fa-globe" />
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
                        <div v-if="registrationErrors.dob.length" class="errbox">
                            <ul>
                                <li v-for="err of registrationErrors.dob">
                                    <Icon icon="fa fa-warning" color="#f00" />
                                    {{ err }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div v-show="registrationPartShowStates[2]" class="register-part register-part--2">
                        <h3>Next, enter your email address.</h3>
                        <FormGroup>
                            <TextInput label="Email Address" v-model="enteredEmail" type="email"/>
                        </FormGroup>
                        <div v-if="registrationErrors.email.length" class="errbox">
                            <ul>
                                <li v-for="err of registrationErrors.email">
                                    <Icon icon="fa fa-warning" color="#f00" />
                                    {{ err }}
                                </li>
                            </ul>
                        </div>
                        <div class="info-box">
                            <p>No worries, we will not sell your personal information, and we will remain light on the emails (We promise)!</p>
                        </div>
                    </div>
                    <div v-show="registrationPartShowStates[3]" class="register-part register-part--3">
                        <h3>Next, create your account credentials.</h3>
                        <FormGroup>  
                            <TextInput label="Account Username" type="text" />
                        </FormGroup>
                        <FormGroup>
                            <TextInput label="Password" type="password" />
                        </FormGroup>
                        <FormGroup>
                            <TextInput label="Confirm Password" type="password" />
                        </FormGroup>
                    </div>
                    <div v-show="registrationPartShowStates[4]" class="register-part register-part--4">
                        <h3>Now, let's create your personal persona. <em>(Almost done!)</em></h3>
                        <FormGroup>
                            <TextInput label="Personal Persona Username" type="text" />
                        </FormGroup>
                    </div>
                    <div v-show="registrationPartShowStates[5]" class="register-part register-part--5">
                        <h3>Lastly, please agree to the following:</h3>
                        <FormGroup>
                            <Checkbox v-model="agreeRules" label="I agree to abide by the platform rules."/>
                        </FormGroup>
                        <FormGroup>
                            <Checkbox v-model="agreeTos" label="I agree to the Terms of Service."/>
                        </FormGroup>
                    </div>
                </form>
                <form v-if="formShowStates.login" class="login">
                    <form>
                        <h2>Sign In</h2>
                        <FormGroup>
                            <TextInput label="Email" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <TextInput label="Password" type="password" />
                        </FormGroup>
                    </form>
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
    import { DateTime } from 'luxon';
    import validator from 'validator';

    const modalStore = useModalStore();
    const authModalIsOpen = computed(() => modalStore.authModalIsOpen);
    const toggleAuthModal = modalStore.toggleAuthModal;

    const today = DateTime.now();

    const tabActiveStates = reactive({
        registration: true, 
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
        4: false, 
        5: false
    });

    const selectedMonth = ref();
    const selectedDay = ref();
    const selectedYear = ref();
    const enteredEmail = ref('');
    const agreeRules = ref(false);
    const agreeTos = ref(false);

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

    const registrationErrors = reactive({
        dob: reactive([]) as string[], 
        email: reactive([]) as string[]
    });

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

    const closeAuthModal = () => {
        toggleAuthModal(false);
    }

    const currentRegStep = ref(0);

    const validation = {
        1: () => {
            registrationErrors.dob = [] as string[];
            !selectedMonth.value && registrationErrors.dob.push('Please select a month.');
            !selectedDay.value && registrationErrors.dob.push('Please select a day.');
            !selectedYear.value && registrationErrors.dob.push('Please select a year.');  

            const enteredDob = DateTime.fromFormat(`${selectedMonth.value}-${selectedDay.value}-${selectedYear.value}`,'MM-dd-yyyy');

            !enteredDob.isValid && registrationErrors.dob.push('Please enter a valid DOB.');
            (today.diff(enteredDob, 'years').toObject().years < 16) && registrationErrors.dob.push('You must be at least 16 to join.');

            return !!!registrationErrors.dob.length;
        }, 
        2: () => {
            registrationErrors.email = [] as string[];
            !validator.isEmail(enteredEmail.value) && registrationErrors.email.push('Please enter a valid email address.');

            if(registrationErrors.email.length) return;

            return !!!registrationErrors.email.length;
        }, 
        3: () => {
            return true;
        }, 
        4: () => {
            return true;
        }
    }

    const regNext = () => {
        if(currentRegStep.value > 0 && !validation[currentRegStep.value]()) return;
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

    const toggleFormShowState = (form: string) => {
        formShowStates.login = false;
        formShowStates.registration = false;
        resetRegistrationForm();
        formShowStates[form] = true;
        tabActiveStates.login = false;
        tabActiveStates.registration = false;
        tabActiveStates[form] = true;
    }


    const resetRegistrationForm = () => {
        currentRegStep.value = 0;
        showRegPart(0);
        showButton('regContinueBtn');
        selectedMonth.value = null;
        selectedDay.value = null;
        selectedYear.value = null;
        agreeRules.value = false;
        agreeTos.value = false
        registrationErrors.dob = [];
        registrationErrors.email = [];
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

        &:disabled {
            color: $black;
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
        @include textBox;
    }

    .errbox {
        background:rgb(255, 222, 222);
        border:1px solid rgb(255, 163, 163);
        @include textBox;

        ul{
            list-style:none;
        }
    }
</style>