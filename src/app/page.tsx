'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/site-config';
import { calculateLandedCost, formatNGN, formatCAD } from '@/lib/pricing';

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

      {/* Background Image Area */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for contrast */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activeVehicle.id}-${activeAngle}`}
            src={activeVehicle.images[activeAngle]}
            alt={activeVehicle.name}
            className="w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
        </div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-20 container mx-auto px-4 h-full pt-12 pb-24 flex flex-col justify-between min-h-[calc(100vh-64px)]">

        {/* Top Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <div className={`inline-block px-3 py-1 font-mono text-xs font-bold uppercase mb-4 ${activeVehicle.badgeColor === ('amber' as string) ? 'bg-modfem-signalAmber text-black' : 'bg-modfem-racingEmerald text-black'}`}>
              {activeVehicle.badge}
            </div>
            <h1 className="font-sans font-bold text-4xl md:text-6xl uppercase tracking-tighter mb-4 text-white leading-tight">
              {activeVehicle.name}
            </h1>
            <div className="font-mono text-xl md:text-2xl text-modfem-racingEmerald bg-black/50 p-2 inline-block border border-white/10">
              LANDED TOTAL: {formatNGN(landedCost.totalNGN)}
            </div>
          </div>

          <div className="flex gap-2 font-mono text-sm">
            <button
              onClick={() => setActiveAngle('front')}
              className={`px-4 py-2 border ${activeAngle === 'front' ? 'border-modfem-racingEmerald text-modfem-racingEmerald' : 'border-white/20 text-white hover:border-white/50'} uppercase tracking-wider`}
            >
              FRONT // 01
            </button>
            <button
              onClick={() => setActiveAngle('side')}
              className={`px-4 py-2 border ${activeAngle === 'side' ? 'border-modfem-racingEmerald text-modfem-racingEmerald' : 'border-white/20 text-white hover:border-white/50'} uppercase tracking-wider`}
            >
              SIDE // 02
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex gap-4">
            <Button onClick={() => setIsDrawerOpen(true)}>
              VIEW MONRONEY SPEC SHEET
            </Button>
            <a href={getWhatsAppUrl(`I am interested in the ${activeVehicle.name}. Please send more details.`)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                SECURE ON WHATSAPP
              </Button>
            </a>
          </div>

          <div className="flex gap-2">
            {SHOWROOM_VEHICLES.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setActiveVehicleIdx(idx)}
                className={`w-12 h-2 ${idx === activeVehicleIdx ? 'bg-modfem-racingEmerald' : 'bg-white/20'}`}
                aria-label={`View ${v.name}`}
              />
            ))}
          </div>
        </div>
      </div>

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

      {/* Meet Your Canadian Partner Section */}
      <div className="bg-modfem-obsidian relative z-30 py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-sans font-bold text-4xl uppercase tracking-tighter mb-6">Meet Your Canadian Partner</h2>
            <p className="font-mono text-sm text-gray-400 mb-8 leading-relaxed">
              Based in Vaughan, Ontario. I handle the end-to-end concierge process so you don&apos;t have to worry about fraud, hidden port fees, or mechanical lemons.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs uppercase tracking-wider">
              <div className="border border-white/10 p-4 hover:border-modfem-racingEmerald transition-colors"><div className="text-modfem-racingEmerald mb-2">01 //</div> Car Sourcing</div>
              <div className="border border-white/10 p-4 hover:border-modfem-racingEmerald transition-colors"><div className="text-modfem-racingEmerald mb-2">02 //</div> Pre-Purchase Inspection</div>
              <div className="border border-white/10 p-4 hover:border-modfem-racingEmerald transition-colors"><div className="text-modfem-racingEmerald mb-2">03 //</div> Purchase Support</div>
              <div className="border border-white/10 p-4 hover:border-modfem-racingEmerald transition-colors"><div className="text-modfem-racingEmerald mb-2">04 //</div> Shipping to Nigeria</div>
              <div className="border border-white/10 p-4 hover:border-modfem-racingEmerald transition-colors"><div className="text-modfem-racingEmerald mb-2">05 //</div> Financing Support</div>
              <div className="border border-white/10 p-4 hover:border-modfem-racingEmerald transition-colors"><div className="text-modfem-racingEmerald mb-2">06 //</div> Car Upgrading & Swapping</div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-square">
            <div className="absolute inset-0 bg-white/5 border border-white/20 flex items-center justify-center p-8">
               <div className="relative w-full h-full">
                 <Image src="/images/WhatsApp Image 2026-11-02 at 8.13.10 PM.jpeg" alt="Uncle Modupe" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-white/10" />
               </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-modfem-racingEmerald text-black font-mono text-xs p-4 font-bold uppercase">
              Modupe • Vaughan, ON
            </div>
          </div>
        </div>
      </div>

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
