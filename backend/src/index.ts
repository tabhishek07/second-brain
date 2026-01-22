import express from "express";
import z from "zod";
import mongoose, { connect } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv, { parse } from "dotenv";
import cors from "cors"


import {UserModel} from "./db.js"
import { userRouter } from "./routes/user.js";
import { authmiddleware } from "./middleware/authMiddleware.js";
import { contentRouter } from "./routes/content.js";
import { shareRouter } from "./routes/share.js";

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

// sign up  and login endpoint bothnhandled in auth.ts
app.use((req, res, next) => {
    console.log(`${req.method} request to: ${req.url}`);
    next();
});

app.use("/api/v1/user", userRouter)  
app.use("/api/v1/content",contentRouter)
app.use("/api/v1/brain", shareRouter)


async function main(){
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            throw new Error("DB_URL environment variable is not set");
        }
        await connect(dbUrl);
        console.log("DB connected")

        app.listen(3000, () => {
            console.log("Server is running at port 3000")
        });
    } catch (err) {
        console.log("DB connection failed",err)
        process.exit(1);
    }
}

main();
