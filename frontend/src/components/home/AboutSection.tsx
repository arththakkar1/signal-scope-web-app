import { Terminal, Users, Target } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-surface border-t border-border">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="mb-16">
          <p className="text-mono-sm text-text-muted uppercase tracking-widest mb-4">About Project</p>
          <h2 className="text-heading-xl text-ink tracking-tight max-w-2xl">
            Telling Real From Synthetic in the Age of Generative Media.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 prose prose-p:text-body-lg prose-p:text-text-secondary prose-p:leading-relaxed prose-headings:text-ink prose-headings:font-semibold max-w-none">
            <h3 className="text-heading-md mb-4 mt-0">What is SignalScope?</h3>
            <p className="mb-8">
              SignalScope is an open-source, AI-powered forensic tool designed to help users determine the authenticity of digital images. As generative AI becomes increasingly capable of producing photorealistic media, the need for accessible, reliable detection tools is more critical than ever.
            </p>
            
            <h3 className="text-heading-md mb-4">The Problem</h3>
            <p className="mb-8">
              The proliferation of synthetic media challenges our ability to trust digital evidence. Disinformation campaigns, synthetic fraud, and non-consensual deepfakes exploit this vulnerability. SignalScope aims to bridge this gap by providing a transparent, verifiable likelihood assessment.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-surface-subtle p-6 rounded-[12px] border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-ink" />
                <h4 className="font-semibold text-ink">Project Objective</h4>
              </div>
              <p className="text-body-sm text-text-secondary">
                To provide a responsible, transparent interface for state-of-the-art synthetic image detection models.
              </p>
            </div>

            <div className="bg-surface-subtle p-6 rounded-[12px] border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-ink" />
                <h4 className="font-semibold text-ink">Target Users</h4>
              </div>
              <p className="text-body-sm text-text-secondary">
                Journalists, fact-checkers, trust & safety teams, and concerned citizens navigating digital media.
              </p>
            </div>

            <div className="bg-surface-subtle p-6 rounded-[12px] border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Terminal className="w-5 h-5 text-ink" />
                <h4 className="font-semibold text-ink">Technology</h4>
              </div>
              <p className="text-body-sm text-text-secondary">
                Built with Next.js, React, Tailwind CSS, Django, and PyTorch (for underlying model inference).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
