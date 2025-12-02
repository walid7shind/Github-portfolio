"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 bg-secondary/10 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center"
        >
          {t.experience.title}
        </motion.h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative border-l border-gray-200 dark:border-gray-700 ml-4 md:ml-auto space-y-12"
        >
          {t.experience.list.map((exp, index) => (
            <motion.div key={index} variants={item} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                <span className="text-sm text-muted-foreground font-medium bg-background px-2 py-1 rounded border mt-1 sm:mt-0 w-fit">
                  {exp.dates}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4 text-primary font-medium">
                <Briefcase className="h-4 w-4" />
                <span>{exp.company}</span>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
