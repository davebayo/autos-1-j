import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console | Modfem Autos",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto border border-red-500 bg-red-500/10 p-8 text-center">
        <h1 className="font-sans font-bold text-3xl uppercase tracking-tighter mb-4 text-red-500">Protected Operator Console</h1>
        <p className="font-mono text-sm mb-8">
          Access requires valid x-admin-passcode header. This page is not indexed.
        </p>

        <div className="bg-black border border-white/20 p-6 text-left">
          <h2 className="font-sans font-bold text-xl uppercase tracking-tighter mb-4 text-white">Incoming Mandates</h2>
          <div className="font-mono text-xs text-gray-400 border border-white/10 p-4 mb-4 bg-white/5">
             <div className="flex justify-between mb-2 pb-2 border-b border-white/10">
               <span className="text-modfem-racingEmerald">[MODE 01 // SOURCING]</span>
               <span>Received: Today 10:42 AM</span>
             </div>
             <div className="grid grid-cols-2 gap-2 text-white">
                <div><span className="text-gray-500">Target:</span> 2021 Lexus RX 350</div>
                <div><span className="text-gray-500">Budget:</span> ₦45,000,000</div>
                <div><span className="text-gray-500">Port:</span> Tin Can</div>
             </div>
          </div>
          <div className="font-mono text-xs text-gray-400 border border-white/10 p-4 bg-white/5">
             <div className="flex justify-between mb-2 pb-2 border-b border-white/10">
               <span className="text-modfem-racingEmerald">[MODE 02 // SWAP]</span>
               <span>Received: Yesterday 4:15 PM</span>
             </div>
             <div className="grid grid-cols-2 gap-2 text-white mb-2 pb-2 border-b border-white/10">
                <div><span className="text-gray-500">Trade-in:</span> 2015 Toyota Corolla</div>
                <div><span className="text-gray-500">Condition:</span> Minor scratches, 120k miles</div>
             </div>
             <div className="grid grid-cols-2 gap-2 text-white">
                <div><span className="text-gray-500">Target:</span> 2020 Toyota Camry SE</div>
                <div><span className="text-gray-500">Upgrade Budget:</span> ₦5,000,000</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
