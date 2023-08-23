import { createRouter, useBase, defineEventHandler, getQuery, parseCookies } from 'h3';

const router = createRouter();
const runtimeConfig = useRuntimeConfig();
const accountAPIUri = runtimeConfig.account_api_uri;
const accountAPIKey = runtimeConfig.account_api_key;
const jwtSecret = runtimeConfig.jwt_secret;

router.get('/profile-exists', defineEventHandler(async (event) => {

    const query = getQuery(event);

    const accountName = query['account_name'];

    const data: any = await $fetch(`${accountAPIUri}/social/profile-exists?account_name=${accountName}`, {
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json', 
            'x-api-key': accountAPIKey
        }
    });

    return {exists: data.exists};


}));


router.get('/public', defineEventHandler(async (event) => {

    try {

        const query = getQuery(event);

        const accountName = query['account_name'];

        const data: any = await $fetch(`${accountAPIUri}/social/profile/public?account_name=${accountName}`, {
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'x-api-key': accountAPIKey
            }
        });

        return data;


    }catch(e){
        console.error(e);
        return ResponseError.respondWithError(e);
    }


}));

router.get('/auth-user', defineEventHandler(async (event) => {

    try{

        const query = getQuery(event);
        const profileUserAccountName = query['profile_user_account_name'];
        const cookies = parseCookies(event);
        const authData = evalToken(cookies['Authorization'], jwtSecret);

        const response: any = $fetch(`${accountAPIUri}/social/profile/auth-user?auth_user_account_name=${authData.account_name}&profile_account_name=${profileUserAccountName}`, {
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json', 
                'x-api-key': accountAPIKey
            }
        })

        return response;

    }catch(e){
        console.error(e);
        return ResponseError.respondWithError(e);
    }


}));


export default useBase('/api/profile', router.handler);