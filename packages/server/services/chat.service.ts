import fs from "fs";
import path from "path";
import { conversationRepository } from "../repositories/conversation.repository";
import template from "../prompts/chatbot.txt";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const parkInfoPath = path.join(__dirname, "..", "prompts", "wonderworld.md");
const parkInfo = fs.readFileSync(parkInfoPath, "utf8");
const instructions = template.replace("{{parkInfo}}", parkInfo);
interface ChatResponse {
  id: string;
  message: string;
}

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: prompt,
      instructions,
      // NOTE: this is not support with GPT 5
      // temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });
    console.log(response);

    conversationRepository.setLastResponseId(conversationId, response.id);
    return {
      id: response.id,
      message: response.output_text,
    };
  },
};
