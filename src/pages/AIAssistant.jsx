import { useState } from "react";

import PageHeader from "../components/ui/PageHeader";

import AIEmptyState from "../components/ai/AIEmptyState";
import AIMessageBubble from "../components/ai/AIMessageBubble";
import AITypingIndicator from "../components/ai/AITypingIndicator";
import AIChatInput from "../components/ai/AIChatInput";

function AIAssistant() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [typing, setTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    setTyping(true);

    // Fake AI response
    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "This is a simulated AI response. Backend integration will come later.",
        },
      ]);
    }, 1500);
  };

  return (
    <div
      className="
        relative flex
        min-h-[calc(100vh-120px)]
        flex-col
      "
    >
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <PageHeader
          title="AI Assistant"
          description="Your intelligent productivity companion."
        />

        {/* Conversation */}
        <div
          className="
            flex flex-1
            flex-col
          "
        >
          {messages.length === 0 ? (
            <AIEmptyState />
          ) : (
            <div
              className="
                flex flex-1
                flex-col gap-6

                pb-8
              "
            >
              {messages.map((message) => (
                <AIMessageBubble
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}

              {typing && (
                <AITypingIndicator />
              )}
            </div>
          )}

          {/* Input */}
          <AIChatInput
            input={input}
            setInput={setInput}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;