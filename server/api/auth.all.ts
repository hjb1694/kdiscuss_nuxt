import { createRouter, defineEventHandler, useBase, readBody } from 'h3';
import { ResponseError } from '../utils/ResponseError';

const router = createRouter()
const runtimeConfig = useRuntimeConfig();
const accountAPIUri = runtimeConfig.account_api_uri;

router.post('/exists/email', defineEventHandler(async event => {

    try{

        console.log('BOOM!');

        const queryParams = await readBody(event);

        // if(!queryParams['email_address']){
        //     throw new ResponseError({
        //         status_code: 422, 
        //         short_msg: 'ERR_MISSING_INFO', 
        //         body: {
        //             message: 'Missing email.'
        //         }
        //     });
        // }

        // const { data } = await $fetch(`${accountAPIUri}/auth/exists/username`, {
        //     query: {
        //         email_address: queryParams['email_address']
        //     }, 
        //     onResponseError({error}) {
        //         console.error(error);
        //     },
        // });

        // console.log(data.value);

        return {
            data: 1234
        };

    }catch(e) {

        return ResponseError.respondWithError(e);

    }

}));

export default useBase('/api/auth', router.handler);
