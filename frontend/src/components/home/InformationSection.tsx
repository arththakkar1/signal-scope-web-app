"use client";

import { motion } from "motion/react";
import { ShieldCheck, Eye, Activity, FileWarning, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Upload & Analyze",
    description:
      "Submit an image for analysis. Our system preprocesses the file and extracts raw pixel data while stripping metadata to focus purely on visual signals.",
    accent: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    number: "02",
    icon: Activity,
    title: "Calculate Confidence",
    description:
      "The detection model runs data through a neural network trained on both pristine photographs and AI-generated media to calculate a calibrated probability score.",
    accent: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    number: "03",
    icon: Eye,
    title: "Generate Evidence",
    description:
      "If supported, the system generates an attribution heatmap, highlighting the specific spatial regions or frequency artifacts that influenced the final verdict.",
    accent: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    number: "04",
    icon: FileWarning,
    title: "Responsible AI",
    description:
      "SignalScope provides a likelihood assessment, not absolute proof. The tool is designed to assist human judgment, not replace it.",
    accent: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function InformationSection() {
  return (
    <section
      id="working"
      className="min-h-screen py-24 bg-surface-subtle border-t border-border flex flex-col justify-center overflow-hidden"
    >
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-mono-sm text-text-muted uppercase tracking-[0.2em] mb-4">
            How it works
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-display-lg md:text-display-xl font-bold text-ink tracking-tight max-w-xl leading-none">
              The Signal<br />
              <span className="text-text-secondary font-light">Behind the Image</span>
            </h2>
            <p className="text-body-lg text-text-secondary max-w-sm md:text-right">
              Four stages of forensic analysis delivering a calibrated, transparent verdict.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border shadow-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                className="group relative bg-surface p-8 flex flex-col gap-6 cursor-default"
              >
                {/* Number */}
                <span className="text-[80px] font-black leading-none text-border group-hover:text-text-muted/30 transition-colors duration-500 select-none absolute top-4 right-6">
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${step.iconColor}`} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-3 flex-1">
                  <h3 className="text-heading-sm font-semibold text-ink">{step.title}</h3>
                  <p className="text-body-md text-text-secondary leading-relaxed">{step.description}</p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${step.accent} transition-all duration-500 ease-out`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: "ResNet-18", label: "Detection Architecture" },
            { value: "CIFAKE", label: "Training Dataset" },
            { value: "<2s", label: "Avg. Processing Time" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface px-8 py-6 text-center">
              <p className="text-heading-lg font-bold text-ink tracking-tight">{stat.value}</p>
              <p className="text-caption text-text-muted mt-1 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
