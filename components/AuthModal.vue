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
                <form v-if="formShowStates.registration" class="registration" id="registration" @submit.prevent>
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
                                <p>Earn points. Redeem for REWARDS. (Regular Accounts Only)</p>
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
                        <ErrorBox v-if="registrationErrors.dob.length" :errors="registrationErrors.dob"/>
                    </div>
                    <div v-show="registrationPartShowStates[2]" class="register-part register-part--2">
                        <h3>Next, select your account type: </h3>
                        <div class="account-choices">
                            <label class="account-type-selection">
                                <input type="radio" v-model="selectedAcctType" value="REGULAR" class="account-type-selection__cb" />
                                <div class="account-type-selection__card">
                                    <Icon icon="fa fa-person-rays" />
                                    <div>Regular</div>
                                </div>
                            </label>
                            <label class="account-type-selection">
                                <input type="radio" v-model="selectedAcctType" value="BUSINESS" class="account-type-selection__cb" />
                                <div class="account-type-selection__card">
                                    <Icon icon="fa fa-briefcase" />
                                    <div>Business</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div v-show="registrationPartShowStates[3]" class="register-part register-part--3">
                        <h3>Next, enter your email address.</h3>
                        <FormGroup>
                            <TextInput label="Email Address" v-model="enteredEmail" type="email"/>
                        </FormGroup>
                        <ErrorBox v-if="registrationErrors.email.length" :errors="registrationErrors.email" />
                        <div class="info-box">
                            <p>No worries, we will not sell your personal information, and we will remain light on the emails (We promise)!</p>
                        </div>
                    </div>
                    <div v-show="registrationPartShowStates[4]" class="register-part register-part--4">
                        <h3>Next, create your account credentials.</h3>
                        <FormGroup>  
                            <TextInput label="Account Username" v-model="enteredUsername" type="text" max-length="12" />
                        </FormGroup>
                        <FormGroup>
                            <TextInput label="Password" v-model="enteredPassword" type="password" max-length="100"/>
                        </FormGroup>
                        <FormGroup>
                            <TextInput label="Confirm Password" v-model="enteredConfirmPassword" type="password" max-length="100"/>
                        </FormGroup>
                        <ErrorBox v-if="registrationErrors.creds.length" :errors="registrationErrors.creds" />
                    </div>
                    <div v-show="registrationPartShowStates[5]" class="register-part register-part--5">
                        <h3>Lastly, please agree to the following:</h3>
                        <FormGroup>
                            <Checkbox v-model="agreeRules" label="I agree to abide by the platform rules."/>
                        </FormGroup>
                        <FormGroup>
                            <Checkbox v-model="agreeTos" label="I agree to the Terms of Service."/>
                        </FormGroup>
                        <ErrorBox v-if="registrationErrors.agreements.length" :errors="registrationErrors.agreements" />
                    </div>
                </form>
                <form v-if="formShowStates.login" class="login" id="login" @submit.prevent>
                    <h2>Sign In</h2>
                    <FormGroup>
                        <TextInput label="Email" v-model="enteredLoginEmail" type="email" />
                    </FormGroup>
                    <FormGroup>
                        <TextInput label="Password" v-model="enteredLoginPassword" type="password" />
                    </FormGroup>
                    <FormGroup>
                        <span class="toggle-label">Personal</span>
                        <toggle v-model="isProfessionalLogin" class="login-type-toggle"/>
                        <span class="toggle-label">Professional</span>
                    </FormGroup>
                    <ErrorBox v-if="loginErrors.length" :errors="loginErrors"/>
                </form>
            </template>
            <template v-slot:modalfooter>
                <ButtonPrimary v-if="formButtonShowStates.regContinueBtn" type="button" @click="regNext">Continue</ButtonPrimary>
                <ButtonPrimary v-if="formButtonShowStates.regNextBtn" type="button" @click="regNext">Next</ButtonPrimary>
                <ButtonPrimary 
                v-if="formButtonShowStates.regCompleteBtn" 
                @click="regSubmit" 
                type="submit" 
                form="registration"
                :disabled="processing.regCompletion"
                >
                    <span v-if="!processing.regCompletion">Complete Registration</span>
                    <div class="loading" v-else>
                        <img src="@/assets/double_spinner.svg" alt="Loading..." class="btn-spinner"/>
                        <span>Please wait...</span>
                    </div>
                </ButtonPrimary>
                <ButtonPrimary 
                v-if="formButtonShowStates.loginBtn"
                @click="loginSubmit"
                form="login"
                type="submit"
                :disabled="processing.login"
                >
                    <span v-if="!processing.login">Login</span>
                    <div class="loading" v-else>
                        <img src="@/assets/double_spinner.svg" alt="Loading..." class="btn-spinner"/>
                        <span>Please wait...</span>
                    </div>
                </ButtonPrimary>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>

    import { computed, reactive, ref } from 'vue';
    import { DateTime } from 'luxon';
    import validator from 'validator';

    const modalStore = useModalStore();
    const authModalIsOpen = computed(() => modalStore.authModalIsOpen);
    const toggleAuthModal = modalStore.toggleAuthModal;
    const { isValidUsername, isValidNewPassword } = useValidators();
    const { $auth } = useNuxtApp();
    const { register, login } = $auth;

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

    const processing = reactive({
        regCompletion: false, 
        login: false
    });

    const selectedMonth = ref();
    const selectedDay = ref();
    const selectedYear = ref();
    const enteredEmail = ref('');
    const enteredUsername = ref('');
    const enteredPassword = ref('');
    const enteredConfirmPassword = ref('');
    const agreeRules = ref(false);
    const agreeTos = ref(false);
    const isProfessionalLogin = ref(false);
    const selectedAcctType = ref();
    const enteredLoginEmail = ref('');
    const enteredLoginPassword = ref('');

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
        email: reactive([]) as string[], 
        creds: reactive([]) as string[], 
        agreements: reactive([]) as string[]
    });

    const loginErrors = reactive<string[]>([]);

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
        resetRegistrationForm();
        formShowStates.login = false;
        formShowStates.registration = true;
        tabActiveStates.registration = true;
        tabActiveStates.login = false;
    }

    const currentRegStep = ref(0);

    // ========== REGISTRATION VALIDATIONS =============

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
            return true;
        },
        3: async () => {
            registrationErrors.email = [] as string[];
            !validator.isEmail(enteredEmail.value) && registrationErrors.email.push('Please enter a valid email address.');

            if(registrationErrors.email.length) return false;

            try{

                const data: any = await $fetch('/api/auth/exists/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: {
                        email_address: enteredEmail.value
                    }
                });   

                console.log(data.doesExist.body);

                if(data.doesExist.body){
                    registrationErrors.email.push('This email address already exists.');
                }

            }catch(e){
                console.error(e);
                registrationErrors.email.push('An unexpected error has occurred.');
            }
        

            return !!!registrationErrors.email.length;
        }, 
        4: async () => {

            registrationErrors.creds = [] as string[];

            !isValidUsername(enteredUsername.value) && registrationErrors.creds.push('Username must be between 6 and 12 alphanumeric characters with an optional underscore.');
            !isValidNewPassword(enteredPassword.value) && registrationErrors.creds.push('Password must be between 8 and 100 characters and contain at least one (1) uppercase letter, one (1) lowercase letter, and one(1) number.');
            (enteredPassword.value !== enteredConfirmPassword.value) && registrationErrors.creds.push('Confirm password does not match.');

            if(registrationErrors.creds.length) return false;

            try{

                const data: any = await $fetch('/api/auth/exists/username', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: {
                        account_name: enteredUsername.value
                    }
                });

                if(data.doesExist.body){
                    registrationErrors.creds.push('This username already exists!');
                }

            }catch(e){
                console.error(e);
                registrationErrors.creds.push('An unexpected error has occurred.');
            }




            return !!!registrationErrors.creds.length;
        }, 
        5: () => {

            registrationErrors.agreements = [];

            (!agreeTos.value || !agreeRules.value) && registrationErrors.agreements.push('You must agree to the above to complete registration.');

            return !!!registrationErrors.agreements.length;
        }
    }

    // ============== LOGIN VALIDATION ================

    const validateLogin = () => {

        loginErrors.splice(0,);

        !validator.isEmail(enteredLoginEmail.value) && loginErrors.push('Please enter a valid email.');
        (stringLength(enteredLoginPassword.value) < 1) && loginErrors.push('Please enter your password.');

        return !!!loginErrors.length;

    }



    const regAdvanceToNext = () => {

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

    const regNext = () => {
        if(currentRegStep.value > 0){
            if(validation[currentRegStep.value][Symbol.toStringTag] === 'AsyncFunction'){
                validation[currentRegStep.value]()
                .then((val: boolean) => {
                    if(val){
                        regAdvanceToNext();
                    }
                })
            }else{
                const isValid = validation[currentRegStep.value]();
                if(!isValid) return;
                regAdvanceToNext();
            }
        }else{
            regAdvanceToNext();
        }
    }

    const regSubmit = async () => {

        if(!validation[5]()) return;

        processing.regCompletion = true;
        registrationErrors.agreements = [];

        try{

            await register(
                selectedAcctType.value, 
                `${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`, 
                enteredUsername.value, 
                enteredEmail.value, 
                enteredPassword.value
            );

            resetRegistrationForm();
            toggleAuthModal(false);

        }
        catch(e){
            console.error(e);
            registrationErrors.agreements.push('An unexpected error has occurred.');
        }
        finally{
            processing.regCompletion = false;
        }

    }


    const loginSubmit = async () => {

        if(!validateLogin()) return;

        processing.login = true;
        loginErrors.splice(0,);

        try{

            await login(enteredLoginEmail.value, enteredLoginPassword.value);

        }catch(e: any){
            if(e.data.statusCode === 401){
                loginErrors.push('The credentials entered are either invalid or the account no longer exists.');
            }else{
                loginErrors.push('There was an error processing your request.');
            }
        }finally{
            processing.login = false;
        }



    }

    const toggleFormShowState = (form: string) => {
        formShowStates.login = false;
        formShowStates.registration = false;
        resetRegistrationForm();
        resetLoginForm();
        formShowStates[form] = true;
        tabActiveStates.login = false;
        tabActiveStates.registration = false;
        tabActiveStates[form] = true;

        if(form === 'login'){
            for(let key in formButtonShowStates){
                formButtonShowStates[key] = false;
            }
            formButtonShowStates.loginBtn = true;
        }
    }

    const resetLoginForm = () => {
        enteredLoginEmail.value = '';
        enteredLoginPassword.value = '';
        loginErrors.splice(0,);
    }


    const resetRegistrationForm = () => {
        currentRegStep.value = 0;
        showRegPart(0);
        showButton('regContinueBtn');
        selectedMonth.value = null;
        selectedDay.value = null;
        selectedYear.value = null;
        enteredEmail.value = '';
        enteredUsername.value = '';
        enteredPassword.value = '';
        enteredConfirmPassword.value = '';
        agreeRules.value = false;
        agreeTos.value = false
        registrationErrors.dob = [];
        registrationErrors.email = [];
    }

</script>

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

    .login-type-toggle {
        --toggle-bg-off: #aaa;
        --toggle-bg-on: #aaa;
        --toggle-height:2rem;
        --toggle-width:4rem;
        --toggle-ring-color: transparent;
        --toggle-border-on: #888;
        --toggle-border-off: #888;
    }

    .toggle-label {
        margin:0 1rem;
        font-size:1.6rem;
    }

    .account-type-selection {
        display:inline-block;
        cursor:pointer;

        &__card{
            border:1px solid #aaa;
            height:14rem;
            padding:1.5rem;
            border-radius:5px;
            font-size:2.2rem;
            @include flexCenter;
            flex-direction:column;
            margin:.5rem;
            background:#fcfcfc;

            div{
                margin-top:.8rem;
            }
        }

        &__cb {
            display:none;
        }

        &__cb:checked + .account-type-selection__card {
            background: $lighter-orange;
            border: $darker-orange;
            color: $white;
        }
    }

    .account-choices {
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
        align-content: center;
        margin:2rem 0;
    }

    .loading {
        display: flex;
        align-items: center;

        span {
            margin-left:.8rem;
        }
    }

    .btn-spinner {
        width:3rem;
    }

</style>