import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DemoModeRibbon } from "@/components/DemoModeRibbon";
import { IS_DEMO_MODE } from "@/lib/site-config";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Modfem Autos Canada",
  description: "Vehicle Sourcing & Export Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-modfem-obsidian text-white min-h-screen flex flex-col`}
      >
        {IS_DEMO_MODE && <DemoModeRibbon />}

        <header className="border-b border-white/10 bg-modfem-obsidian sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-sans font-bold text-xl tracking-tighter uppercase flex items-center gap-2">
              <div className="w-3 h-3 bg-modfem-racingEmerald"></div>
              Modfem Autos
            </Link>
            <nav className="hidden md:flex gap-6 font-mono text-sm tracking-wider uppercase">
              <Link href="/" className="hover:text-modfem-racingEmerald transition-colors">Showroom</Link>
              <Link href="/inventory" className="hover:text-modfem-racingEmerald transition-colors">Ledger</Link>
              <Link href="/track" className="hover:text-modfem-racingEmerald transition-colors">Telemetry</Link>
              <Link href="/request" className="hover:text-modfem-racingEmerald transition-colors border border-white/20 px-3 py-1 hover:border-modfem-racingEmerald">Source / Swap</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="border-t border-white/10 py-8 mt-12">
          <div className="container mx-auto px-4 text-center font-mono text-xs text-white/50">
            <p>© {new Date().getFullYear()} Modfem Autos Canada. All systems nominal.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
