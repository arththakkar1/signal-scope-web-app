import { ChangeEvent, FormEvent } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadSectionProps {
  file: File | null;
  previewUrl: string | null;
  error: string | null;
  isLoading: boolean;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: (e: FormEvent<HTMLFormElement>) => void;
  usageLimitReached: boolean;
}

export function UploadSection({
  file,
  previewUrl,
  error,
  isLoading,
  onFileSelect,
  onAnalyze,
  usageLimitReached,
}: UploadSectionProps) {
  return (
    <section id="analyze" className="py-16 md:py-24 bg-surface-subtle">
      <div className="container max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="text-heading-xl text-ink tracking-tight mb-4">Analyze an Image</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            Upload an image for a likelihood assessment. Results are not proof of origin or authenticity.
          </p>
        </div>

        <div className="bg-surface border border-border shadow-2 rounded-[16px] p-6 md:p-10 max-w-3xl mx-auto">
          <form onSubmit={onAnalyze} className="flex flex-col gap-8">
            {!previewUrl ? (
              <label 
                htmlFor="image-upload" 
                className={cn(
                  "border-2 border-dashed border-border-strong rounded-[12px] p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:bg-surface-subtle hover:border-blue-400 group focus-within:ring-2 focus-within:ring-ink focus-within:ring-offset-2",
                  error && "border-error bg-error/5 hover:border-error"
                )}
              >
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <span className="text-heading-sm text-ink mb-2">Drop image here</span>
                <span className="text-body-sm text-text-muted mb-6">JPG, PNG, WEBP · up to 10 MB</span>
                <div className="bg-surface border border-border text-ink text-sm font-semibold px-4 py-2 rounded-md shadow-1">
                  Choose Image
                </div>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={onFileSelect}
                  className="sr-only"
                />
              </label>
            ) : (
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/2">
                  <div className="rounded-[12px] border border-border overflow-hidden bg-surface-subtle shadow-1 relative group">
                    <img
                      src={previewUrl}
                      alt="Selected image preview"
                      className="w-full h-auto max-h-[340px] object-contain"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-ink font-semibold mb-1">
                      <ImageIcon className="w-4 h-4 text-text-muted" />
                      <span className="truncate">{file?.name}</span>
                    </div>
                    <p className="text-caption text-text-muted">
                      {(file?.size ? file.size / (1024 * 1024) : 0).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button 
                      type="submit" 
                      disabled={isLoading || usageLimitReached}
                      className={cn(
                        "w-full bg-ink hover:bg-black text-inverse text-body-lg font-semibold py-3 rounded-lg shadow-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                        usageLimitReached && "bg-error hover:bg-error/90 text-white"
                      )}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-inverse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </span>
                      ) : usageLimitReached ? (
                        "Free Limit Reached"
                      ) : (
                        "Analyze Image"
                      )}
                    </button>
                    
                    <label 
                      htmlFor="image-replace" 
                      className="w-full bg-surface hover:bg-surface-subtle border border-border text-ink text-body-md font-semibold py-3 rounded-lg text-center cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-ink focus-within:ring-offset-2"
                    >
                      Replace Image
                      <input
                        id="image-replace"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={onFileSelect}
                        className="sr-only"
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg text-sm flex items-start gap-2" role="alert">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
