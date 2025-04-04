import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MessageItem from "./MessageItem";
import { Message } from "../../types/shabdgpt";

interface ChatMessagesProps {
  messages: Message[];
  playAudio: (url: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, playAudio }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-5"
    >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} playAudio={playAudio} />
      ))}
      <div ref={messagesEndRef} />
    </motion.div>
  );
};

export default ChatMessages;