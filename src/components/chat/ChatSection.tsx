import { useState, useEffect, useRef } from "react";
import { Send, Heart } from "lucide-react";
import { BackButton } from "../BackButton";
import noxyAvatar from "@/assets/noxy-avatar.jpg";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

const supportiveResponses = [
  "I hear you 💜",
  "That must have felt tough, but you're strong!",
  "I'm glad you shared that with me 🌸",
  "You're doing amazing, even when it doesn't feel like it",
  "Thank you for trusting me with your feelings",
  "Your emotions are valid and important",
  "I'm here with you through this 🫂",
  "You have more strength than you realize",
  "It's okay to feel whatever you're feeling right now",
  "You deserve compassion, especially from yourself",
  "Every step forward, no matter how small, matters",
  "I believe in you and your ability to get through this ✨"
];

interface ChatSectionProps {
  onBack: () => void;
}

export const ChatSection = ({ onBack }: ChatSectionProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("noxy-chat-messages");
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      // Welcome message
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        content: "Hi there! I'm Noxy, and I'm so happy you're here. This is our safe space to chat about anything on your mind. How are you feeling today? 🌸",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: currentMessage.trim(),
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate Noxy thinking and responding
    setTimeout(() => {
      const randomResponse = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
      const noxyMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };

      const finalMessages = [...updatedMessages, noxyMessage];
      setMessages(finalMessages);
      localStorage.setItem("noxy-chat-messages", JSON.stringify(finalMessages));
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-[80vh]">
      <BackButton onClick={onBack} />
      
      <div className="flex items-center gap-3 mb-6">
        <img 
          src={noxyAvatar} 
          alt="Noxy" 
          className="w-10 h-10 rounded-full object-cover shadow-soft"
        />
        <div>
          <h2 className="text-xl font-bold text-primary">Chat with Noxy</h2>
          <p className="text-sm text-muted-foreground">Your caring AI friend</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 noxy-card">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[80%]">
              {!message.isUser && (
                <img 
                  src={noxyAvatar} 
                  alt="Noxy" 
                  className="w-6 h-6 rounded-full object-cover flex-shrink-0 floating"
                />
              )}
              
              <div className={`${message.isUser ? 'chat-bubble-user' : 'chat-bubble-noxy'}`}>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end gap-2">
              <img 
                src={noxyAvatar} 
                alt="Noxy" 
                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
              />
              <div className="chat-bubble-noxy">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind..."
          className="flex-1 p-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={1}
          style={{ minHeight: '44px', maxHeight: '120px' }}
        />
        <button
          onClick={sendMessage}
          disabled={!currentMessage.trim() || isTyping}
          className="noxy-button px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shimmer"
        >
          {isTyping ? <Heart className="w-4 h-4 animate-pulse text-primary-foreground" /> : <Send className="w-4 h-4 text-primary-foreground" />}
        </button>
      </div>
    </div>
  );
};