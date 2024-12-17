import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.route("/upload-Video").post(upload.single("file"), async (req, res) => {
    try {
        const result = await uploadMedia(req.file.path);
        res.status(200).json({ data: result , success: true , message: "Video uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;