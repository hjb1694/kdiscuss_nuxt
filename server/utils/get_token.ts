import * as jwt from "jsonwebtoken";

const getToken = async (userId: number) => {

    const config = useRuntimeConfig();

    const token = jwt.sign({userId}, config.jwt_secret);

    return token;

}

export default getToken;