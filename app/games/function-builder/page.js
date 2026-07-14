"use client";
import { Binary } from "lucide-react";
import ReorderGame from "@/components/games/ReorderGame";
import { FUNCTION_BUILDER_ROUNDS } from "@/lib/reorderGamesData";

export default function FunctionBuilderPage() {
  return (
    <ReorderGame
      title="Function Builder"
      icon={Binary}
      color="#EC4899"
      description="Bloklardan to'g'ri funksiya tuzing."
      rounds={FUNCTION_BUILDER_ROUNDS}
      coinPerCorrect={22}
      xpPerCorrect={30}
    />
  );
}
