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
                <div class="registration">
                    <!-- <div class="register-part register-part--intro">
                        <h2>Create an Account</h2>
                    </div> -->
                    <div class="register-part register-part--1">
                        <h3>First Things First...</h3>
                        <p class="instruction">What is your Date of Birth?</p>
                        <FormGroup>
                            <select-field 
                            :options="months"
                            class="select"
                            label="month"
                            />
                        </FormGroup>
                        <FormGroup>
                            <select-field 
                            :options="days"
                            class="select" 
                            label="Day"
                            />
                        </FormGroup>
                        <FormGroup>
                            <select-field 
                            :options="years"
                            class="select"
                            label="Year"
                            />
                        </FormGroup>
                    </div>
                </div>
            </template>
            <template v-slot:modalfooter>
                <ButtonPrimary>Continue</ButtonPrimary>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>

    import { computed } from  'vue';

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
        font-size:1.4rem;
        margin:2rem 0;
    }
</style>