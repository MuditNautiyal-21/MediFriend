
import React from 'react';

const recommendedFirms = [
    { 
        name: 'Patient Rights Practice', 
        specialty: 'Healthcare Law & Billing Advocacy', 
        contact: 'help@patientrightspractice.org', 
        solvedCases: 210, 
        amountSaved: '$450k+',
        similarDisputes: 45
    },
];

const alternativeFirms = [
    { 
        name: 'Justice Law Firm', 
        specialty: 'Medical Billing Disputes', 
        contact: 'contact@justicelaw.com', 
        solvedCases: 124, 
        amountSaved: '$250k+',
        similarDisputes: 22
    },
    { 
        name: 'Advocate Legal Group', 
        specialty: 'Insurance Claims & Appeals', 
        contact: 'info@advocatelegal.com', 
        solvedCases: 98, 
        amountSaved: '$180k+',
        similarDisputes: 15
    },
];

const LawFirmCard: React.FC<{ firm: typeof recommendedFirms[0] }> = ({ firm }) => (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold text-slate-800 text-lg">{firm.name}</p>
        <p className="text-base text-slate-600 mb-2">{firm.specialty}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 mb-3 border-t border-slate-200 pt-3 mt-2">
            <div>
                <p className="font-bold text-slate-700 text-lg">{firm.solvedCases}</p>
                <p className="text-sm text-slate-500">Cases Solved</p>
            </div>
            <div>
                <p className="font-bold text-green-600 text-lg">{firm.amountSaved}</p>
                <p className="text-sm text-slate-500">Saved for Clients</p>
            </div>
            <div>
                <p className="font-bold text-slate-700 text-lg">{firm.similarDisputes}</p>
                <p className="text-sm text-slate-500">Similar Disputes (Last 1yr)</p>
            </div>
        </div>
        <a href={`mailto:${firm.contact}`} className="text-base font-semibold text-blue-600 hover:underline">
            Contact Firm
        </a>
    </div>
);


const LawFirmList: React.FC = () => {
    return (
        <details className="bg-white rounded-xl shadow-lg border border-slate-200 open:ring-2 open:ring-blue-500 open:shadow-xl" open>
            <summary className="p-6 cursor-pointer list-none flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Legal Representation Options</h2>
                <svg className="w-6 h-6 transform transition-transform duration-300 details-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <div className="p-6 border-t border-slate-200">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Recommended For You</h3>
                        <div className="space-y-4">
                            {recommendedFirms.map(firm => <LawFirmCard key={firm.name} firm={firm} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Alternative Options</h3>
                        <div className="space-y-4">
                            {alternativeFirms.map(firm => <LawFirmCard key={firm.name} firm={firm} />)}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-slate-500 mt-6 text-center">
                    Disclaimer: MediFriend is not a law firm and does not provide legal advice. The firms listed are for informational purposes only. We do not endorse or guarantee their services.
                </p>
            </div>
        </details>
    );
};

export default LawFirmList;
