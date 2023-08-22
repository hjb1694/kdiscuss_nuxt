import { createRouter, useBase, defineEventHandler, getQuery } from 'h3';

const router = createRouter();
const runtimeConfig = useRuntimeConfig();
const accountAPIUri = runtimeConfig.account_api_uri;
const accountAPIKey = runtimeConfig.account_api_key;

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

        console.log(data);

        return data;


    }catch(e){
        console.error(e);
        return ResponseError.respondWithError(e);
    }


}));


export default useBase('/api/profile', router.handler);