import type { ReactNode } from "react";
import { ArrowLeft, Database, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

export function PortalHeader({
  title,
  subtitle,
  backHref = "/",
}: {
  title: string;
  subtitle: string;
  backHref?: string;
}) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-cyan-400/10 bg-[#020613]/95 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <Link href={backHref} className="text-white/50 transition-colors hover:text-white">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Link>
        <div className="text-center">
          <div className="text-xs font-black tracking-[0.18em] text-white">{title}</div>
          <div className="mt-0.5 text-[9px] tracking-wider text-cyan-300/50">{subtitle}</div>
        </div>
        <div className="h-5 w-5" aria-hidden="true" />
      </div>
    </header>
  );
}

export function EmptyState({
  title = "No records yet",
  body = "Connect an approved production data source to display records here.",
  icon = <Database className="h-6 w-6" />,
}: {
  title?: string;
  body?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-cyan-300/20 bg-cyan-300/[0.03] p-6 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
        {icon}
      </div>
      <h2 className="text-sm font-bold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-white/45">{body}</p>
    </div>
  );
}

export function PrivacyNote({ children = "No personal data is displayed until a verified, consented production source is connected." }: { children?: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3 text-[10px] leading-relaxed text-emerald-100/60">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
      <span>{children}</span>
    </div>
  );
}