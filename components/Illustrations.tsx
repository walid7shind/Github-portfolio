"use client";

import { motion } from "framer-motion";

export const HeroIllustration = () => {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[500px] mx-auto opacity-90"
    >
      <motion.rect
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        x="50"
        y="80"
        width="300"
        height="240"
        rx="12"
        className="fill-card stroke-border"
        strokeWidth="2"
      />
      {/* Header Bar */}
      <motion.rect
        initial={{ width: 0 }}
        animate={{ width: 300 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        x="50"
        y="80"
        width="300"
        height="32"
        rx="12"
        className="fill-muted/20"
      />
      {/* Window Buttons */}
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        cx="70"
        cy="96"
        r="4"
        fill="#FF5F56"
      />
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
        cx="86"
        cy="96"
        r="4"
        fill="#FFBD2E"
      />
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7 }}
        cx="102"
        cy="96"
        r="4"
        fill="#27C93F"
      />
      
      {/* Code Lines */}
      <motion.rect
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ delay: 1, duration: 0.5 }}
        x="80"
        y="140"
        width="120"
        height="8"
        rx="4"
        className="fill-primary/60"
      />
      <motion.rect
        initial={{ width: 0 }}
        animate={{ width: 180 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        x="80"
        y="164"
        width="180"
        height="8"
        rx="4"
        className="fill-muted-foreground/40"
      />
      <motion.rect
        initial={{ width: 0 }}
        animate={{ width: 140 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        x="80"
        y="188"
        width="140"
        height="8"
        rx="4"
        className="fill-muted-foreground/40"
      />
      <motion.rect
        initial={{ width: 0 }}
        animate={{ width: 100 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        x="80"
        y="212"
        width="100"
        height="8"
        rx="4"
        className="fill-primary/40"
      />
      
      {/* Floating Elements */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <circle cx="320" cy="160" r="25" className="fill-blue-500/20" />
        <path d="M310 160 L320 170 L335 150" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500" fill="none"/>
      </motion.g>

      <motion.g
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
      >
        <rect x="280" y="240" width="50" height="50" rx="8" className="fill-purple-500/20" />
        <path d="M295 265 L315 265 M305 255 L305 275" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-purple-500" />
      </motion.g>
    </svg>
  );
};

export const ContactIllustration = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[300px] mx-auto"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M20 60 L100 130 L180 60"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <motion.rect
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        x="20"
        y="60"
        width="160"
        height="100"
        rx="8"
        stroke="currentColor"
        strokeWidth="4"
        className="text-primary"
      />
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        cx="160"
        cy="50"
        r="12"
        className="fill-green-500"
      />
      <motion.path
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.7 }}
        d="M156 50 L160 54 L166 46"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PageBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden opacity-20 pointer-events-none">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="page-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-pattern)" />
      </svg>
    </div>
  );
};
