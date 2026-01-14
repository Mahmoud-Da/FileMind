import type { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { FaArrowUp } from "react-icons/fa";
import { Button } from "../ui/button";

export type ChatFormData = {
  prompt: string;
};

type ChatInputProps = {
  onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: ChatInputProps) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>({
    mode: "onChange",
  });

  const submit = (data: ChatFormData) => {
    reset({ prompt: "" });
    onSubmit(data);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(submit)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything"
        maxLength={1000}
        autoFocus
        {...register("prompt", {
          required: true,
          validate: (value) => value.trim().length > 0,
        })}
      />

      <Button
        disabled={!formState.isValid}
        className="rounded-full w-9 h-9 flex items-center justify-center border"
      >
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatInput;
