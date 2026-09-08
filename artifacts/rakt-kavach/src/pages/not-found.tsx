import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[#020613] px-4 text-white">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-7 w-7 text-red-400" />
          <h1 className="text-xl font-bold">Page not found</h1>
        </div>
        <p className="mt-4 text-sm text-white/50">This route is not available in the current deployment.</p>
        <Link href="/" className="mt-6 inline-block text-sm font-bold text-cyan-300 hover:text-cyan-200">Return to gateway</Link>
      </div>
    </main>
  );
}