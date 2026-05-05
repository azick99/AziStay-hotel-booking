import { motion } from "framer-motion";
import { format } from "date-fns";
import { User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/types/ai.types";

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-start gap-3 px-4", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
        isUser ? "bg-neutral-700 dark:bg-neutral-600" : "bg-brand-500",
      )}>
        {isUser
          ? <User className="w-4 h-4 text-white" />
          : <Sparkles className="w-4 h-4 text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[80%] flex flex-col gap-1", isUser && "items-end")}>
        <div className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-brand-500 text-white rounded-tr-sm"
            : "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-tl-sm",
        )}>
          {message.content}
        </div>
        <span className="text-xs text-neutral-400 px-1">
          {format(new Date(message.timestamp), "HH:mm")}
        </span>
      </div>
    </motion.div>
  );
}