
import React from 'react';
import BillStatusChart from './BillStatusChart';
import LegalAssistance from './LegalAssistance';
import LoanAssistance from './LoanAssistance';
import SpendingRatioChart from './DonutChart';


interface DashboardProps {
  onStartAnalysis: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartAnalysis }) => {
  const recentBills = [
    { id: 1, provider: 'City General Hospital', date: '2024-06-15', amount: '$2,450.78', status: 'Analyzed' },
    { id: 2, provider: 'Ortho Associates', date: '2024-05-22', amount: '$875.00', status: 'Analyzed' },
    { id: 3, provider: 'Radiology Specialists', date: '2024-04-10', amount: '$1,230.50', status: 'Disputed' },
    { id: 4, provider: 'PharmaCare', date: '2024-03-18', amount: '$155.20', status: 'Paid' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Row 1: Get Clarity & Lifetime Savings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md border border-slate-200 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800">Ready to get clarity?</h2>
          <p className="text-slate-600 mt-2 mb-6">Upload your latest medical bill, and our AI assistant will analyze it for errors, explain complex terms, and help you save money.</p>
          <button
            onClick={onStartAnalysis}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors self-start"
          >
            Analyze a New Bill
          </button>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h3 className="font-semibold text-slate-700 mb-2">Lifetime Savings</h3>
          <p className="text-4xl font-bold text-green-600">$5,482.50</p>
          <p className="text-slate-500 mt-1">Potential savings identified across all analyzed bills.</p>
        </div>
      </div>
      
      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
             <h3 className="text-xl font-semibold text-slate-800 mb-4">Current Bill Status</h3>
             <BillStatusChart bills={recentBills} />
        </div>
         <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
             <h3 className="text-xl font-semibold text-slate-800 mb-4">Total Spending Ratio</h3>
             <SpendingRatioChart />
        </div>
      </div>

      {/* Row 3: Recent Bills */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Your Recent Bills</h3>
          <div className="overflow-x-auto">
              <table className="w-full text-left">
                  <thead>
                      <tr className="border-b text-sm text-slate-500">
                          <th className="py-2 font-medium">Provider</th>
                          <th className="py-2 font-medium">Date</th>
                          <th className="py-2 font-medium">Amount</th>
                          <th className="py-2 font-medium">Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {recentBills.map(bill => (
                          <tr key={bill.id} className="border-b last:border-0 text-slate-700">
                              <td className="py-3 pr-2">{bill.provider}</td>
                              <td className="py-3 pr-2">{bill.date}</td>
                              <td className="py-3 pr-2 font-medium">{bill.amount}</td>
                              <td className="py-3 pr-2">
                                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                      bill.status === 'Analyzed' ? 'bg-blue-100 text-blue-800' :
                                      bill.status === 'Disputed' ? 'bg-amber-100 text-amber-800' :
                                      'bg-green-100 text-green-800'
                                  }`}>
                                      {bill.status}
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
      
      {/* Row 4: Legal & Loan Assistance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LegalAssistance />
        <LoanAssistance />
      </div>
    </div>
  );
};

export default Dashboard;
