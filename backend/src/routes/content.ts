import { Router } from "express";
import { z } from "zod";

import { authmiddleware, type AuthRequest } from "../middleware/authMiddleware.js";
import { ContentModel } from "../db.js";
const contentRouter = Router();

// --------------------- Zod schema ----------------------------

const contentSchema = z.object({
    link: z.string().url(),
    type: z.enum(["image", "audio", "video", "artucle"]),
    title: z.string().min(1),
    tags: z.array(z.string()).optional()
})

// ------------------ Create content ----------------------------

contentRouter.post("/create", authmiddleware, async(req: AuthRequest, res) => {

    try {
        
        const parsed = contentSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                message: parsed.error.issues,
            })
        }

        const { link, type, title, tags } = parsed.data;

        // let tagIds: any[] =[];
        // if(tags && tags.length > 0){
        //     for(const tagTitle fo tags){
        //         let tag =await 
        //     }
        // }

        const content = await ContentModel.create({
            link,
            type,
            title,
            // tags: tagIds,
            userId: req.userId,
        })

        return res.status(200).json({
            message: "content created",
            content,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message : "server error"})
    }
});

// ------------------ get user content --------------------

contentRouter.get("/get",authmiddleware, async(req: AuthRequest, res) => {
    try {
        const contents = await ContentModel.find({
            userId: req.userId,
        }).populate("tags");

        return res.status(200).json({contents});

    } catch (err) {
        console.log(err);
        return res.sendStatus(500).json({message: "Server error"})
    }
});

// ------------------- Delete Content ---------------------

contentRouter.delete("/content/:id", authmiddleware, async(req: AuthRequest, res){
    try {
        const { id } = req.params;

        const deleted  = await ContentModel.findOneAndDelete({
            _id: id,
            userId: req.userId,
        });

        if(!deleted){
            return res.status(404).json({
                message: "Content not found",
            })
        }

        return res.status(200).json({
            message: "Content deleted",
        })
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: " server error"})
    }
})

export {
    contentRouter,
}