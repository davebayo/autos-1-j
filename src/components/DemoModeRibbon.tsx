'use client';

import { useState } from 'react';
import { OPERATOR_DETAILS } from '@/lib/site-config';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export function DemoModeRibbon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-modfem-signalAmber text-black border-b border-black">
      <div
        className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-opacity-90 font-mono text-sm font-bold uppercase tracking-wider"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-none bg-black animate-pulse"></div>
          <span>[DEMO MODE] Operator Verification Checklist</span>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {isOpen && (
        <div className="px-4 py-4 bg-white text-black border-t border-black font-mono text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Operator Details</h3>
              <ul className="space-y-1">
                <li>Name: {OPERATOR_DETAILS.name}</li>
                <li>Location: {OPERATOR_DETAILS.location}</li>
                <li>Email: {OPERATOR_DETAILS.email}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Verified Communications</h3>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-modfem-racingEmerald" />
                  Primary WA: {OPERATOR_DETAILS.whatsapp}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-modfem-racingEmerald" />
                  NG WA: {OPERATOR_DETAILS.secondaryWhatsApp} (11th-digit verification)
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
