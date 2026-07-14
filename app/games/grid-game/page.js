"use client";
import { Blocks } from "lucide-react";
import ChoiceGame from "@/components/games/ChoiceGame";
import { GRID_ROUNDS } from "@/lib/choiceGamesData";

export default function GridGamePage() {
  return (
    <ChoiceGame
      gameId="grid-game"
      title="Grid Game"
      icon={Blocks}
      color="#14B8A6"
      description="CSS Grid bilan panjara qurishni mashq qiling."
      rounds={GRID_ROUNDS}
      coinPerCorrect={15}
      xpPerCorrect={20}
    />
  );
}
