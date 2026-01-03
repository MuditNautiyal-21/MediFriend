
import React from 'react';
import { CodeExplanation, MedicalCode } from '../types';
import { ReviewIcon, CheckIcon, ChevronDownIcon } from './icons';

interface MedicalCodesProps {
  codes: CodeExplanation;
  onDisputeCode: (code: MedicalCode) => void;
  disputedItems: MedicalCode[];
  isReviewComplete: boolean;
  onReviewComplete: () => void;
}

const MedicalCodesDisplay: React.FC<MedicalCodesProps> = ({ codes, onDisputeCode, disputedItems, isReviewComplete, onReviewComplete }) => {

  const detailsRef = React.useRef<HTMLDetailsElement>(null);

  const disputedItemIds = new Set(
    disputedItems.map(item => `${item.code}-${item.description}-${item.cost}`)
  );

  const handleCompleteClick = () => {
    onReviewComplete();
    if (detailsRef.current) {
        detailsRef.current.open = false;
    }
  };

  const CodeItem: React.FC<{item: MedicalCode}> = ({ item }) => {
    const uniqueId = `${item.code}-${item.description}-${item.cost}`;
    const isDisputed = disputedItemIds.has(uniqueId);

    return (
        <details className={`rounded-lg border transition-colors ${isDisputed ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
            <summary className="p-4 cursor-pointer list-none flex justify-between items-center gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                        <span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-slate-800">{item.code || 'N/A'}</span>
                        <p className="font-semibold text-slate-800 flex-1 truncate" title={item.description}>{item.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 ml-auto flex-shrink-0">
                     <p className="text-slate-800 font-bold w-24 text-right">{item.cost}</p>
                     <ChevronDownIcon className="w-5 h-5 text-slate-500 transition-transform duration-200 details-arrow" />
                </div>
            </summary>
            <div className="p-4 border-t border-slate-200">
                <p className="text-slate-600 mb-3"><span className="font-semibold text-slate-700">What this means:</span> {item.explanation}</p>
                <div className={`p-3 rounded-md ${isDisputed ? 'bg-red-100' : 'bg-slate-100'}`}>
                    <p className="text-sm font-semibold text-slate-700">Please verify: was this service actually performed?</p>
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => onDisputeCode(item)}
                            disabled={isDisputed}
                            className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-transform active:scale-95 disabled:bg-slate-400 disabled:cursor-not-allowed"
                        >
                          This did not happen
                        </button>
                    </div>
                </div>
                {isDisputed && <p className="text-sm text-red-700 font-semibold mt-2">This item has been flagged as a potential error.</p>}
            </div>
        </details>
    );
  }

  return (
    <details ref={detailsRef} className="bg-white rounded-xl shadow-lg border border-slate-200 open:ring-2 open:ring-blue-500 open:shadow-xl" open>
        <summary className="p-6 cursor-pointer list-none flex justify-between items-center">
            <div className="flex items-center gap-3">
                <ReviewIcon />
                <h2 className="text-2xl font-bold text-slate-800">Review Billed Services</h2>
                {isReviewComplete && (
                    <div className="flex items-center gap-1.5 bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm font-semibold ml-2">
                        <CheckIcon />
                        <span>Review Complete</span>
                    </div>
                )}
            </div>
            <svg className="w-6 h-6 transform transition-transform duration-300 details-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </summary>
        <div className="p-6 border-t border-slate-200">
            <div className="space-y-4">
                {/* FIX: Use Object.entries to safely iterate over the code types, ensuring the key is treated as a string. */}
                {Object.entries(codes).map(([type, codeList]) => {
                // FIX: Add Array.isArray check as a type guard for codeList, which is inferred as 'unknown' by Object.entries.
                // This resolves errors related to accessing .length and .map on an unknown type.
                return Array.isArray(codeList) && codeList.length > 0 ? (
                    <div key={type}>
                    <h3 className="font-semibold text-slate-700 border-b pb-1 mb-2">{type.replace('_', ' ').toUpperCase()}</h3>
                    <div className="space-y-3">
                        {codeList.map((item, index) => <CodeItem key={`${item.code}-${index}`} item={item} />)}
                    </div>
                    </div>
                ) : null
                })}
            </div>
            {!isReviewComplete && (
                <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
                    <button
                        onClick={handleCompleteClick}
                        className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        <CheckIcon />
                        Mark Review as Complete
                    </button>
                </div>
            )}
        </div>
    </details>
  );
};

export default MedicalCodesDisplay;