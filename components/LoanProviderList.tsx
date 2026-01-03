
import React from 'react';

const recommendedProviders = [
    { 
        name: 'HealthCredit Services', 
        aprRange: '5.9% - 15.9%', 
        loanAmounts: '$1k - $50k', 
        customerRating: 4.8,
        fundedLoans: '25,000+'
    },
];

const alternativeProviders = [
    { 
        name: 'MedLoan Finance', 
        aprRange: '6.5% - 18.5%', 
        loanAmounts: '$500 - $40k', 
        customerRating: 4.6,
        fundedLoans: '18,000+'
    },
    { 
        name: 'CarePay Solutions', 
        aprRange: '0% for 12 mo', 
        loanAmounts: '$200 - $20k', 
        customerRating: 4.5,
        fundedLoans: '35,000+'
    },
    { 
        name: 'United Medical Credit', 
        aprRange: '7.2% - 22.9%', 
        loanAmounts: '$1k - $35k', 
        customerRating: 4.4,
        fundedLoans: '15,000+'
    },
];

const LoanProviderCard: React.FC<{ provider: typeof recommendedProviders[0] }> = ({ provider }) => (
    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <p className="font-semibold text-slate-800 text-lg">{provider.name}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 mb-3 border-t border-slate-200 pt-3 mt-2">
            <div>
                <p className="font-bold text-slate-700 text-lg">{provider.aprRange}</p>
                <p className="text-sm text-slate-500">APR Range</p>
            </div>
            <div>
                <p className="font-bold text-slate-700 text-lg">{provider.loanAmounts}</p>
                <p className="text-sm text-slate-500">Loan Amounts</p>
            </div>
            <div>
                <p className="font-bold text-blue-600 text-lg">{provider.customerRating} / 5.0</p>
                <p className="text-sm text-slate-500">Customer Rating</p>
            </div>
             <div>
                <p className="font-bold text-slate-700 text-lg">{provider.fundedLoans}</p>
                <p className="text-sm text-slate-500">Loans Funded</p>
            </div>
        </div>
        <a href="#" className="text-base font-semibold text-blue-600 hover:underline">
            Visit Website
        </a>
    </div>
);


const LoanProviderList: React.FC = () => {
    return (
        <details className="bg-white rounded-xl shadow-lg border border-slate-200 open:ring-2 open:ring-blue-500 open:shadow-xl" open>
            <summary className="p-6 cursor-pointer list-none flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Loan Assistance Options</h2>
                <svg className="w-6 h-6 transform transition-transform duration-300 details-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <div className="p-6 border-t border-slate-200">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Recommended For You</h3>
                        <div className="space-y-4">
                            {recommendedProviders.map(provider => <LoanProviderCard key={provider.name} provider={provider} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-3">Alternative Options</h3>
                        <div className="space-y-4">
                            {alternativeProviders.map(provider => <LoanProviderCard key={provider.name} provider={provider} />)}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-slate-500 mt-6 text-center">
                    Disclaimer: MediFriend does not provide financial advice. The providers listed are for informational purposes. We do not endorse or guarantee their services or rates.
                </p>
            </div>
        </details>
    );
};

export default LoanProviderList;
