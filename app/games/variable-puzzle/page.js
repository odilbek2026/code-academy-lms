"use client";
import { Blocks } from "lucide-react";
import ChoiceGame from "@/components/games/ChoiceGame";
import { VARIABLE_PUZZLE_ROUNDS } from "@/lib/choiceGamesData";

export default function VariablePuzzlePage() {
  return (
    <ChoiceGame
      gameId="variable-puzzle"
      title="Variable Puzzle"
      icon={Blocks}
      color="#A855F7"
      description="O'zgaruvchilar bilan bog'liq mantiqiy jumboqlarni yeching."
      rounds={VARIABLE_PUZZLE_ROUNDS}
      coinPerCorrect={15}
      xpPerCorrect={20}
    />
  );
}
