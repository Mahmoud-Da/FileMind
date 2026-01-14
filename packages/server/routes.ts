import express from "express";
import multer from "multer";
import { chatController } from "./controllers/chat.controller";
import { uploadController } from "./controllers/upload.controller";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/api/chat", chatController.sendMessage);
router.post(
  "/api/upload",
  upload.single("file"),
  uploadController.uploadContext
);

export default router;
