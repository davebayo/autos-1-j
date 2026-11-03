'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { getWhatsAppUrl } from '@/lib/site-config';
import { calculateLandedCost, formatNGN, formatCAD } from '@/lib/pricing';
import { DistressHero } from '@/components/DistressHero';
import { EditorialDealerSignoff } from '@/components/EditorialDealerSignoff';

const SHOWROOM_VEHICLES = [
  {
    id: 'kia-sportage',
    name: '2013 Kia Sportage Upgraded',
    badge: 'VERIFIED SOURCED',
    badgeColor: 'emerald' as const,
    images: {
      front: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop', // Placeholder since real images not provided
      side: 'https://images.unsplash.com/photo-1550503023-e18e38d3885f?q=80&w=2000&auto=format&fit=crop',
    },
    costBreakdown: {
      basePriceCAD: 4500,
      exchangeRateCADtoNGN: 1100, // example live rate
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
    badge: 'VERIFIED SOURCED',
    badgeColor: 'emerald' as const,
    images: {
      front: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2000&auto=format&fit=crop',
      side: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop',
    },
    costBreakdown: {
      basePriceCAD: 28000,
      exchangeRateCADtoNGN: 1100,
      inspectionAndTowingCAD: 250,
      freightCAD: 2200,
      customsDutyAndLevyNGN: 9500000,
      portClearingNGN: 700000,
      sourcingFeeNGN: 500000,
    },
    isVerified: true
  }
];

export default function Home() {
  const [activeVehicleIdx, setActiveVehicleIdx] = useState(0);
  const [activeAngle, setActiveAngle] = useState<'front' | 'side'>('front');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeVehicle = SHOWROOM_VEHICLES[activeVehicleIdx];
  const landedCost = calculateLandedCost(activeVehicle.costBreakdown, activeVehicle.isVerified);

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden bg-modfem-obsidian">
      {/* New Full-Viewport Hero with Split Glass UI */}
      <DistressHero
        vehicleName={activeVehicle.name}
        landedCost={formatNGN(landedCost.totalNGN)}
        badge={activeVehicle.badge}
        badgeColor={activeVehicle.badgeColor}
        imageUrl={activeVehicle.images[activeAngle]}
        activeVehicleIdx={activeVehicleIdx}
        setActiveVehicleIdx={setActiveVehicleIdx}
        activeAngle={activeAngle}
        setActiveAngle={setActiveAngle}
        totalVehicles={SHOWROOM_VEHICLES.length}
        onOpenSpecSheet={() => setIsDrawerOpen(true)}
        onWhatsAppClick={() => {
          window.open(getWhatsAppUrl(`I am interested in the ${activeVehicle.name}. Please send more details.`), '_blank');
        }}
      />

      {/* Mechanical Shift-Gate Timeline */}
      <div className="bg-black border-y border-white/10 relative z-30 py-6 overflow-x-auto">
        <div className="container mx-auto px-4 min-w-[800px]">
          <div className="flex justify-between items-center font-mono text-xs text-white/50 tracking-widest uppercase">
            <div className="flex flex-col items-center gap-2"><div className="w-2 h-2 bg-white/20" />01 SPEC</div>
            <div className="h-px bg-white/10 flex-grow mx-4" />
            <div className="flex flex-col items-center gap-2"><div className="w-2 h-2 bg-white/20" />02 INSPECT</div>
            <div className="h-px bg-white/10 flex-grow mx-4" />
            <div className="flex flex-col items-center gap-2"><div className="w-2 h-2 bg-white/20" />03 ACQUIRE</div>
            <div className="h-px bg-white/10 flex-grow mx-4" />
            <div className="flex flex-col items-center gap-2"><div className="w-2 h-2 bg-white/20" />04 SHIP</div>
            <div className="h-px bg-white/10 flex-grow mx-4" />
            <div className="flex flex-col items-center gap-2"><div className="w-2 h-2 bg-white/20" />05 DELIVER</div>
          </div>
        </div>
      </div>

      {/* Editorial Dealer Signoff Section */}
      <EditorialDealerSignoff />

      {/* Landed Cost Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white text-black z-50 overflow-y-auto border-l-4 border-modfem-racingEmerald"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6">
                  <h3 className="font-sans font-bold text-2xl uppercase tracking-tighter">Monroney Spec Sheet</h3>
                  <button onClick={() => setIsDrawerOpen(false)} className="font-mono text-sm hover:text-modfem-racingEmerald uppercase">Close [X]</button>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold font-mono text-lg mb-2">{activeVehicle.name}</h4>
                  <div className={`inline-block px-2 py-1 font-mono text-xs font-bold uppercase ${activeVehicle.badgeColor === ('amber' as string) ? 'bg-modfem-signalAmber' : 'bg-modfem-racingEmerald'}`}>
                    {activeVehicle.badge}
                  </div>
                </div>

                <div className="space-y-6 font-mono text-sm">
                  <div>
                    <div className="font-bold bg-black text-white px-2 py-1 mb-2">CANADIAN EXPENSES (CAD)</div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Vehicle Base Price</span>
                      <span>{formatCAD(landedCost.components.basePriceCAD)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Inspection & Inland Towing</span>
                      <span>{formatCAD(landedCost.components.inspectionAndTowingCAD)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Ocean Freight (RoRo/Container)</span>
                      <span>{formatCAD(landedCost.components.freightCAD)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold bg-gray-100 px-2 mt-2">
                      <span>TOTAL CAD</span>
                      <span>{formatCAD(landedCost.totalCAD)}</span>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold bg-black text-white px-2 py-1 mb-2">NIGERIAN EXPENSES (NGN)</div>
                    <div className="flex justify-between py-1 border-b border-gray-200 text-xs text-gray-500">
                      <span>Applied FX Rate</span>
                      <span>₦{landedCost.components.exchangeRateCADtoNGN} / $1 CAD</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Canadian Costs in NGN</span>
                      <span>{formatNGN(landedCost.totalCAD * landedCost.components.exchangeRateCADtoNGN)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Customs Duty + Levy</span>
                      <span>{formatNGN(landedCost.components.customsDutyAndLevyNGN)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Port Clearing (Tin Can/PTML)</span>
                      <span>{formatNGN(landedCost.components.portClearingNGN)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Modfem Sourcing Fee</span>
                      <span>{formatNGN(landedCost.components.sourcingFeeNGN)}</span>
                    </div>
                  </div>

                  <div className="border-t-4 border-black pt-4 mt-8">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">TOTAL LANDED COST</span>
                      <span className="font-bold text-2xl text-modfem-racingEmerald">{formatNGN(landedCost.totalNGN)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Estimate generated on: {new Date(landedCost.dateStamped).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-8">
                    <a href={getWhatsAppUrl(`I have reviewed the landed cost estimate for the ${activeVehicle.name} (${formatNGN(landedCost.totalNGN)}). Let's proceed.`)} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Button fullWidth>SECURE THIS VEHICLE ON WHATSAPP</Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
