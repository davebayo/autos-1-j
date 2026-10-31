'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { getWhatsAppUrl } from '@/lib/site-config';

type RequestMode = 'sourcing' | 'swap';

export default function Request() {
  const [mode, setMode] = useState<RequestMode>('sourcing');

  // Sourcing fields
  const [targetSpec, setTargetSpec] = useState('');
  const [budget, setBudget] = useState('');
  const [port, setPort] = useState('Tin Can');

  // Swap fields
  const [tradeInYMM, setTradeInYMM] = useState('');
  const [tradeInCondition, setTradeInCondition] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, we'd also POST this to our /api/store route
    try {
      await fetch('/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': 'placeholder-until-auth-implemented'
        },
        body: JSON.stringify({
          mode, targetSpec, budget, port, tradeInYMM, tradeInCondition
        })
      });
    } catch (err) {
      console.error("Failed to persist request", err);
    }

    // Generate formatted WhatsApp dispatch
    let message = '';
    if (mode === 'sourcing') {
      message = `*NEW SOURCING MANDATE*\n\nTarget Spec: ${targetSpec}\nBudget: ${budget}\nPreferred Port: ${port}\n\nLet's discuss.`;
    } else {
      message = `*NEW UPGRADE & SWAP MANDATE*\n\nTrade-in: ${tradeInYMM}\nCondition: ${tradeInCondition}\n\nTarget Spec: ${targetSpec}\nBudget for Upgrade: ${budget}\n\nLet's discuss.`;
    }

    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 border-b border-white/20 pb-4 text-center">
          <h1 className="font-sans font-bold text-4xl uppercase tracking-tighter mb-2">Concierge Request</h1>
          <p className="font-mono text-sm text-gray-400">Initiate a sourcing or swap mandate.</p>
        </div>

        {/* Cockpit Mode Gate Selector */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            type="button"
            onClick={() => setMode('sourcing')}
            className={`flex-1 border p-6 text-left transition-all ${
              mode === 'sourcing'
                ? 'border-modfem-racingEmerald bg-modfem-racingEmerald/10 text-white'
                : 'border-white/20 text-gray-400 hover:border-white/50'
            }`}
          >
            <div className={`font-mono text-xs font-bold mb-2 ${mode === 'sourcing' ? 'text-modfem-racingEmerald' : 'text-gray-500'}`}>
              MODE 01 //
            </div>
            <h3 className="font-sans font-bold text-xl uppercase tracking-tighter">Direct Canadian Sourcing</h3>
          </button>

          <button
            type="button"
            onClick={() => setMode('swap')}
            className={`flex-1 border p-6 text-left transition-all ${
              mode === 'swap'
                ? 'border-modfem-racingEmerald bg-modfem-racingEmerald/10 text-white'
                : 'border-white/20 text-gray-400 hover:border-white/50'
            }`}
          >
            <div className={`font-mono text-xs font-bold mb-2 ${mode === 'swap' ? 'text-modfem-racingEmerald' : 'text-gray-500'}`}>
              MODE 02 //
            </div>
            <h3 className="font-sans font-bold text-xl uppercase tracking-tighter">Car Upgrade & Swap</h3>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8">

          {mode === 'swap' && (
            <div className="space-y-6 pb-6 border-b border-white/20">
              <h3 className="font-mono text-sm font-bold text-modfem-racingEmerald uppercase tracking-wider">Your Current Vehicle</h3>
              <div>
                <label className="block font-mono text-xs text-gray-400 mb-2 uppercase">Year, Make, Model</label>
                <input
                  type="text"
                  required
                  value={tradeInYMM}
                  onChange={(e) => setTradeInYMM(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-modfem-racingEmerald text-white"
                  placeholder="e.g., 2015 Toyota Corolla"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-gray-400 mb-2 uppercase">Condition / Issues</label>
                <textarea
                  required
                  value={tradeInCondition}
                  onChange={(e) => setTradeInCondition(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-modfem-racingEmerald text-white min-h-[100px]"
                  placeholder="Describe general condition, any mechanical issues, mileage..."
                />
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h3 className="font-mono text-sm font-bold text-modfem-racingEmerald uppercase tracking-wider">
              {mode === 'swap' ? 'Target Upgrade Vehicle' : 'Target Vehicle'}
            </h3>
            <div>
              <label className="block font-mono text-xs text-gray-400 mb-2 uppercase">Target Spec (Year, Make, Model, Trims)</label>
              <input
                type="text"
                required
                value={targetSpec}
                onChange={(e) => setTargetSpec(e.target.value)}
                className="w-full bg-black border border-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-modfem-racingEmerald text-white"
                placeholder="e.g., 2021 Lexus RX 350 F-Sport"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-gray-400 mb-2 uppercase">Landed Budget (NGN)</label>
              <input
                type="text"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-black border border-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-modfem-racingEmerald text-white"
                placeholder="e.g., ₦45,000,000"
              />
            </div>

            {mode === 'sourcing' && (
              <div>
                <label className="block font-mono text-xs text-gray-400 mb-2 uppercase">Preferred Nigerian Port</label>
                <select
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="w-full bg-black border border-white/20 px-4 py-3 font-mono text-sm focus:outline-none focus:border-modfem-racingEmerald text-white appearance-none"
                >
                  <option value="Tin Can">Tin Can Island, Lagos</option>
                  <option value="PTML">PTML, Lagos</option>
                  <option value="Apapa">Apapa, Lagos</option>
                </select>
              </div>
            )}
          </div>

          <div className="pt-6">
            <Button type="submit" fullWidth>
              SUBMIT MANDATE & CONNECT ON WHATSAPP
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
