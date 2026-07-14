"use client";
import { LayoutGrid } from "lucide-react";
import ChoiceGame from "@/components/games/ChoiceGame";
import { FLEXBOX_ROUNDS } from "@/lib/choiceGamesData";

export default function FlexboxGamePage() {
  return (
    <ChoiceGame
      gameId="flexbox-game"
      title="CSS Flexbox Game"
      icon={LayoutGrid}
      color="#0EA5E9"
      description="Flexbox xususiyatlari bilan layout yig'ing."
      rounds={FLEXBOX_ROUNDS}
      coinPerCorrect={15}
      xpPerCorrect={20}
    />
  );
}
