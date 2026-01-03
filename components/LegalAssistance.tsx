
import React from 'react';

const lawyers = [
    { name: 'Justice Law Firm', specialty: 'Medical Billing Disputes', contact: 'contact@justicelaw.com', solvedCases: 124, amountSaved: '$250k+' },
    { name: 'Advocate Legal Group', specialty: 'Insurance Claims & Appeals', contact: 'info@advocatelegal.com', solvedCases: 98, amountSaved: '$180k+' },
    { name: 'Patient Rights Practice', specialty: 'Healthcare Law', contact: 'help@patientrightspractice.org', solvedCases: 210, amountSaved: '$450k+' },
];

const LegalAssistance: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Need Legal Assistance?</h3>
            <p className="text-slate-600 mb-4 text-sm">If you need to escalate a dispute, consider contacting a legal professional specializing in medical billing.</p>
            <div className="space-y-4">
                {lawyers.map(lawyer => (
                    <div key={lawyer.name} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="font-semibold text-slate-800">{lawyer.name}</p>
                        <p className="text-sm text-slate-600 mb-2">{lawyer.specialty}</p>
                        <div className="flex gap-4 text-sm mb-3 border-t border-slate-200 pt-2">
                            <div>
                                <span className="font-bold text-slate-700">{lawyer.solvedCases}</span>
                                <span className="text-slate-500"> Cases Solved</span>
                            </div>
                            <div>
                                <span className="font-bold text-green-600">{lawyer.amountSaved}</span>
                                <span className="text-slate-500"> Saved for Clients</span>
                            </div>
                        </div>
                        <a href={`mailto:${lawyer.contact}`} className="text-sm font-semibold text-blue-600 hover:underline">Contact Firm</a>
                    </div>
                ))}
            </div>
             <button className="mt-4 w-full px-4 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors text-sm">
                View More Legal Resources
            </button>
        </div>
    );
};

export default LegalAssistance;
