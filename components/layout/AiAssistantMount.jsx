"use client";

import AiAssistant from "@/components/layout/AiAssistant";
import { useAiAssistantStore } from "@/store/useAiAssistantStore";

export default function AiAssistantMount() {
  const { open, close } = useAiAssistantStore();
  return <AiAssistant open={open} onClose={close} />;
}
