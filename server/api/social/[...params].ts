import { createRouter, useBase, defineEventHandler, readBody, parseCookies } from 'h3';

const router = createRouter();
const runtimeConfig = useRuntimeConfig();
const accountAPIUri = runtimeConfig.account_api_uri;
const accountAPIKey = runtimeConfig.account_api_key;
const jwtSecret = runtimeConfig.jwt_secret;

router.post('/block-action', defineEventHandler(async (event) => {

    try{

        const body = await readBody(event);
        const blockedUserId = body['blocked_user_id'];
        const blockAction = body['action'];
        const cookies = parseCookies(event);
        const authData = evalToken(cookies['Authorization'], jwtSecret);

        await $fetch(`${accountAPIUri}/social/block-action`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'x-api-key': accountAPIKey
            }, 
            body: {
                blockerUserId: authData.user_id,
                blockedUserId,
                action: blockAction
            }
        });

        return true;

    }catch(e){
        console.error(e);
        return ResponseError.respondWithError(e);
    }

}));

router.post('/follow-action', defineEventHandler(async (event) => {

    try{

        const body = await readBody(event);
        const followedUserId = body['followed_user_id'];
        const followAction = body['action'];
        const cookies = parseCookies(event);
        const authData = evalToken(cookies['Authorization'], jwtSecret);

        await $fetch(`${accountAPIUri}/social/follow-action`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'x-api-key': accountAPIKey
            }, 
            body: {
                follower_user_id: authData.user_id, 
                followed_user_id: followedUserId,
                action: followAction
            }
        })

        return {
            success: true
        }


    }
    catch(e){
        console.error(e);
        return ResponseError.respondWithError(e);
    }

}))


export default useBase('/api/social', router.handler);