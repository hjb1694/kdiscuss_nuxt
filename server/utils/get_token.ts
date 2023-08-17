import jwt from "jsonwebtoken";

const getToken = (userId: number, accountName: string) => {

    const config = useRuntimeConfig();

    const token = jwt.sign({user_id: userId, account_name: accountName}, config.jwt_secret);

    return token;

}

export default getToken;