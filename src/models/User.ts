import { Schema, model } from "mongoose";

export interface IUser {
    username: string;
    email: string,
    password: string;
    role: string;
    createAt: Date;
}

const userSchema = new Schema({
    username: {
        type: String,
        min: 2,
        max: 20,
        required: true,
    },
    email: {
        type: String,
        min: 2,
        max: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 2,
        max: 255,
        required: true
    },
    role:
    {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const User = model<IUser>("User", userSchema);

export { User };