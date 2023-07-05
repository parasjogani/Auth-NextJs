import { NextRequest } from "next/server";
import JWT from "jsonwebtoken";
import { request } from "http";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = JWT.verify(token, process.env.JWT_SECRET_KEY!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}