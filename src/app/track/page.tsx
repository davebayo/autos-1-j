'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { getWhatsAppUrl } from '@/lib/site-config';
import { Search, MapPin, CheckCircle, ExternalLink } from 'lucide-react';

const MOCK_TRACKING_DATA = {
  status: 'At Port of Origin',
  lastSyncDays: 2,
  vehicleName: '2020 Toyota Camry SE',
  vin: '2T1BR1234567890',
  milestones: [
    { id: 1, title: 'SOURCED (Canada)', date: 'Oct 12, 2023', completed: true },
    { id: 2, title: 'INSPECTED', date: 'Oct 15, 2023', completed: true },
    { id: 3, title: 'AT PORT OF ORIGIN (Halifax, NS)', date: 'Oct 20, 2023', completed: true },
    { id: 4, title: 'ON VESSEL (Atlantic RoRo)', date: 'Pending', completed: false },
    { id: 5, title: 'ARRIVED AT DESTINATION (Tin Can, NG)', date: 'Pending', completed: false },
    { id: 6, title: 'CLEARED CUSTOMS', date: 'Pending', completed: false },
    { id: 7, title: 'DELIVERED', date: 'Pending', completed: false },
  ]
};

export default function Track() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 border-b border-white/20 pb-4 text-center">
          <h1 className="font-sans font-bold text-4xl uppercase tracking-tighter mb-2">Telemetry Tracker</h1>
          <p className="font-mono text-sm text-gray-400">Radical transparency from Canada to Nigeria.</p>
        </div>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ENTER VIN OR SHIPMENT REF..."
                className="w-full bg-transparent border border-white/20 px-12 py-4 font-mono text-sm focus:outline-none focus:border-modfem-racingEmerald uppercase tracking-widest text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">LOCATE</Button>
          </div>
        </form>

        {hasSearched && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="border border-white/20 bg-white/5 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="font-sans font-bold text-2xl uppercase tracking-tighter">{MOCK_TRACKING_DATA.vehicleName}</h2>
                  <div className="font-mono text-xs text-gray-400 mt-1">VIN: {MOCK_TRACKING_DATA.vin}</div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 bg-black border border-white/20 px-3 py-1 font-mono text-xs mb-2">
                    <div className="w-2 h-2 rounded-none bg-modfem-racingEmerald animate-pulse"></div>
                    Synced {MOCK_TRACKING_DATA.lastSyncDays} days ago
                  </div>
                </div>
              </div>

              <div className="relative border-l border-white/20 ml-3 pl-8 space-y-8 py-4">
                {MOCK_TRACKING_DATA.milestones.map((milestone) => (
                  <div key={milestone.id} className="relative">
                    {/* Timeline node */}
                    <div className={`absolute -left-[41px] top-1 w-4 h-4 border-2 ${milestone.completed ? 'bg-modfem-racingEmerald border-modfem-racingEmerald' : 'bg-black border-white/20'}`}>
                      {milestone.completed && <CheckCircle size={12} className="text-black mx-auto mt-[1px]" />}
                    </div>

                    <h3 className={`font-mono text-sm font-bold uppercase tracking-wider mb-1 ${milestone.completed ? 'text-white' : 'text-gray-500'}`}>
                      {milestone.title}
                    </h3>
                    <div className="font-mono text-xs text-gray-500">{milestone.date}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <a href={getWhatsAppUrl(`Can I get a live photo/status update for VIN: ${MOCK_TRACKING_DATA.vin}?`)} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" fullWidth>
                    Ask Modfem for a Live Photo/Status Update on WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Independent Verification Box */}
            <div className="border border-modfem-signalAmber bg-modfem-signalAmber/5 p-6">
              <h3 className="font-sans font-bold text-xl uppercase tracking-tighter mb-4 text-modfem-signalAmber flex items-center gap-2">
                <MapPin size={20} />
                Independent Verification
              </h3>
              <p className="font-mono text-sm text-gray-300 mb-6">
                Verify this vehicle&apos;s history and Nigerian Customs status independently using official government portals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://vreg.gov.ng" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between border border-white/20 p-4 hover:bg-white/5 transition-colors font-mono text-sm">
                  <span>NIGERIA VREG</span>
                  <ExternalLink size={16} />
                </a>
                <a href={`https://vpic.nhtsa.dot.gov/decoder/Decoder/${MOCK_TRACKING_DATA.vin}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between border border-white/20 p-4 hover:bg-white/5 transition-colors font-mono text-sm">
                  <span>NHTSA DECODER</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
