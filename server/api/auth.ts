import { createRouter, defineEventHandler, useBase, getQuery, H3Error } from 'h3';
import { ResponseError } from '../utils/ResponseError';

const router = createRouter()

router.get('/exists/email', defineEventHandler(event => {

    try{

        const queryParams = getQuery(event);

        if(!queryParams['email_address']){
            throw new ResponseError({
                status_code: 422, 
                short_msg: 'ERR_MISSING_INFO', 
                body: {
                    message: 'Missing email.'
                }
            });
        }

    }catch(e) {

        return ResponseError.respondWithError(e);

    }

}))

export default useBase('/api/auth', router.handler)