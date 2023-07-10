import { stringLength } from '@/utils/string_length';

export const isValidUsername = (username: string) => {

    const regs = /^[A-Z0-9]+\_?[A-Z0-9]$/i;
    const MAX_LEN = 12;
    const MIN_LEN = 6;

    return regs.test(username) && stringLength(username) >= MIN_LEN && stringLength(username) <= MAX_LEN;


}