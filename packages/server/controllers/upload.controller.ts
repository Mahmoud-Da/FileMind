import type { Request, Response } from "express";
import { uploadService } from "../services/upload.service";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadController = {
  async uploadContext(req: Request, res: Response) {
    try {
      const file = req.file;
      const { conversationId } = req.body;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      if (!conversationId) {
        return res.status(400).json({ error: "Conversation ID is required." });
      }

      await uploadService.processAndSaveContext(file, conversationId);

      return res.json({ message: "Context loaded successfully" });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Failed to upload file" });
    }
  },
};
