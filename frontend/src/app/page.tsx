"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type Prediction = {
  verdict: string;
  confidence: number;
  ai_probability: number;
  real_probability: number;
  is_trained_model: boolean;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
    setPrediction(null);
    setError(null);
    setPreviewUrl(selected ? URL.createObjectURL(selected) : null);
  }

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Choose an image before starting an analysis.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${apiUrl}/predict/`, {
        method: "POST",
        body: formData,
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.detail ?? "The analysis could not be completed.");
      }
      setPrediction(body as Prediction);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The analysis could not be completed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="shell">
      <header className="hero">
        <p className="eyebrow">SignalScope</p>
        <h1>Is this image likely real or AI-generated?</h1>
        <p className="intro">Upload an image for a likelihood assessment. Results are not proof of origin or authenticity.</p>
      </header>

      <section className="panel" aria-labelledby="upload-heading">
        <h2 id="upload-heading">Analyze an image</h2>
        <form onSubmit={analyze}>
          <label className="file-picker" htmlFor="image">
            <span>Choose an image</span>
            <input id="image" name="image" type="file" accept="image/*" onChange={selectFile} />
            <small>{file ? file.name : "PNG, JPEG, WebP, or another browser-supported image (max 10 MB)."}</small>
          </label>
          {previewUrl && <img className="preview" src={previewUrl} alt="Selected image preview" />}
          <button type="submit" disabled={isLoading}>{isLoading ? "Analyzing…" : "Analyze image"}</button>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
      </section>

      {prediction && (
        <section className="panel result" aria-live="polite" aria-labelledby="result-heading">
          <p className="eyebrow">Assessment</p>
          <h2 id="result-heading">{prediction.verdict}</h2>
          <p className="confidence">{prediction.confidence}% confidence</p>
          <div className="probabilities">
            <span>AI-generated likelihood: {prediction.ai_probability}%</span>
            <span>Real-image likelihood: {prediction.real_probability}%</span>
          </div>
          {!prediction.is_trained_model && <p className="notice">This development baseline has not yet loaded trained model weights. Do not use its result to make decisions.</p>}
        </section>
      )}
    </main>
  );
}
