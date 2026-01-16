import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Ensure JWT_SECRET is accessed once and type-checked
const JWT_SECRET = process.env.JWT_SECRET!;
if(!JWT_SECRET){
    throw new Error("JWT Secret Error")
}

export interface AuthRequest extends Request {
    userId?: string;
}

export function authmiddleware(req: AuthRequest, res: Response, next: NextFunction){
    console.log("🔥 auth hit file loaded 🔥");

    const auth = req.headers.authorization;

    // Check if header exists and starts with 'Bearer ' (including the space)
    if(!auth?.startsWith('Bearer ')){
        return res.status(401).json({message: "Unauthorized - No token or invalid format"});
    }

    // Safely extract the token
    const token = auth.split(" ")[1];

    // Explicitly check if the token part exists
    if (!token) {
        return res.status(401).json({message: "Unauthorized - Token missing after 'Bearer'"});
    }

    try {
        // Now 'token' is guaranteed by TypeScript to be a 'string'
        const payload = jwt.verify(token, JWT_SECRET) as unknown as { userId: string };

        if (!payload || typeof payload !== 'object' || !('userId' in payload) || typeof payload.userId !== 'string') {
            return res.status(401).json({ message: "Invalid token structure" });
        }

        req.userId = payload.userId;
        return next();
        
    } catch (err) {
        // Catches errors like JWT signature verification failure (e.g., token expired or invalid signature)
        return res.status(401).json({message: "Invalid token"})
    }
}