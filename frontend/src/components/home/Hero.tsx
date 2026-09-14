import { ChangeEvent, DragEvent, useState } from "react";
import { FileSearch, UploadCloud, ArrowDown } from "lucide-react";
import { TypewriterRotate } from "@/components/ui/typewriter-rotate";
import { cn } from "@/lib/utils";
import { StarsBackground } from "../animate-ui/components/backgrounds/stars";
import ScrollToLink from "@/components/ScrollToLink";
import { toast } from "sonner";

interface HeroProps {
  isLoading?: boolean;
  error?: string | null;
  usageLimitReached?: boolean;
  onFileSelect?: (file: File) => void;
  onAnalyze?: () => void;
  fileName?: string;
}

export function Hero({ isLoading = false, error = null, usageLimitReached = false, onFileSelect, onAnalyze, fileName }: HeroProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleAnalyzeClick = () => {
    if (!fileName) {
      toast.error("Please upload an image first", {
        description: "Drop or select a JPG, PNG, or WEBP file above.",
      });
      return;
    }
    onAnalyze?.();
  };

  const words = [
    "Synthetic",
    "AI-Generated",
    "Fabricated",
    "Artificial",
    "Generated",
    "Deepfake",
    "Counterfeit",
    "Fake",
    "Digital",
    "Manipulated",
    "Machine-Made",
    "Simulated",
    "Forged",
    "Engineered",
    "Altered",
    "Rendered",
    "Computer-Generated",
    "Cloned",
    "Imitated",
    "Mimicked",
    "Duplicated",
    "Invented",
    "Designed",
    "Produced",
    "Created",
    "Constructed",
    "Built",
    "Modeled",
    "Generated AI",
    "Neural Art",
    "Algorithmic"
  ];

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (usageLimitReached || isLoading) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
    // reset value so the same file can be selected again if needed
    e.target.value = '';
  };

  return (
    <section id="hero" className="min-h-screen py-20 md:py-28 relative overflow-hidden flex flex-col items-center justify-center text-center px-4 w-full">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-bg to-bg -z-20" />
      <StarsBackground
        className="absolute inset-0 -z-10 text-black dark:text-white"
        starColor="currentColor"
        pointerEvents={false}
      />
      
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-400 mb-8 backdrop-blur-sm">
        <FileSearch className="h-3.5 w-3.5" />
        <span>SignalScope</span>
      </div>
      
      <div className="mb-6 w-full max-w-[1000px] flex flex-col items-center">
        <h1 className="text-display-lg md:text-display-xl tracking-tight font-bold text-ink w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <div className="shrink-0 whitespace-nowrap">
            Telling Real From
          </div>
          <div className="text-blue-600 flex items-center justify-center md:justify-start">
            <TypewriterRotate words={words} />
            <span className="w-[4px] h-[0.9em] bg-blue-600 ml-1 rounded-sm animate-[pulse_1s_ease-in-out_infinite]" />
          </div>
        </h1>
      </div>
      
      <p className="text-body-lg text-text-secondary max-w-[600px] mx-auto mb-[30px] text-balance leading-relaxed">
        Analyze an image and receive a calibrated AI-generated probability with visual evidence. See the signal behind the image.
      </p>
      
      <div className="w-full max-w-[500px] mx-auto mb-[40px]">
        <label
          htmlFor="hero-image-upload"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "block border-[2px] border-dashed rounded-[12px] p-[40px_20px] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative group overflow-hidden",
            isDragging 
              ? "border-blue-600 bg-[#E3F2FD]" 
              : "border-[#DDDDDD] bg-[#F9F9F9] hover:border-[#1976d2] hover:bg-[#F0F7FF] dark:bg-surface-subtle dark:border-border dark:hover:border-blue-500 dark:hover:bg-blue-900/20",
            error && "border-error bg-error/5 hover:border-error",
            (isLoading || usageLimitReached) && "opacity-60 cursor-not-allowed pointer-events-none"
          )}
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
               <svg className="animate-spin mb-4 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span className="text-heading-sm text-ink">Analyzing Image...</span>
            </div>
          ) : (
            <>
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform duration-300",
                isDragging || fileName ? "bg-blue-600 text-white scale-110" : "bg-blue-50 text-blue-600 group-hover:scale-110 dark:bg-blue-900/40 dark:text-blue-400"
              )}>
                <UploadCloud className="w-6 h-6" />
              </div>
              {fileName ? (
                <>
                  <span className="text-heading-sm text-ink mb-2">Image Selected</span>
                  <span className="text-body-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">{fileName}</span>
                </>
              ) : (
                <>
                  <span className="text-heading-sm text-ink mb-2">Drop your image here or click to browse</span>
                  <span className="text-body-sm text-text-muted">Supports: JPG, PNG, WEBP</span>
                </>
              )}
              
              {usageLimitReached && (
                <div className="mt-4 bg-error text-white text-xs font-bold px-3 py-1 rounded-full">
                  Free Limit Reached
                </div>
              )}
            </>
          )}
          
          <input
            id="hero-image-upload"
            name="image"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleChange}
            className="sr-only"
            disabled={isLoading || usageLimitReached}
          />
        </label>
        
        {!isLoading && (
          fileName ? (
            <ScrollToLink to="#results" className="mt-6">
              <button
                onClick={handleAnalyzeClick}
                disabled={isLoading || usageLimitReached}
                className={cn(
                  "group relative max-w-full inline-flex items-center justify-center gap-3 rounded-full text-white font-semibold py-4 px-5 text-lg shadow-lg overflow-hidden transition-all duration-300",
                  usageLimitReached
                    ? "bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-blue-700 hover:bg-black dark:hover:bg-white dark:hover:text-black"
                )}
              >
                <span className="relative flex shrink-0 items-center justify-center w-[30px] h-[30px] rounded-full bg-white text-blue-800 group-hover:text-black dark:group-hover:text-blue-800 overflow-hidden transition-colors duration-300">
                  <ArrowDown className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-y-[150%]" strokeWidth={3} />
                  <ArrowDown className="absolute w-4 h-4 transition-transform duration-300 ease-in-out delay-100 -translate-y-[150%] group-hover:translate-y-0" strokeWidth={3} />
                </span>
                Analyze Image
              </button>
            </ScrollToLink>
          ) : (
            <button
              onClick={handleAnalyzeClick}
              className="group relative mt-6 max-w-full inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 text-white font-semibold py-4 px-5 text-lg shadow-lg overflow-hidden transition-all duration-300 hover:bg-blue-600/80"
            >
              <span className="relative flex shrink-0 items-center justify-center w-[30px] h-[30px] rounded-full bg-white text-blue-800 overflow-hidden">
                <ArrowDown className="w-4 h-4" strokeWidth={3} />
              </span>
              Analyze Image
            </button>
          )
        )}
        
        {error && (
          <div className="mt-4 bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg text-sm flex items-start gap-2 text-left" role="alert">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>{error}</p>
          </div>
        )}
      </div>

    </section>
  );
}
