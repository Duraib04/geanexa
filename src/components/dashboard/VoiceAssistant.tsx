import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Clean markdown and special characters from AI response text
const cleanResponseText = (text: string): string => {
  return text
    // Remove bold markers **text**
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Remove italic markers *text*
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove bullet points at line start
    .replace(/^[\s]*[-*•]\s*/gm, '')
    // Remove numbered list markers
    .replace(/^[\s]*\d+\.\s*/gm, '')
    // Remove hash headers
    .replace(/^#+\s*/gm, '')
    // Remove backticks
    .replace(/`([^`]+)`/g, '$1')
    // Remove extra whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

 interface VoiceAssistantProps {
   farmId?: string | null;
 }
 
 export function VoiceAssistant({ farmId }: VoiceAssistantProps) {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const recognitionRef = useRef<any>(null);

  const getLanguageCode = () => {
    switch (language) {
      case "ta": return "ta-IN";
      case "hi": return "hi-IN";
      case "tanglish": return "ta-IN"; // Use Tamil recognition for Tanglish
      default: return "en-IN";
    }
  };

  const startListening = () => {
    const win = window as any;
    if (!win.webkitSpeechRecognition && !win.SpeechRecognition) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.lang = getLanguageCode();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "no-speech") {
        toast.error("No speech detected. Please try again.");
      }
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speakResponse = (text: string) => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode();
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Get friendly error message based on language
  const getErrorMessage = (errorCode?: string) => {
    const errorMessages: Record<string, Record<string, string>> = {
      en: {
        RATE_LIMITED: "Too many requests. Please wait a moment.",
        CREDITS_EXHAUSTED: "Service temporarily unavailable.",
        default: "Could not get response. Tap retry."
      },
      ta: {
        RATE_LIMITED: "அதிக கோரிக்கைகள். சிறிது நேரம் காத்திருக்கவும்.",
        CREDITS_EXHAUSTED: "சேவை தற்காலிகமாக கிடைக்கவில்லை.",
        default: "பதில் கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்."
      },
      tanglish: {
        RATE_LIMITED: "Romba requests. Konjam wait pannunga.",
        CREDITS_EXHAUSTED: "Service temporarily illa.",
        default: "Response vaala. Retry pannunga."
      },
      hi: {
        RATE_LIMITED: "बहुत सारे अनुरोध। कृपया थोड़ा इंतज़ार करें।",
        CREDITS_EXHAUSTED: "सेवा अस्थायी रूप से अनुपलब्ध।",
        default: "जवाब नहीं मिला। पुनः प्रयास करें।"
      }
    };
    const messages = errorMessages[language] || errorMessages.en;
    return messages[errorCode || 'default'] || messages.default;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("farm-assistant", {
         body: { message: text, language, farmId },
      });

      if (error) throw error;

      if (data.error) {
        // Handle API-level errors
        const errorMsg = getErrorMessage(data.errorCode);
        setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
        return;
      }

      // Clean the response text before displaying
      const cleanedResponse = cleanResponseText(data.response || "Sorry, I could not understand. Please try again.");

      const assistantMessage: Message = {
        role: "assistant",
        content: cleanedResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Speak the cleaned response
      speakResponse(cleanedResponse);

    } catch (error) {
      console.error("Error:", error);
      const errorMsg = getErrorMessage();
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-20 w-20 rounded-full shadow-xl bg-transparent hover:scale-105 z-50 overflow-hidden p-0 border-4 border-card transition-transform"
        size="icon"
      >
        <Mic className="h-7 w-7" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 sm:w-96 max-h-[500px] shadow-xl border-0 z-50 overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            {isListening ? (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="/cow-avatar.png"
                alt="GeaNexa listening avatar"
              />
            ) : isSpeaking ? (
              <video
                className="h-10 w-10 rounded-full object-cover"
                src="/avatar-video/replay.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-label="GeaNexa speaking animation"
              />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{t.voiceAssistant}</h3>
            <p className="text-xs opacity-80">{t.askQuestion}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/20"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </Button>
      </div>

      <CardContent className="p-0">
        {/* Messages */}
        <div className="h-64 overflow-y-auto p-4 space-y-3 bg-muted/30">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              {isListening ? (
                <img
                  className="h-24 w-24 mx-auto mb-3 rounded-2xl object-cover shadow-lg ring-2 ring-primary/20"
                  src="/cow-avatar.png"
                  alt="GeaNexa listening avatar"
                />
              ) : (
                <Mic className="h-12 w-12 mx-auto mb-3 opacity-50" />
              )}
              <p className="text-sm">{t.tapToSpeak}</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] p-3 rounded-xl text-sm",
                msg.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-card shadow-sm border"
              )}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">{t.thinking}</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t bg-card">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="icon"
              variant={isListening ? "destructive" : "outline"}
              onClick={isListening ? stopListening : startListening}
              className="shrink-0"
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.askQuestion}
              className="flex-1 px-3 py-2 text-sm bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputText.trim() || isLoading}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isListening && (
            <p className="text-xs text-center mt-2 text-primary animate-pulse">
              🎤 {t.listening}
            </p>
          )}
          {isSpeaking && (
            <p className="text-xs text-center mt-2 text-accent flex items-center justify-center gap-1">
              <Volume2 className="h-3 w-3" /> Speaking...
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}