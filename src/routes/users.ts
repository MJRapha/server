import { Router } from "express";
import _ from "underscore";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { validateSignUp } from "../middlewares/verifySignupBody";
import { alreadyExists } from "../middlewares/alreadyExists";
import { validateSignIn } from "../middlewares/verifySignInBody";
import authConfig from "../config/auth.config";
import { Tokens } from "../utils";

const router = Router();

router.post("/signup", validateSignUp, alreadyExists, async (req, res) => {
    try {
        const body = _.pick(req.body, "username", "email", "password");
        const existingUser = await User.findOne({ email: body.email })
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists", error: null })
        }
        body.password = bcrypt.hashSync(body.password)
        //12 rounds takes more
        const user = new User(body);
        //save the password hash to db:

        await user.save();
        return res.json({ message: "user saved", id: user._id });
    } catch (e) {
        return res.status(500).json({ message: "Server DB Error", error: e });
    }
});

router.post("/signin", validateSignIn, async (req, res) => {
    //email and password:
    try {
        //SELECT * FROM user JOIN Roles ON ...
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "No Such User" });
        }

        //123*12
        //verify body.password matches user.password
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        //const tokenEncoder = new Tokens()
        //const token = tokenEncoder.encodeToken(user as any)
        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, authConfig.secret, {
            expiresIn: "30d",
        })

        return res
            .status(200)
            .json(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    accessToken: token
                }
            );
    } catch (e) {
        return res.status(500).json({ message: "Server Error", error: e });
    }
});

export { router as authRouter };

//refael.y18@gmail.com
//Refael1!!4
