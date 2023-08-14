import { createRouter, defineEventHandler, useBase, readBody } from 'h3';
import { ResponseError } from '../../utils/ResponseError';
import getToken from '../../utils/get_token';

const router = createRouter()
const runtimeConfig = useRuntimeConfig();
const accountAPIUri = runtimeConfig.account_api_uri;
const accountAPIKey = runtimeConfig.account_api_key;

router.post('/exists/email', defineEventHandler(async event => {

    try{

        const body = await readBody(event);

        if(!body['email_address']){
            throw new ResponseError({
                status_code: 422, 
                short_msg: 'ERR_MISSING_INFO', 
                body: {
                    message: 'Missing email.'
                }
            });
        }

        const data: any = await $fetch(`${accountAPIUri}/auth/exists/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'X-API-KEY': accountAPIKey
            },
            body: {
                email_address: body['email_address']
            }
        });

        return {
            doesExist: data
        };

    }catch(e) {

        console.error(e);

        return ResponseError.respondWithError(e);

    }

}));


router.post('/exists/username', defineEventHandler(async event => {

    const body = await readBody(event);

    try{

        const data = await $fetch(`${accountAPIUri}/auth/exists/account_name`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'X-API-KEY': accountAPIKey
            }, 
            body: {
                account_name: body['username']
            }
        });

        return {
            doesExist: data
        }

    }catch(e){

        console.error(e);

        return ResponseError.respondWithError(e);

    }


}));


router.post(`/register`, defineEventHandler(async event => {

    const body = await readBody(event);

    try{

        console.log(body);

        const data: any = await $fetch(`${accountAPIUri}/auth/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'X-API-KEY': accountAPIKey
            }, 
            body
        });

        const token = getToken(+data.body.user_id);

        setCookie(event, 'Authorization', token, {
            sameSite: true, 
            httpOnly: true
        });

        return {
            is_success: true, 
            user_id: data.body.user_id, 
            account_name: data.body.account_name
        };


    }catch(e: any){

        console.error(e);

        return ResponseError.respondWithError(e);

    }


}));


export default useBase('/api/auth', router.handler);
