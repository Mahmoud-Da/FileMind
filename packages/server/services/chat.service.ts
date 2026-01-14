import { conversationRepository } from "../repositories/conversation.repository";
import template from "../prompts/chatbot.txt";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
  id: string;
  message: string;
}

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const context =
      conversationRepository.getContext(conversationId) ||
      "No specific context provided.";

    const instructions = template.replace("{{context}}", context);

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
      instructions,
      max_output_tokens: 400,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.output_text,
    };
  },
};
