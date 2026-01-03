
import React from 'react';

interface Bill {
  id: number;
  date: string;
  status: 'Paid' | 'Analyzed' | 'Disputed' | string;
}

interface BillStatusChartProps {
  bills: Bill[];
}

// A checkmark icon for completed steps
const TimelineCheckIcon = () => (
    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


const BillStatusChart: React.FC<BillStatusChartProps> = ({ bills }) => {
    const stages = ['Analyzed', 'Dispute Raised', 'Lawyer Reviewing', 'Financing'];
    
    // Prioritize tracking a disputed bill, then an analyzed one.
    const trackedBill = bills.find(b => b.status === 'Disputed') || bills.find(b => b.status === 'Analyzed');

    let activeStageIndex = -1;
    if (trackedBill) {
        switch (trackedBill.status) {
            case 'Disputed':
                // As per prompt, if dispute is raised, the current location is "Lawyer Reviewing"
                activeStageIndex = 2; 
                break;
            case 'Analyzed':
                // After analysis, the next logical step is raising a dispute
                activeStageIndex = 1; 
                break;
            case 'Paid':
                 // If paid, we can consider all steps complete for this visualization
                activeStageIndex = 4;
                break;
            default:
                activeStageIndex = -1;
        }
    }

    return (
        <div className="w-full flex items-center justify-center pt-8 pb-4">
            <div className="flex items-center w-full max-w-lg mx-auto">
                {stages.map((stage, index) => {
                    const isCompleted = activeStageIndex > index;
                    const isActive = activeStageIndex === index;
                    const isPending = activeStageIndex < index;

                    return (
                        <React.Fragment key={stage}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`
                                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                        ${isCompleted ? 'bg-green-500' : ''}
                                        ${isActive ? 'bg-blue-600 ring-4 ring-blue-200' : ''}
                                        ${isPending ? 'bg-slate-300' : ''}
                                    `}
                                >
                                    {isCompleted && <TimelineCheckIcon />}
                                </div>
                                <p className={`mt-2 text-xs text-center font-semibold w-20
                                    ${isActive ? 'text-blue-600' : 'text-slate-600'}`
                                }>
                                    {stage}
                                </p>
                            </div>

                            {index < stages.length - 1 && (
                                <div className={`flex-1 h-1 transition-colors duration-300
                                    ${isCompleted ? 'bg-green-500' : 'bg-slate-300'}`
                                } />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default BillStatusChart;
