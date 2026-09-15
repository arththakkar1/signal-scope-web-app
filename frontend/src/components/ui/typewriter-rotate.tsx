"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterRotateProps {
  words: string[];
  className?: string;
}

export function TypewriterRotate({
  words,
  className,
}: TypewriterRotateProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(words[0].length);
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting" | "blank_waiting">("waiting");

  useEffect(() => {
    switch (phase) {
      case "waiting": {
        const timeout = setTimeout(() => {
          setPhase("deleting");
        }, 2500); // 2.5s pause when full word is shown
        return () => clearTimeout(timeout);
      }
      case "deleting": {
        if (subIndex > 0) {
          const timeout = setTimeout(() => {
            setSubIndex((prev) => prev - 1);
          }, 40); // 40ms backspace
          return () => clearTimeout(timeout);
        } else {
          setPhase("blank_waiting");
          setIndex((prev) => (prev + 1) % words.length);
        }
        break;
      }
      case "blank_waiting": {
        const timeout = setTimeout(() => {
          setPhase("typing");
        }, 2500); // 2.5s pause when blank (as requested)
        return () => clearTimeout(timeout);
      }
      case "typing": {
        if (subIndex < words[index].length) {
          const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + 1);
          }, 50); // 50ms type
          return () => clearTimeout(timeout);
        } else {
          setPhase("waiting");
        }
        break;
      }
    }
  }, [subIndex, phase, index, words]);

  return (
    <span className={cn("inline-block", className)}>
      {words[index].substring(0, subIndex)}
    </span>
  );
}
