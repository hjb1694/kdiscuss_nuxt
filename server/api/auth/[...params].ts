import { createRouter, defineEventHandler, useBase, readBody } from 'h3';
import { ResponseError } from '../../utils/ResponseError';

const router = createRouter()
const runtimeConfig = useRuntimeConfig();
const accountAPIUri = runtimeConfig.account_api_uri;
const accountAPIKey = runtimeConfig.account_api_key;

router.post('/exists/email', defineEventHandler(async event => {

    try{

        console.log('BOOM!');

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

        ResponseError.respondWithError(e);

    }

}));

export default useBase('/api/auth', router.handler);
