import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 bg-surface">
      <div className="container max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-ink font-bold tracking-tight mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-blue-600 to-indigo-500 text-white">
                <Activity className="h-4 w-4" />
              </div>
              <span>SIGNALSCOPE</span>
            </Link>
            <p className="text-body-sm text-text-muted">
              Telling Real From Synthetic in the Age of Generative Media.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-ink text-sm mb-4 tracking-tight">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#analyze" className="text-body-sm text-text-secondary hover:text-ink transition-colors">Analyze</Link></li>
              <li><Link href="#history" className="text-body-sm text-text-secondary hover:text-ink transition-colors">History</Link></li>
              <li><Link href="#about" className="text-body-sm text-text-secondary hover:text-ink transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-ink text-sm mb-4 tracking-tight">Account</h3>
            <ul className="space-y-3">
              <li><button className="text-body-sm text-text-secondary hover:text-ink transition-colors">Log In</button></li>
              <li><button className="text-body-sm text-text-secondary hover:text-ink transition-colors">Sign Up</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink text-sm mb-4 tracking-tight">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-body-sm text-text-secondary hover:text-ink transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-body-sm text-text-secondary hover:text-ink transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-text-muted">
            &copy; {new Date().getFullYear()} SignalScope. All rights reserved.
          </p>
          <p className="text-caption text-text-muted">
            A responsible likelihood assessment for real and AI-generated images.
          </p>
        </div>
      </div>
    </footer>
  );
}
