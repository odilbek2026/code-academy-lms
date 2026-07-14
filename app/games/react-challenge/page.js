"use client";
import { LayoutGrid } from "lucide-react";
import ChoiceGame from "@/components/games/ChoiceGame";
import { REACT_CHALLENGE_ROUNDS } from "@/lib/choiceGamesData";

export default function ReactChallengePage() {
  return (
    <ChoiceGame
      gameId="react-challenge"
      title="React Challenge"
      icon={LayoutGrid}
      color="#38BDF8"
      description="Komponent xatolarini toping va tuzating."
      rounds={REACT_CHALLENGE_ROUNDS}
      coinPerCorrect={18}
      xpPerCorrect={25}
    />
  );
}
