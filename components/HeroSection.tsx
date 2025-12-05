"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();
  const basePath = process.env.NODE_ENV === 'production' ? '/Github-portfolio' : '';

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row justify-center items-center px-4 py-20 bg-gradient-to-b from-background to-secondary/20 scroll-mt-20 gap-8 md:gap-12"
    >
      <div className="max-w-2xl space-y-8 text-center md:text-left flex-1 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 pb-2"
        >
          {t.personalInfo.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mx-auto md:mx-0"
        >
          {t.personalInfo.profileSummary}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {t.hero.contactMe}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href={`${basePath}/resume_walid.pdf`}
            download
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {t.hero.downloadCv}
            <Download className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 w-full max-w-[500px] relative z-0 flex justify-center items-center"
      >
        <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px]">
          <Image
            src={`${basePath}/profile.png`}
            alt="Walid BENMAAROUF"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
