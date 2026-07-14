"use client";
import { Search } from "lucide-react";
import ChoiceGame from "@/components/games/ChoiceGame";
import { ERROR_FINDER_ROUNDS } from "@/lib/choiceGamesData";

export default function ErrorFinderPage() {
  return (
    <ChoiceGame
      gameId="error-finder"
      title="Error Finder"
      icon={Search}
      color="#EF4444"
      description="Konsol xatolarini tezkor aniqlang."
      rounds={ERROR_FINDER_ROUNDS}
      coinPerCorrect={18}
      xpPerCorrect={25}
    />
  );
}
