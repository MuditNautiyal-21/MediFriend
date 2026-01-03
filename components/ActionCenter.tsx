
import React from 'react';
import { GavelIcon, DollarIcon } from './icons';

interface ActionCenterProps {
    onFindRepresentation: () => void;
    onFindLoanAssistance: () => void;
}

const ActionCenter: React.FC<ActionCenterProps> = ({ onFindRepresentation, onFindLoanAssistance }) => {
    return (
        <div className="mt-8">
             <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">What's Next?</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col">
                    <div className="flex items-center gap-3">
                        <GavelIcon />
                        <h3 className="text-lg font-bold text-slate-800">Need to Escalate?</h3>
                    </div>
                    <p className="text-slate-600 mt-2 mb-4 text-sm flex-grow">
                        If the provider is unresponsive, or if you need expert help, we can connect you with law firms that specialize in medical billing disputes.
                    </p>
                    <button
                        onClick={onFindRepresentation}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg shadow-md hover:bg-slate-800 transition-colors"
                    >
                        Find Legal Representation
                    </button>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col">
                    <div className="flex items-center gap-3">
                        <DollarIcon />
                        <h3 className="text-lg font-bold text-slate-800">Need Financial Help?</h3>
                    </div>
                    <p className="text-slate-600 mt-2 mb-4 text-sm flex-grow">
                        Explore personal loans or payment plans from trusted providers to help you manage your medical expenses while you resolve your dispute.
                    </p>
                    <button
                        onClick={onFindLoanAssistance}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                    >
                        Find Loan Assistance
                    </button>
                </div>
             </div>
        </div>
    );
};

export default ActionCenter;
