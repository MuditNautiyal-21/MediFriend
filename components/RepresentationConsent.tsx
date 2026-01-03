
import React from 'react';
import { GavelIcon } from './icons';

interface RepresentationConsentProps {
  onAgree: () => void;
  onCancel: () => void;
}

const RepresentationConsent: React.FC<RepresentationConsentProps> = ({ onAgree, onCancel }) => {
  return (
    <div>
      <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <GavelIcon />
          <h2 className="text-2xl font-bold text-slate-800">Consent to Share Information</h2>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
          <p>
            To connect you with legal professionals, you must consent to share your relevant documents with our partner law firms.
          </p>
          
          <h3 className="text-slate-700 font-semibold">Information to be Shared</h3>
          <p>
            By clicking "I Agree & Consent," you authorize us to securely share the following documents with the law firms displayed on the next screen for the sole purpose of evaluating your case for representation:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>The full medical bill document you uploaded.</li>
            <li>The complete AI-generated analysis report.</li>
            <li>The generated dispute letter.</li>
          </ul>

          <h3 className="text-slate-700 font-semibold">Your Agreement</h3>
          <p>
            You understand that sharing this information is for the purpose of seeking legal consultation and does not automatically create an attorney-client relationship. The decision to engage with any law firm is solely your own.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-200 pt-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAgree}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            I Agree & Consent
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepresentationConsent;