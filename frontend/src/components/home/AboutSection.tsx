"use client";

import { motion } from "motion/react";
import { Terminal, Users, Target, ExternalLink } from "lucide-react";

const cards = [
  {
    icon: Target,
    title: "Project Objective",
    body: "To provide a responsible, transparent interface for state-of-the-art synthetic image detection models.",
    tag: "Mission",
    accent: "bg-blue-600",
  },
  {
    icon: Users,
    title: "Target Users",
    body: "Journalists, fact-checkers, trust & safety teams, and concerned citizens navigating digital media.",
    tag: "Audience",
    accent: "bg-indigo-600",
  },
  {
    icon: Terminal,
    title: "Technology",
    body: "Built with Next.js, React, Tailwind CSS, Django, and PyTorch for underlying model inference.",
    tag: "Stack",
    accent: "bg-violet-600",
  },
];

const techs = ["Next.js", "React 19", "Tailwind CSS v4", "Django 5", "PyTorch", "ResNet-18"];

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen py-24 bg-surface border-t border-border flex flex-col justify-center overflow-hidden"
    >
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">

        {/* Top label */}
        <motion.p
          className="text-mono-sm text-text-muted uppercase tracking-[0.2em] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Project
        </motion.p>

        {/* Split hero row */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-12 mb-20">
          <motion.h2
            className="text-display-lg md:text-display-xl font-bold text-ink tracking-tight leading-none flex-1"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Telling Real<br />
            <span className="text-text-secondary font-light">From Synthetic.</span>
          </motion.h2>

          <motion.div
            className="lg:max-w-[420px] flex flex-col gap-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-body-lg text-text-secondary leading-relaxed">
              SignalScope is an open-source, AI-powered forensic tool designed to help users
              determine the authenticity of digital images. As generative AI becomes increasingly
              capable of producing photorealistic media, the need for accessible, reliable
              detection tools is more critical than ever.
            </p>
            <p className="text-body-md text-text-secondary leading-relaxed">
              The proliferation of synthetic media challenges our ability to trust digital evidence.
              Disinformation campaigns, synthetic fraud, and non-consensual deepfakes exploit this
              vulnerability. SignalScope bridges this gap with transparent, verifiable likelihood assessment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink border border-border rounded-full px-4 py-2 hover:bg-surface-hover transition-colors"
              >

                View on GitHub
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted border border-border rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open Source
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-surface-subtle border border-border rounded-2xl p-7 flex flex-col gap-5 overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${card.accent} rounded-2xl`} />

                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                  </div>
                  <span className="text-caption text-text-muted uppercase tracking-widest border border-border rounded-full px-3 py-1">
                    {card.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-heading-sm font-semibold text-ink mb-2">{card.title}</h3>
                  <p className="text-body-md text-text-secondary leading-relaxed">{card.body}</p>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full ${card.accent} transition-all duration-500 ease-out`} />
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack ticker */}
        <motion.div
          className="border border-border rounded-2xl bg-surface-subtle overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="px-8 py-5 border-b border-border flex items-center justify-between">
            <p className="text-caption text-text-muted uppercase tracking-widest">Technology Stack</p>
            <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
          </div>
          <div className="px-8 py-5 flex flex-wrap gap-3">
            {techs.map((tech) => (
              <span
                key={tech}
                className="text-body-sm font-medium text-ink bg-surface border border-border rounded-full px-4 py-1.5 hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
