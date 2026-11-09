import { MonroneyCard } from '@/components/MonroneyCard';
import { Button } from '@/components/Button';
import { getWhatsAppUrl } from '@/lib/site-config';
import { calculateLandedCost, formatNGN } from '@/lib/pricing';
import Image from 'next/image';

const FEATURED_VEHICLES = [
  {
    id: 'kia-sportage',
    name: '2013 Kia Sportage Upgraded',
    badge: 'VERIFIED SOURCED',
    badgeColor: 'emerald' as const,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop',
    costBreakdown: {
      basePriceCAD: 4500,
      exchangeRateCADtoNGN: 1100,
      inspectionAndTowingCAD: 200,
      freightCAD: 1800,
      customsDutyAndLevyNGN: 3500000,
      portClearingNGN: 500000,
      sourcingFeeNGN: 350000,
    },
    isVerified: true
  },
  {
    id: 'mb-gla-250',
    name: 'Mercedes-Benz GLA 250 4MATIC',
    badge: '[VERIFY] INDICATIVE ESTIMATE',
    badgeColor: 'amber' as const,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2000&auto=format&fit=crop',
    costBreakdown: {
      basePriceCAD: 28000,
      exchangeRateCADtoNGN: 1100,
      inspectionAndTowingCAD: 250,
      freightCAD: 2200,
      customsDutyAndLevyNGN: 9500000,
      portClearingNGN: 700000,
      sourcingFeeNGN: 500000,
    },
    isVerified: false
  }
];

const ARCHIVE_VEHICLES = [
  {
    id: 'honda-civic',
    name: '2018 Honda Civic EX',
    status: 'DELIVERED',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=400&auto=format&fit=crop', // Low res
    deliveredTo: 'Lagos, NG',
  },
  {
    id: 'toyota-camry',
    name: '2020 Toyota Camry SE',
    status: 'IN_TRANSIT',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?q=80&w=400&auto=format&fit=crop', // Low res
    deliveredTo: 'Abuja, NG',
  }
];

export default function Inventory() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 border-b border-white/20 pb-4">
        <h1 className="font-sans font-bold text-4xl uppercase tracking-tighter mb-2">Sourced & Available Ledger</h1>
        <p className="font-mono text-sm text-gray-400">Current inventory and indicative landed costs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {FEATURED_VEHICLES.map((vehicle) => {
          const landedCost = calculateLandedCost(vehicle.costBreakdown, vehicle.isVerified);
          return (
            <MonroneyCard
              key={vehicle.id}
              title={vehicle.name}
              badge={vehicle.badge}
              badgeColor={vehicle.badgeColor}
            >
              <div className="aspect-[16/9] bg-gray-200 mb-6 relative overflow-hidden border border-black">
                {/* High res images here */}
                <div className="relative w-full h-full">
                  <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
                </div>

                {/* SVG Inspection Hotspot Pins */}
                <div className="absolute top-[30%] left-[20%] group cursor-pointer">
                  <div className="w-4 h-4 bg-modfem-signalAmber rounded-full border-2 border-black flex items-center justify-center shadow-lg"></div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    01 // POWERTRAIN
                  </div>
                </div>

                <div className="absolute top-[40%] right-[30%] group cursor-pointer">
                  <div className="w-4 h-4 bg-modfem-signalAmber rounded-full border-2 border-black flex items-center justify-center shadow-lg"></div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    02 // TITLE
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-xs text-gray-500 mb-1">TOTAL LANDED COST</div>
                  <div className="font-bold text-2xl">{formatNGN(landedCost.totalNGN)}</div>
                </div>
              </div>

              <a href={getWhatsAppUrl(`I am interested in the ${vehicle.name}.`)} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button fullWidth>SECURE ON WHATSAPP</Button>
              </a>
            </MonroneyCard>
          );
        })}
      </div>

      <div className="mb-12 border-b border-white/20 pb-4">
        <h2 className="font-sans font-bold text-2xl uppercase tracking-tighter mb-2">Archive / Delivered</h2>
        <p className="font-mono text-sm text-gray-400">Past sourcing mandates.</p>
      </div>

      <div className="space-y-4">
        {ARCHIVE_VEHICLES.map(vehicle => (
          <div key={vehicle.id} className="border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row items-center gap-6 hover:bg-white/10 transition-colors">
            {/* TelemetryDossierViewport: max-width 180px, object-fit contain so it's not stretched */}
            <div className="w-full sm:w-[180px] h-[120px] bg-black border border-white/20 flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden">
               <div className="relative w-full h-full">
                 <Image src={vehicle.image} alt={vehicle.name} fill className="object-contain" />
               </div>
               <div className="absolute top-0 right-0 bg-black/80 px-2 py-1 text-[10px] font-mono border-b border-l border-white/20">LOW_RES</div>
            </div>

            <div className="flex-grow">
              <h3 className="font-bold font-sans text-xl uppercase tracking-tighter mb-2">{vehicle.name}</h3>
              <div className="grid grid-cols-2 gap-4 font-mono text-sm text-gray-400">
                <div>
                  <span className="block text-xs text-gray-500 mb-1">STATUS</span>
                  <span className="text-white">{vehicle.status === 'IN_TRANSIT' ? 'On Route' : 'Delivered'}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">DESTINATION</span>
                  <span className="text-white">{vehicle.deliveredTo}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
