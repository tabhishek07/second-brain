import express from "express";
import z, { json } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserModel } from "../db.js";
dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT envirement secret is not set ");
}
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const schema = z.object({
    username: z.string().min(4).max(10),
    password: z
        .string()
        .min(4)
        .max(20)
        .regex(/[a-z]/, "Password must have one lowercase letter")
        .regex(/[A-Z]/, "Password must have one upperrcase letter")
        .regex(/[0-9]/, "Password must have one number ( 0 - 9 )")
});
router.post("/api/v1/signup", async (req, res) => {
    try {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "invalid credentials",
                errors: parsed.error.issues,
            });
        }
        const { username, password } = parsed.data;
        const existingUser = await UserModel.findOne({
            username: username,
        });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exist !",
            });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = new UserModel({
            username,
            password: hashed
        });
        await user.save();
        return res.status(200).json({
            message: "User signed up!"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
});
const loginSchema = z.object({
    username: z.string().min(4).max(15),
    password: z.string().min(3)
});
router.post("/api/v1/login", async (req, res) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                errors: parsed.error.issues
            });
        }
        const { username, password } = parsed.data;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(402).json({
                message: "User not found !"
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Incorrect credentials"
            });
        }
        const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET);
        return res.status(200).json({ token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Login fialed!"
        });
    }
});
export default router;
//# sourceMappingURL=auth.js.map