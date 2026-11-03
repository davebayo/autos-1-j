'use client';

import React from 'react';
import Image from 'next/image';

export function EditorialDealerSignoff() {
  return (
    <div className="bg-[#EAEAEA] text-black w-full relative overflow-hidden py-24 border-y-4 border-black">
      {/* Background blueprint grid overlay for the Alabaster background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(0, 0, 0, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 1) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             backgroundPosition: 'center center'
           }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Image (The Dealer / Uncle Modupe) */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[3/4] border-2 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Image
                src="/images/editorial_dealer.webp"
                alt="Uncle Modupe, Modfem Autos Canada"
                fill
                className="object-cover object-center border border-black grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Chassis Plate Overlay */}
              <div className="absolute -bottom-4 -right-4 bg-black text-white p-3 border-2 border-white font-mono text-xs uppercase shadow-xl z-20">
                <div className="border-b border-white/30 pb-1 mb-1 font-bold text-[#F59E0B]">AUTHORISED DEALER</div>
                <div>ID: MODFEM-CA-NG</div>
                <div>LOC: VAUGHAN, ON</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text / Owner's Manual Layout */}
          <div className="md:col-span-7 flex flex-col justify-center border-l-2 border-black pl-8 md:pl-12 py-8">
            <div className="mb-2">
              <span className="font-mono text-sm font-bold uppercase tracking-widest bg-black text-white px-3 py-1">
                Owner&apos;s Manual / Sec. 1
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8 text-black mt-4">
              Meet Your Canadian<br/>Partner
            </h2>

            <div className="font-mono text-sm leading-relaxed max-w-xl space-y-6">
              <p>
                Based in Vaughan, Ontario. I handle the end-to-end concierge process so you don&apos;t have to worry about fraud, hidden port fees, or mechanical lemons.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
                <div className="border border-black p-3 bg-white hover:bg-[#10B981] hover:text-white transition-colors cursor-default">
                  <span className="text-[#10B981] group-hover:text-white">01 //</span> Car Sourcing
                </div>
                <div className="border border-black p-3 bg-white hover:bg-[#10B981] hover:text-white transition-colors cursor-default">
                  <span className="text-[#10B981] group-hover:text-white">02 //</span> Pre-Purchase Inspection
                </div>
                <div className="border border-black p-3 bg-white hover:bg-[#10B981] hover:text-white transition-colors cursor-default">
                  <span className="text-[#10B981] group-hover:text-white">03 //</span> Purchase Support
                </div>
                <div className="border border-black p-3 bg-white hover:bg-[#10B981] hover:text-white transition-colors cursor-default">
                  <span className="text-[#10B981] group-hover:text-white">04 //</span> Shipping to Nigeria
                </div>
                <div className="border border-black p-3 bg-white hover:bg-[#10B981] hover:text-white transition-colors cursor-default">
                  <span className="text-[#10B981] group-hover:text-white">05 //</span> Financing Support
                </div>
                <div className="border border-black p-3 bg-white hover:bg-[#10B981] hover:text-white transition-colors cursor-default">
                  <span className="text-[#10B981] group-hover:text-white">06 //</span> Car Swapping
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="https://wa.me/14377765303?text=Hello%20Modfem,%20I'm%20interested%20in%20your%20car%20sourcing%20services."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-[#10B981] text-black border-2 border-black font-bold uppercase px-8 py-4 hover:bg-black hover:text-[#10B981] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                >
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
