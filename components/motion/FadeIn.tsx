"use client";
import { motion, type MotionProps } from "framer-motion";
import { PropsWithChildren } from "react";

export default function FadeIn({ children, ...rest }: PropsWithChildren<MotionProps>) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} {...rest}>
      {children}
    </motion.div>
  );
}
