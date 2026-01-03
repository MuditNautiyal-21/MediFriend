
import React from 'react';
import { ShieldCheckIcon } from './icons';

interface PrivacyAgreementProps {
  onAgree: () => void;
  onCancel: () => void;
}

const PrivacyAgreement: React.FC<PrivacyAgreementProps> = ({ onAgree, onCancel }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <ShieldCheckIcon />
          <h2 className="text-2xl font-bold text-slate-800">Privacy & Consent Agreement</h2>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-4 max-h-80 overflow-y-auto pr-4">
          <p>Before proceeding, please read and agree to the following terms regarding the handling of your data.</p>
          
          <h3 className="text-slate-700 font-semibold">Data Handling and HIPAA Compliance</h3>
          <p>
            You are about to upload a medical document that may contain Protected Health Information (PHI) as defined by the Health Insurance Portability and Accountability Act (HIPAA). By clicking "I Agree & Consent," you acknowledge and agree to the following:
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li>
              <strong>Purpose of Upload:</strong> Your document will be securely transmitted and processed by an automated Artificial Intelligence (AI) model for the sole purpose of analyzing your medical bill, identifying potential errors, and providing explanations of medical codes.
            </li>
            <li>
              <strong>No Human Review:</strong> Your document will be processed by an automated system. No human will review your PHI unless required for system maintenance or as legally mandated.
            </li>
            <li>
              <strong>Data Security:</strong> We employ industry-standard security measures to protect your data during transmission and processing. However, no system is completely secure, and you upload this information at your own risk.
            </li>
            <li>
              <strong>Data Retention:</strong> Your uploaded documents and the analysis results are not stored long-term on our servers. They are retained only for the duration necessary to provide the analysis service during your active session.
            </li>
            <li>
              <strong>Not Medical or Legal Advice:</strong> The analysis provided by the AI is for informational purposes only and does not constitute medical, legal, or financial advice. You should consult with qualified professionals for such advice.
            </li>
          </ul>

          <h3 className="text-slate-700 font-semibold">Your Consent</h3>
          <p>
            By proceeding, you grant us explicit consent to process the document you upload, including any PHI it contains, as described above. You confirm that you are authorized to share this document for this purpose.
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

export default PrivacyAgreement;
