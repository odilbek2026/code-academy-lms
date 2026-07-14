"use client";
import { Code2 } from "lucide-react";
import ChoiceGame from "@/components/games/ChoiceGame";
import { JS_CHALLENGE_ROUNDS } from "@/lib/choiceGamesData";

export default function JsChallengePage() {
  return (
    <ChoiceGame
      gameId="js-challenge"
      title="JavaScript Challenge"
      icon={Code2}
      color="#EAB308"
      description="Kod chiqishini bashorat qiling."
      rounds={JS_CHALLENGE_ROUNDS}
      coinPerCorrect={18}
      xpPerCorrect={25}
    />
  );
}
