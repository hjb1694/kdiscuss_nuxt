import { stringLength } from '@/utils/string_length';

export const useValidators = () => {

    const isValidUsername = (username: string) => {

        const regs = /^[A-Z0-9]+\_?[A-Z0-9]$/i;
        const MAX_LEN = 12;
        const MIN_LEN = 6;
    
        return regs.test(username) && stringLength(username) >= MIN_LEN && stringLength(username) <= MAX_LEN;


    }

    const isValidNewPassword = (password: string) => {

        const regs = {
            uppercase: /[A-Z]/, 
            lowercase: /[a-z]/, 
            numeric: /[0-9]/
        };

        return (
            regs.uppercase.test(password) &&
            regs.lowercase.test(password) &&
            regs.numeric.test(password) &&
            stringLength(password) > 8 && 
            stringLength(password) <= 100
        );


    }


    return {
        isValidUsername, 
        isValidNewPassword
    }


}