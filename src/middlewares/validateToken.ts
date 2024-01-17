import { NextFunction, Request, Response } from "express";
import { Tokens } from "../utils";


class InvalidTokenError extends Error {
    constructor() {
        super("Unauthorized,  invalid token")
    }
}

export default function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token_header = req.headers['authorization'] ?? req.headers['Authorization']
        const tokenIndex = token_header?.indexOf("Bearer ")
        if (!token_header || tokenIndex === -1) {
            throw new InvalidTokenError()
        }
        const token = token_header.slice(tokenIndex) as string
        const tokenDecoder = new Tokens();
        const user = tokenDecoder.decodeToken(token);
        (req as any).user = user;
        return next()
    } catch (e: any) {
        const errorMessage = e.message
        res.status(401).send(errorMessage)
    }
}