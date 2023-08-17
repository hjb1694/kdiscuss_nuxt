import { ResponseError } from "./ResponseError";
import jwt from "jsonwebtoken";


const evalToken = (token: string, secret: string) => {

    try{

        if(!token){
            throw false;
        }

        const authData = jwt.verify(token, secret);

        return authData;


    }catch(e){
        throw new ResponseError({
            status_code: 401, 
            short_msg: 'ERR_INVALID_TOKEN', 
            body: {
                message: 'Invalid or missing auth token.'
            }
        });
    }



}

export default evalToken;