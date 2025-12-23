import express from "express";
import { Router } from "express"
import z from "zod";
import { TagModel } from "../db.js";
import { authmiddleware } from "../middleware/authMiddleware.js";

const tagRouter = Router();

// ----------- Zod schema -------------------------

const tagSchema = z.object({
    title: z.string().min(1),
})


//------------ Create tag --------------------------

tagRouter.post("/tag", authmiddleware, async(req, res) => {
    try {
        
        const parsed = tagSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                errors: parsed.error.issues,
            })
        }

        const { title } = parsed.data;

        const existing = await TagModel.findOne({ title });

        if(existing){
            return res.status(409).json({
                message: "Tag already exists",
            })
        }

        const tag = await TagModel.create({title});

        return res.status(201).json({
            message: "Tag Created",
            tag,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({message: "Server error"})
    }
});

// ---------------------- Get all Tags --------------

tagRouter.get("/tag", authmiddleware, async(req, res) => {
    try {
        const tags = await TagModel.find();

        return res.status(200).json({ tags });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Sever error"})
    }
});

export default tagRouter;