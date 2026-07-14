"use client";
import { GitBranch } from "lucide-react";
import ReorderGame from "@/components/games/ReorderGame";
import { ALGORITHM_ROUNDS } from "@/lib/reorderGamesData";

export default function AlgorithmGamePage() {
  return (
    <ReorderGame
      title="Algorithm Game"
      icon={GitBranch}
      color="#F97316"
      description="Algoritm qadamlarini to'g'ri tartiblang."
      rounds={ALGORITHM_ROUNDS}
      coinPerCorrect={22}
      xpPerCorrect={30}
    />
  );
}
