import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import AIEmptyState from "../components/ai/AIEmptyState";
import AIMessageBubble from "../components/ai/AIMessageBubble";
import AITypingIndicator from "../components/ai/AITypingIndicator";
import AIChatInput from "../components/ai/AIChatInput";
import api from "../lib/api";

function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || typing) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setTyping(true);

    try {
      const { reply } = await api("/ai/chat", {
        method: "POST",
        body: JSON.stringify({
          message: input,
          // send history excluding the message we just added
          // so the backend doesn't double-count it
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      setMessages([
        ...updatedMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-120px)] flex-col">
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Header */}
        <PageHeader
          title="AI Assistant"
          description="Your intelligent productivity companion."
        />

        {/* Conversation */}
        <div className="flex flex-1 flex-col">
          {messages.length === 0 ? (
            <AIEmptyState />
          ) : (
            <div className="flex flex-1 flex-col gap-6 pb-8">
              {messages.map((message) => (
                <AIMessageBubble
                  key={message.id}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {typing && <AITypingIndicator />}
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