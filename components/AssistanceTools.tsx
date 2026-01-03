
import React, { useState } from 'react';

const AssistanceTools = () => {
    const [totalBill, setTotalBill] = useState(0);
    const [interestRate, setInterestRate] = useState(5.0);
    const [termYears, setTermYears] = useState(3);
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

    const calculateMonthlyPayment = () => {
        if (totalBill <= 0 || termYears <= 0) {
            setMonthlyPayment(null);
            return;
        }

        const principal = totalBill;
        const numPayments = termYears * 12;

        if (interestRate === 0) {
            setMonthlyPayment(principal / numPayments);
            return;
        }

        const monthlyRate = (interestRate / 100) / 12;
        const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        setMonthlyPayment(payment);
    };


  return (
    <div className="max-w-4xl mx-auto mt-12">
        <details className="bg-white rounded-xl shadow-md border border-slate-200 open:ring-2 open:ring-blue-500 open:shadow-xl" open>
            <summary className="text-xl font-semibold text-slate-800 p-6 cursor-pointer list-none flex justify-between items-center">
                Assistance & Negotiation Tools
                <svg className="w-6 h-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <div className="p-6 border-t text-slate-700 space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Tips for Negotiating Your Bill</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                        <li><b>Always be polite and firm.</b> You are the customer.</li>
                        <li><b>Ask for an itemized bill.</b> This is your right and helps you spot errors.</li>
                        <li><b>Reference your insurance's Explanation of Benefits (EOB).</b> Compare it against the bill.</li>
                        <li><b>Offer to pay a portion in full, now.</b> Hospitals often prefer immediate payment, even if it's a reduced amount. You can say, "I can pay 50% of this bill today if we can consider the debt settled."</li>
                        <li><b>Ask about financial assistance.</b> Most non-profit hospitals are required to have charity care policies.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Phone Negotiation Script</h3>
                    <div className="p-4 bg-slate-100 rounded-lg border italic">
                        <p>"Hello, my name is [Your Name] and I'm calling about a bill for patient [Patient Name], account number [Account Number]. I've reviewed the bill and I believe there may be some errors. Could you please help me verify the following charges? [List charges flagged by the AI]. I would also like to request a detailed, itemized bill be sent to me."</p>
                        <p className="mt-2">"Additionally, I'd like to inquire about options for resolving this bill. What is the lowest discounted price you can offer for a prompt cash payment?"</p>
                    </div>
                </div>
                <div className="border-t pt-8">
                    <h3 className="text-lg font-semibold mb-4">Payment Plan Calculator</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="total-bill" className="block text-sm font-medium text-slate-600">Total Bill Amount ($)</label>
                            <input type="number" id="total-bill" value={totalBill} onChange={(e) => setTotalBill(parseFloat(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="interest-rate" className="block text-sm font-medium text-slate-600">Annual Interest Rate (%)</label>
                            <input type="number" id="interest-rate" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                        <div>
                            <label htmlFor="term-years" className="block text-sm font-medium text-slate-600">Payment Term (Years)</label>
                            <input type="number" id="term-years" value={termYears} onChange={(e) => setTermYears(parseInt(e.target.value, 10))} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                         <button onClick={calculateMonthlyPayment} className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors">Calculate Monthly Payment</button>
                        {monthlyPayment !== null && (
                            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg w-full text-center">
                                <p className="font-semibold">Estimated Monthly Payment: <span className="text-xl">${monthlyPayment.toFixed(2)}</span></p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </details>
    </div>
  );
};

export default AssistanceTools;
