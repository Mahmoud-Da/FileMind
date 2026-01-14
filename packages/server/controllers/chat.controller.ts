import type { Request, Response } from "express";
import z from "zod";
import { chatService } from "../services/chat.service";

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "prompt is required")
    .max(1000, "prompt is too long, maximum 1000 characters"),
  conversationId: z.uuid("invalid UUID"),
});

export const chatController = {
  async sendMessage(req: Request, res: Response) {
    try {
      const { prompt, conversationId } = req.body;

      const parsedResult = chatSchema.safeParse(req.body);

      if (!parsedResult.success) {
        return res.status(400).json(parsedResult.error.format());
      }

      const response = await chatService.sendMessage(prompt, conversationId);
      res.json({
        message: response.message,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to generate a response",
      });
    }
  },
};
