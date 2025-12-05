"use client";

import { useLanguage } from "@/context/LanguageContext";
import { personalInfo } from "@/lib/data";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { ContactIllustration } from "./Illustrations";

export default function ContactSection() {
  const { t } = useLanguage();
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim();

  if (!formId) {
    return (
      <section id="contact" className="py-20 bg-secondary/10 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            {t.contact.title}
          </motion.h2>
          <div className="max-w-2xl mx-auto p-6 bg-background rounded-xl border shadow-sm space-y-3">
            <p className="text-lg font-semibold text-yellow-600">
              Contact form temporarily unavailable.
            </p>
            <p className="text-muted-foreground">
              Please email me at{" "}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-primary underline"
              >
                {personalInfo.email}
              </a>{" "}
              or reach out via{" "}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }

  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <section id="contact" className="py-20 bg-secondary/10 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6"
          >
            {t.contact.title}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto p-6 bg-background rounded-lg border shadow-sm"
          >
            <div className="w-32 h-32 mx-auto mb-6">
              <ContactIllustration />
            </div>
            <p className="text-xl text-green-600 font-semibold mb-2">
              {t.contact.successTitle}
            </p>
            <p className="text-muted-foreground">
              {t.contact.successMessage}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-secondary/10 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center"
        >
          {t.contact.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <ContactIllustration />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
          >
            <form className="space-y-6 bg-background p-6 rounded-xl border shadow-sm" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t.contact.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t.contact.namePlaceholder}
                  required
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t.contact.emailLabel}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t.contact.emailPlaceholder}
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={t.contact.messagePlaceholder}
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-sm text-red-500"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                {state.submitting ? t.contact.sendingButton : t.contact.sendButton}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
