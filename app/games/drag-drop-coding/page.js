"use client";
import { MousePointerClick } from "lucide-react";
import ReorderGame from "@/components/games/ReorderGame";
import { DRAG_DROP_ROUNDS } from "@/lib/reorderGamesData";

export default function DragDropCodingPage() {
  return (
    <ReorderGame
      title="Drag & Drop Coding"
      icon={MousePointerClick}
      color="#6366F1"
      description="Kod bloklarini sudrab to'g'ri tartiblang."
      rounds={DRAG_DROP_ROUNDS}
      coinPerCorrect={22}
      xpPerCorrect={30}
    />
  );
}
