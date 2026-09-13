import { FileSearch } from "lucide-react";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export function Hero() {
  const words = [
    {
      text: "Telling",
      className: "text-ink",
    },
    {
      text: "Real",
      className: "text-ink",
    },
    {
      text: "From",
      className: "text-ink",
    },
    {
      text: "Synthetic.",
      className: "text-blue-600",
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden flex flex-col items-center text-center px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-bg to-bg -z-10" />
      
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-8 backdrop-blur-sm">
        <FileSearch className="h-3.5 w-3.5" />
        <span>Signal Analysis</span>
      </div>
      
      <div className="mb-6 max-w-[800px] flex flex-col items-center">
        <TypewriterEffect 
          words={words} 
          className="text-display-lg md:text-display-xl tracking-tight text-balance"
          cursorClassName="ml-2 h-[48px] md:h-[56px] bg-blue-600"
        />
      </div>
      
      <p className="text-body-lg text-text-secondary max-w-[600px] mx-auto mb-10 text-balance leading-relaxed">
        Analyze an image and receive a calibrated AI-generated probability with visual evidence. See the signal behind the image.
      </p>
      
      <button 
        onClick={() => {
          document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-ink hover:bg-black text-inverse text-body-lg font-semibold px-8 py-4 rounded-xl shadow-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] transition-all"
      >
        Analyze an Image
      </button>

      <div className="mt-16 relative w-full max-w-[800px] aspect-[21/9] rounded-2xl border border-border bg-surface shadow-2 overflow-hidden flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNFMkU4RjAiLz48L3N2Zz4=')] bg-[length:20px_20px]">
         <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
         <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-border-strong" />
              <span className="text-mono-sm text-text-muted uppercase tracking-widest">Image Uploaded</span>
              <div className="h-[1px] w-12 bg-border-strong" />
            </div>
            <div className="flex items-center gap-4 text-ink font-semibold">
              <div className="w-8 h-8 rounded-full border border-border-strong flex items-center justify-center shadow-1 bg-surface">1</div>
              <div className="w-16 h-[2px] bg-border" />
              <div className="w-8 h-8 rounded-full border border-border-strong flex items-center justify-center shadow-1 bg-surface">2</div>
              <div className="w-16 h-[2px] bg-border" />
              <div className="w-8 h-8 rounded-full border border-blue-500 bg-blue-50 text-blue-700 flex items-center justify-center shadow-1">3</div>
            </div>
            <span className="text-caption text-text-secondary mt-2">Computing Confidence</span>
         </div>
      </div>
    </section>
  );
}
