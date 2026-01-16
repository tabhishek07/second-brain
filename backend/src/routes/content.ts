import { Router } from "express";
import { createHandler, deleteHandler, getHandler, updateHandler } from "../controllers/contentController.js";
import { authmiddleware } from "../middleware/authMiddleware.js";

const contentRouter =  Router();

contentRouter.use(authmiddleware);
contentRouter.post("/create", createHandler )
contentRouter.get("/getContent", getHandler)
contentRouter.delete("/deleteContent/:id", deleteHandler)
contentRouter.put("/updateContent/:contentId", updateHandler)

export {
    contentRouter
}