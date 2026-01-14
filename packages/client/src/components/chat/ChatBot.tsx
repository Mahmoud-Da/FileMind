import notificationSound from "@/assets/sounds/notification.mp3";
import popSound from "@/assets/sounds/pop.mp3";
import axios from "axios";
import { useState } from "react";
import type { ChatFormData } from "./ChatInput";
import ChatInput from "./ChatInput";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import FileUploader from "./FileUploader";
import TypingIndicator from "./TypingIndicator";

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

type ChatResponse = {
  message: string;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId] = useState<string>(() => crypto.randomUUID());
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState("");
  const [hasContext, setHasContext] = useState(false);

  const onSubmit = async ({ prompt }: ChatFormData) => {
    if (!hasContext) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Please upload a text file first so I know what to talk about!",
        },
      ]);
      return;
    }

    try {
      setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
      setIsBotTyping(true);
      popAudio.play();

      const { data } = await axios.post<ChatResponse>("/api/chat", {
        prompt,
        conversationId,
      });

      setMessages((prev) => [...prev, { content: data.message, role: "bot" }]);
      notificationAudio.play();
    } catch {
      setError("Something went wrong, please try again.");
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full">
      <div className="pt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">AI Assistant</h1>
        <p className="text-gray-500 text-sm mb-4">
          Upload a document to start chatting
        </p>

        <FileUploader
          conversationId={conversationId}
          onUploadComplete={() => setHasContext(true)}
        />
      </div>

      <div className="flex flex-col flex-1 gap-3 px-4 mb-4 overflow-y-auto">
        {messages.length === 0 && !hasContext && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>Waiting for context...</p>
          </div>
        )}
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="px-4 pb-6">
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ChatBot;
