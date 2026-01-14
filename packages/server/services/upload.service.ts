import { conversationRepository } from "../repositories/conversation.repository";

export const uploadService = {
  async processAndSaveContext(
    file: Express.Multer.File,
    conversationId: string
  ): Promise<void> {
    const content = file.buffer.toString("utf-8");
    conversationRepository.setContext(conversationId, content);
  },
};
