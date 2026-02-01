import express from 'express';
import { z } from 'zod';
import { ContentModel,TagModel } from '../db.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import type  { Response } from 'express'

const router = express.Router();

const contentSchema = z.object({
  link: z.string().url(),
  type: z.enum(["youtube", "twitter"]),
  title: z.string().min(1),
  tags:z.array(z.string()).optional()
})

const createHandler = async(req: AuthRequest, res: Response) => {
    console.log("createHandler hit")
    try {
        
        const parsed  = contentSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                message: parsed.error.issues
            })
        }

        const{ link, type, tags,title } = parsed.data;

        let tagIds: string[] = [];
        if (tags && tags.length > 0) {
            // Find or create each tag and get its ObjectId
            const tagObjects = await Promise.all(tags.map(async (tagName) => {
                // 'upsert' ensures it creates it if it doesn't exist
                const tag = await TagModel.findOneAndUpdate(
                    { title: tagName.toLowerCase() }, // Store in lowercase for consistency
                    { title: tagName.toLowerCase() },
                    { upsert: true, new: true }
                );
                return tag._id;
            }));
            tagIds = tagObjects.map(t => t.toString());
        }

        const content = await ContentModel.create({
            link,
            type,
            title,
            tags: tagIds,
            userId: req.userId,
        })

        return res.status(201).json({
            message: "Content created succcessfully"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Server error"
        })
    }
}


const getHandler = async (req: AuthRequest, res: Response ) => {
    try {
        const contents = await ContentModel.find({
            userId: req.userId,
        }).populate("tags", "title")

        return res.status(200).json({
            contents
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error"
        })
        
    }
}

const deleteHandler = async (req: AuthRequest, res: Response) => {
  try {
    
    const { id } = req.params;

    const deleted = await ContentModel.findOneAndDelete({
        _id : id,
        userId : req.userId,
    })

    if(!deleted){
        return res.status(404).json({
            message: "Content not found"
        })
    }

    return res.status(200).json({
        message: "Content deleted"
    })


  } catch (err) {
    console.log(err);
    return res.status(500).json({
        message: "Server error"
    })
    
  }
}

const updateContentSchema = z.object({
     link: z.string().url().optional(),
     type: z.enum(["image", "audio", "video", "article"]).optional(),
     title: z.string().min(1).optional(),
     tags:z.array(z.string()).optional()
})

const updateHandler =async(req: AuthRequest, res: Response) => {

    try {
        
        // auth chk
        if(!req.userId){
            return res.status(401).json({
                message: " Unauthorized"
            })
        }

        // get contentId from url

        const {contentId} = req.params;
        if(!contentId){
            return res.status(400).json({
                message: " ContentId required"
            })
        }

        // validate body

        const parsed = updateContentSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message: parsed.error.issues
            })
        }

        // 1. Separate tags from the rest of the update data
        const { tags, ...otherData } = parsed.data;
        let updateFields: any = { ...otherData };

        // 2. Process tags if they are being updated
        if (tags) {
            const tagObjects = await Promise.all(tags.map(async (tagName) => {
                const tag = await TagModel.findOneAndUpdate(
                    { title: tagName.toLowerCase() },
                    { title: tagName.toLowerCase() },
                    { upsert: true, new: true }
                );
                return tag._id;
            }));
            updateFields.tags = tagObjects;
        }

        // find and update

        const updateContent = await ContentModel.findOneAndUpdate(
            {_id:contentId, userId: req.userId },
            { $set: updateFields },
            { new: true }
        )

        if(!updateContent){
            return res.status(404).json({
                message: "content not found or not auth"
            })
        }

        // respone

        return res.status(201).json({
            message: "Content updated successfully",
            content: updateContent
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server Error"
        })
        
    }
}

export { createHandler, getHandler, deleteHandler, updateHandler }