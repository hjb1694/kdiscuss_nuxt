import { H3Error, createError } from 'h3';

interface ResponseErrorObject {
    short_msg: string;
    status_code: number;
    body: any
}

export class ResponseError extends Error implements ResponseErrorObject {

    public short_msg: string;
    public status_code: number;
    public body: any;

    constructor(public responseErrorObj: ResponseErrorObject){
        super();
        this.short_msg = responseErrorObj.short_msg;
        this.status_code = responseErrorObj.status_code;
        this.body = responseErrorObj.body; 
    }

    static respondWithError(e: any) {

        const err = new H3Error();
        
        if(e instanceof ResponseError){
            err.data = e.body;
            err.statusCode = e.status_code;
        }else{
            err.statusCode = 500;
            err.data = {
                message: 'A server error has occurred.'
            }
        }

        throw err;

    }

    

}