import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Prediction = {
  verdict: string;
  confidence: number;
  ai_probability: number;
  real_probability: number;
  is_trained_model: boolean;
};

interface ResultSectionProps {
  prediction: Prediction | null;
  imageUrl: string | null;
}

export function ResultSection({ prediction, imageUrl }: ResultSectionProps) {
  if (!prediction) return null;

  const isAI = prediction.ai_probability > 50;

  return (
    <section id="results" className="min-h-screen py-16 md:py-24 border-t border-border bg-surface flex flex-col justify-center">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="text-mono-sm text-text-muted uppercase tracking-widest mb-4">Analysis Complete</p>
          <h2 className="text-display-lg text-ink tracking-tight mb-2 uppercase">{prediction.verdict}</h2>
          <div className="flex items-center justify-center gap-2 text-heading-md font-bold mb-4">
            <span className="text-text-secondary">Confidence</span>
            <span className={cn(isAI ? "text-error" : "text-success")}>{prediction.confidence}%</span>
          </div>

          <div className="w-full max-w-md mx-auto h-3 bg-surface-subtle rounded-full overflow-hidden border border-border shadow-inner">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000 ease-out",
                isAI ? "bg-error" : "bg-success"
              )}
              style={{ width: `${prediction.confidence}%`, transform: 'scaleX(0)', animation: 'fillBar 1s ease-out forwards' }}
            />
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes fillBar { to { transform: scaleX(1); transform-origin: left; } }
          `}} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-[900px] mx-auto mt-16">
          <div className="rounded-[12px] border border-border overflow-hidden shadow-1 bg-surface-subtle p-2">
            {imageUrl && (
              <div className="relative w-full h-[320px] rounded-[8px] overflow-hidden border border-border/50">
                <img
                  src={imageUrl}
                  alt="Analyzed image"
                  className="absolute inset-0 w-full h-full object-contain bg-surface-subtle"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-heading-sm font-semibold border-b border-border pb-3 mb-4">Why SignalScope thinks this</h3>
              <p className="text-body-md text-text-secondary mb-4 leading-relaxed">
                The model analyzed pixel-level patterns, frequency artifacts, and structural inconsistencies commonly found in generated media.
              </p>
            </div>

            <div>
              <h3 className="text-heading-sm font-semibold border-b border-border pb-3 mb-4">Technical Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-caption text-text-muted mb-1">Model Version</p>
                  <p className="text-mono-sm text-ink">v1.0-baseline</p>
                </div>
                <div>
                  <p className="text-caption text-text-muted mb-1">Processing Time</p>
                  <p className="text-mono-sm text-ink">1.24s</p>
                </div>
                <div>
                  <p className="text-caption text-text-muted mb-1">AI Probability</p>
                  <p className="text-mono-sm text-ink">{prediction.ai_probability}%</p>
                </div>
                <div>
                  <p className="text-caption text-text-muted mb-1">Real Probability</p>
                  <p className="text-mono-sm text-ink">{prediction.real_probability}%</p>
                </div>
              </div>
            </div>

            {!prediction.is_trained_model && (
              <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg flex gap-3 mt-4">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                <p className="text-sm text-warning font-medium leading-relaxed">
                  This development baseline has not yet loaded trained model weights. Do not use its result to make decisions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
