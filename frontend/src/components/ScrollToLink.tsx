"use client";

import { cn } from "@/lib/utils";
import { useLenis } from "./context/LenisContext";
import { motion, VariantLabels, TargetAndTransition } from "framer-motion";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.Dispatch<React.SetStateAction<boolean>>;
  whileHover?: VariantLabels | TargetAndTransition;
  whileTap?: VariantLabels | TargetAndTransition;
};

export default function ScrollToLink({
  to,
  children,
  className,
  whileHover,
  whileTap,
  onClick,
}: Props) {
  const lenis = useLenis();

  const handleClick = () => {
    onClick?.(false);

    const el = document.querySelector<HTMLElement>(to);
    if (!el) return;

    if (lenis) {
      lenis.scrollTo(el, {
        offset: -70,
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(2, -10 * t),
      });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      role="button"
      onClick={handleClick}
      whileHover={whileHover}
      whileTap={whileTap}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}
