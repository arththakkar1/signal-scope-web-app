import { ShieldCheck, Eye, Activity, FileWarning } from "lucide-react";

export function InformationSection() {
  return (
    <section id="working" className="py-24 bg-surface-subtle border-t border-border">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-heading-xl text-ink tracking-tight mb-4">How SignalScope Works</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Understanding the process behind the likelihood assessment and how to interpret the results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-surface border border-border p-8 rounded-[16px] shadow-1 flex flex-col items-start hover:shadow-2 transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-heading-sm font-semibold text-ink mb-3">1. Upload & Analyze</h3>
            <p className="text-body-md text-text-secondary">
              Submit an image for analysis. Our system preprocesses the file and extracts raw pixel data while stripping metadata to focus purely on visual signals.
            </p>
          </div>

          <div className="bg-surface border border-border p-8 rounded-[16px] shadow-1 flex flex-col items-start hover:shadow-2 transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-heading-sm font-semibold text-ink mb-3">2. Calculate Confidence</h3>
            <p className="text-body-md text-text-secondary">
              The detection model runs the data through a neural network trained on both pristine photographs and AI-generated media to calculate a calibrated probability score.
            </p>
          </div>

          <div className="bg-surface border border-border p-8 rounded-[16px] shadow-1 flex flex-col items-start hover:shadow-2 transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-heading-sm font-semibold text-ink mb-3">3. Generate Evidence</h3>
            <p className="text-body-md text-text-secondary">
              If supported, the system generates an attribution heatmap, highlighting the specific spatial regions or frequency artifacts that influenced the final verdict.
            </p>
          </div>

          <div className="bg-surface border border-border p-8 rounded-[16px] shadow-1 flex flex-col items-start hover:shadow-2 transition-shadow">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-6">
              <FileWarning className="w-6 h-6" />
            </div>
            <h3 className="text-heading-sm font-semibold text-ink mb-3">Responsible AI</h3>
            <p className="text-body-md text-text-secondary">
              SignalScope provides a likelihood assessment, not absolute proof. The tool is designed to assist human judgment, not replace it. Results may occasionally be incorrect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
