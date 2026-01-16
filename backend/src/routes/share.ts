import { Router } from "express";
import crypto from "crypto";
import { authmiddleware, type AuthRequest } from "../middleware/authMiddleware.js";
import { ContentModel, LinkModel } from "../db.js";

const shareRouter = Router();

shareRouter.post("/share",authmiddleware, async (req: AuthRequest, res:) => {
    try {
        if(!req.userId){
            return res.status(401).json({
                message: "Unauthorized userId not found"
            })
        }

        // check if a shared link already exist 
        const existing = await LinkModel.findOne({
            userId: req.userId
        })

        if(existing){
            return res.json({
                shareLink: existing.hash
            })
        }

        const hash = crypto.randomBytes(10).toString("hex")

        await LinkModel.create({
            userId: req.userId,
            hash
        })

        return res.status(201).json({
            shareLink: hash
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server error"
        })
    }
}) 

shareRouter.get("/:shareLink",async(req, res) => {
    try {
        const { shareLink } = req.params;
        const share = await LinkModel.findOne({
            hash: shareLink
        })

        if(!share){
            return res.status(404).json({
                message: "Invalid link "
            })
        }

        // fetch content

        const content = await ContentModel.find({
            userId: share.userId
        })

        return res.json({
            content,
            message: "Brain share successfull"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Server error"
        })
    }
})

export {
    shareRouter
}