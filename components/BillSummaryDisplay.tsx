import React from 'react';
import { BillSummary } from '../types';
import { SummaryIcon } from './icons';

interface BillSummaryProps {
  summary: BillSummary;
}

const BillSummaryDisplay: React.FC<BillSummaryProps> = ({ summary }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <SummaryIcon />
        <h2 className="text-2xl font-bold text-slate-800">Bill Summary</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border">
        {Object.entries(summary).map(([key, value]) => (
          <div key={key}>
            <p className="text-sm font-semibold text-slate-500">{key.replace(/_/g, ' ').toUpperCase()}</p>
            <p className="text-slate-900 font-medium">{value || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillSummaryDisplay;
