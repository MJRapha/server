import jwt from 'jsonwebtoken'
import { IUser } from './models/User';
import mongoose from 'mongoose';
import authConfig from "./config/auth.config";

export class Tokens {

    encodeToken(user: IUser & { _id: mongoose.Schema.Types.ObjectId | string }) {
        const sign = { _id: user._id, email: user.email }
        return jwt.sign({ _id: user._id, email: user.email, role: user.role }, authConfig.secret, {
            expiresIn: "30d",
        })
    }

    isValidToken(token: string) {
        try {
            jwt.verify(token, authConfig.secret);
            return true
        } catch (e) { return false }
    }

    decodeToken(token: string) {
        return jwt.decode(token) as { _id: mongoose.Schema.Types.ObjectId | string, email: string }
    }

}

