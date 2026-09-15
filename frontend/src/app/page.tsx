"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ResultSection } from "@/components/home/ResultSection";
import { InformationSection } from "@/components/home/InformationSection";
import { AboutSection } from "@/components/home/AboutSection";

type Prediction = {
  verdict: string;
  confidence: number;
  ai_probability: number;
  real_probability: number;
  is_trained_model: boolean;
};

type UsageInfo = {
  used: number;
  limit: number;
  authenticated: boolean;
  username: string | null;
};

type BackendStatus = "checking" | "connected" | "disconnected";
type AuthTab = "login" | "signup";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>("checking");

  // Auth & usage state
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState<AuthTab>("login");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // ── Authenticated Fetch Interceptor with Automatic Token Refresh ──
  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}, overrideToken?: string) => {
      const headers = new Headers(options.headers || {});
      const tokenToUse = overrideToken || accessToken;
      if (tokenToUse) {
        headers.set("Authorization", `Bearer ${tokenToUse}`);
      }

      let response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
      });

      if (response.status === 401 && !url.includes("/auth/")) {
        try {
          const refreshRes = await fetch(`${apiUrl}/auth/refresh/`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            if (refreshData.access) {
              setAccessToken(refreshData.access);
              headers.set("Authorization", `Bearer ${refreshData.access}`);
              response = await fetch(url, {
                ...options,
                headers,
                credentials: "include",
              });
            }
          } else {
            setAccessToken(null);
          }
        } catch {
          setAccessToken(null);
        }
      }

      return response;
    },
    [accessToken]
  );

  // ── Fetch usage status ──
  const fetchUsage = useCallback(async (overrideToken?: string) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/usage/`, {}, overrideToken);
      if (res.ok) {
        const data = await res.json();
        setUsage(data as UsageInfo);
      }
    } catch {
      // silent
    }
  }, [fetchWithAuth]);

  // ── Check backend + fetch usage on mount ──
  useEffect(() => {
    let isMounted = true;

    async function checkBackend() {
      try {
        const response = await fetch(`${apiUrl}/ping/`, { credentials: "include" });
        if (isMounted) {
          setBackendStatus(response.ok ? "connected" : "disconnected");
          if (response.ok) fetchUsage();
        }
      } catch {
        if (isMounted) setBackendStatus("disconnected");
      }
    }

    checkBackend();
    return () => {
      isMounted = false;
    };
  }, [fetchUsage]);

  // ── File selection ──
  function selectFile(selectedFile: File) {
    setFile(selectedFile);
    setPrediction(null);
    setError(null);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  }

  // ── Analyze Image ──
  async function analyzeImage() {
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetchWithAuth(`${apiUrl}/predict/`, {
        method: "POST",
        body: formData,
      });
      const body = await response.json();

      if (response.status === 403 && body.code === "LIMIT_REACHED") {
        setShowAuthModal(true);
        setAuthTab("signup");
        setAuthError(null);
        return;
      }

      if (!response.ok) {
        throw new Error(body.detail ?? "The analysis could not be completed.");
      }
      setPrediction(body as Prediction);
      fetchUsage(); 
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The analysis could not be completed."
      );
    } finally {
      setIsLoading(false);
    }
  }

  // ── Auth submit ──
  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = (formData.get("username") as string)?.trim();
    const password = formData.get("password") as string;

    if (!username || !password) {
      setAuthError("Username and password are required.");
      setAuthLoading(false);
      return;
    }

    const endpoint = authTab === "login" ? "auth/login" : "auth/signup";

    try {
      const res = await fetch(`${apiUrl}/${endpoint}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      const body = await res.json();

      if (!res.ok) {
        setAuthError(body.detail ?? "Something went wrong.");
        return;
      }

      if (body.access) {
        setAccessToken(body.access);
      }

      setShowAuthModal(false);
      setAuthError(null);
      await fetchUsage(body.access);
    } catch {
      setAuthError("Could not connect to the server.");
    } finally {
      setAuthLoading(false);
    }
  }

  // ── Logout ──
  async function handleLogout() {
    try {
      await fetch(`${apiUrl}/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // silent
    }
    setAccessToken(null);
    setUsage(null);
    setPrediction(null);
    fetchUsage();
  }

  const limitReached = usage ? (!usage.authenticated && usage.used >= usage.limit) : false;

  return (
    <>
      <Navbar 
        usage={usage} 
        onLoginClick={() => { setAuthTab("login"); setAuthError(null); setShowAuthModal(true); }}
        onSignupClick={() => { setAuthTab("signup"); setAuthError(null); setShowAuthModal(true); }}
        onLogoutClick={handleLogout}
      />
      
      <main className="flex-1 w-full flex flex-col">
        <Hero 
          isLoading={isLoading}
          error={error}
          usageLimitReached={limitReached}
          onFileSelect={selectFile}
          onAnalyze={analyzeImage}
          fileName={file?.name}
        />
        
        <div id="results">
          <ResultSection 
            prediction={prediction}
            imageUrl={previewUrl}
          />
        </div>
        
        <InformationSection />
        
        <AboutSection />
      </main>

      <Footer />

      {/* ── Auth Modal ── */}
      {showAuthModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowAuthModal(false)}
        >
          <div 
            className="relative bg-surface/95 backdrop-blur-xl border border-border shadow-[0_24px_64px_rgba(25,45,75,0.18)] rounded-2xl w-full max-w-[420px] p-8 animate-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-text-muted hover:text-ink transition-colors p-1 rounded-md hover:bg-surface-hover"
              onClick={() => setShowAuthModal(false)}
              aria-label="Close"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex items-center justify-center mb-4 shadow-1">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-heading-md text-ink tracking-tight mb-2">
                {authTab === "login" ? "Welcome back" : "Free limit reached"}
              </h2>
              <p className="text-body-sm text-text-secondary">
                {authTab === "login" 
                  ? "Log in to your account to continue analyzing images." 
                  : `You've used all ${usage?.limit ?? 3} free analyses. Create an account to continue with unlimited access.`}
              </p>
            </div>

            <div className="flex bg-surface-subtle p-1 rounded-[10px] mb-6">
              <button
                className={cn(
                  "flex-1 py-2 text-sm font-semibold rounded-lg transition-all",
                  authTab === "login" ? "bg-surface text-blue-700 shadow-1" : "text-text-secondary hover:text-ink"
                )}
                onClick={() => { setAuthTab("login"); setAuthError(null); }}
                type="button"
              >
                Log in
              </button>
              <button
                className={cn(
                  "flex-1 py-2 text-sm font-semibold rounded-lg transition-all",
                  authTab === "signup" ? "bg-surface text-blue-700 shadow-1" : "text-text-secondary hover:text-ink"
                )}
                onClick={() => { setAuthTab("signup"); setAuthError(null); }}
                type="button"
              >
                Sign up
              </button>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleAuth}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="auth-username" className="text-sm font-semibold text-ink">Username</label>
                <input
                  id="auth-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  autoFocus
                  required
                  className="w-full bg-surface-subtle border border-border rounded-[10px] px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="auth-password" className="text-sm font-semibold text-ink">Password</label>
                <input
                  id="auth-password"
                  name="password"
                  type="password"
                  autoComplete={authTab === "signup" ? "new-password" : "current-password"}
                  minLength={authTab === "signup" ? 6 : undefined}
                  required
                  className="w-full bg-surface-subtle border border-border rounded-[10px] px-4 py-2.5 text-ink focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              
              {authError && (
                <div className="bg-error/10 text-error text-sm px-3 py-2 rounded-lg border border-error/20" role="alert">
                  {authError}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={authLoading}
                className="mt-2 w-full bg-ink hover:bg-black text-inverse font-semibold py-3 rounded-[10px] shadow-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authLoading
                  ? "Please wait…"
                  : authTab === "login"
                    ? "Log in"
                    : "Create account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
