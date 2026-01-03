import React from 'react';
import { ErrorAnalysis, MedicalCode } from '../types';
import { ErrorIcon, LetterIcon } from './icons';

interface ErrorsDisplayProps {
  errors: ErrorAnalysis;
  userDisputedItems: MedicalCode[];
  verifiedDuplicates: Set<string>;
  onVerifyDuplicate: (duplicateText: string) => void;
  onGenerateLetter: () => void;
  isGeneratingLetter: boolean;
  hasErrorsToDispute: boolean;
}

const ErrorsDisplay: React.FC<ErrorsDisplayProps> = ({ 
    errors, 
    userDisputedItems, 
    verifiedDuplicates, 
    onVerifyDuplicate, 
    onGenerateLetter, 
    isGeneratingLetter,
    hasErrorsToDispute 
}) => {

  const unresolvedDuplicates = errors.duplicate_entries.filter(dup => !verifiedDuplicates.has(dup));

  return (
    <details className="bg-white rounded-xl shadow-lg border border-slate-200 open:ring-2 open:ring-blue-500 open:shadow-xl" open>
        <summary className="p-6 cursor-pointer list-none flex justify-between items-center">
            <div className="flex items-center gap-3">
                <ErrorIcon />
                <h2 className="text-2xl font-bold text-slate-800">Potential Errors & Duplicates</h2>
            </div>
            <svg className="w-6 h-6 transform transition-transform duration-300 details-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </summary>
        <div className="p-6 border-t border-slate-200">
            {!hasErrorsToDispute ? (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-900">No potential errors or duplicates were automatically detected. You can still flag services in the section above.</p>
                </div>
            ) : (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <ul className="list-disc list-inside space-y-4 text-amber-900">
                    {unresolvedDuplicates.map((dup, index) => (
                        <li key={`dup-${index}`}>
                            <span className="font-semibold">[Duplicate Entry]</span> {dup}
                            <div className="ml-6 mt-2 p-2 bg-amber-100 rounded">
                                <p className="text-sm font-semibold text-slate-700 mb-1">Is this duplicate charge correct?</p>
                                <button 
                                    onClick={() => onVerifyDuplicate(dup)}
                                    className="px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-transform active:scale-95"
                                >
                                    Yes, this is correct
                                </button>
                            </div>
                        </li>
                    ))}
                    {errors.other_potential_errors.map((error, index) => <li key={`other-${index}`}>{error}</li>)}
                    {userDisputedItems.map((item, index) => (
                        <li key={`user-${index}`}>
                            <span className="font-semibold">[User Disputed]</span> Charge for code {item.code} (Description: "{item.description}") costing <span className="font-bold">{item.cost}</span>.
                        </li>
                    ))}
                </ul>
                </div>
            )}

            {hasErrorsToDispute && (
                <div className="pt-6 mt-6 border-t">
                <button
                    onClick={onGenerateLetter}
                    disabled={isGeneratingLetter}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {isGeneratingLetter ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <LetterIcon />
                            Generate Dispute Letter
                        </>
                    )}
                </button>
                </div>
            )}
        </div>
    </details>
  );
};

export default ErrorsDisplay;