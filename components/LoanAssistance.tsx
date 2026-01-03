
import React from 'react';

const loanProviders = [
    { name: 'HealthCredit Services', rate: 'Starting at 5.9% APR', link: '#' },
    { name: 'MedLoan Finance', rate: 'Rates from 6.5% APR', link: '#' },
    { name: 'CarePay Solutions', rate: 'Interest-free plans available', link: '#' },
];

const LoanAssistance: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Need Loan Assistance?</h3>
            <p className="text-slate-600 mb-4 text-sm">Explore personal loans or payment plans from these providers to manage your medical expenses.</p>
            <div className="space-y-3">
                {loanProviders.map(provider => (
                    <div key={provider.name} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-slate-800">{provider.name}</p>
                            <p className="text-sm text-slate-600">{provider.rate}</p>
                        </div>
                        <a href={provider.link} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors">
                            Apply
                        </a>
                    </div>
                ))}
            </div>
             <button className="mt-4 w-full px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors text-sm">
                Compare More Loan Options
            </button>
        </div>
    );
};

export default LoanAssistance;
