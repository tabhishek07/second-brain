import express from "express";
import z from "zod";
import mongoose, { connect } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv, { parse } from "dotenv";
import {UserModel} from "./db.js"
import { userRouter } from "./routes/user.js";
import { contentRouter } from "./routes/content.js";
// import auth from "./routes/auth.js" 
dotenv.config();

const app = express();
app.use(express.json())

// zod schema



// sign up  and login endpoint bothnhandled in auth.ts

app.use("/api/v1/user", userRouter)  
app.use("api/v1/content", contentRouter)


app.get("/api/v1/content", (req, res) => {
    
})  

app.delete("/api/v1/content", (req, res) => {
    
})  

app.post("/api/v1/brain/share", (req,res)=> {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})


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
