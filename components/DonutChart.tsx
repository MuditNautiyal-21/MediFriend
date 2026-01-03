
import React from 'react';

const SpendingRatioChart: React.FC = () => {
  // Mock data and colors
  const data = [
    { label: 'Hospital Stays', value: 45, color: '#3b82f6' },
    { label: 'Specialist Visits', value: 25, color: '#8b5cf6' },
    { label: 'Prescriptions', value: 15, color: '#10b981' },
    { label: 'Lab Work', value: 15, color: '#f59e0b' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg viewBox="-1.2 -1.2 2.4 2.4" style={{ transform: 'rotate(-90deg)' }}>
            {data.map(item => {
              const percent = item.value / total;
              const [startX, startY] = getCoordinatesForPercent(cumulative);
              cumulative += percent;
              const [endX, endY] = getCoordinatesForPercent(cumulative);
              const largeArcFlag = percent > 0.5 ? 1 : 0;

              const pathData = [
                `M ${startX} ${startY}`, // Move
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
              ].join(' ');

              return <path key={item.label} d={pathData} stroke={item.color} strokeWidth="0.4" fill="transparent" />;
            })}
          </svg>
        </div>
        <div className="text-center mt-2">
            <p className="text-xl font-bold text-slate-800">$48.6k</p>
            <p className="text-xs text-slate-500">Total Spent</p>
        </div>
      </div>
      <div className="w-full">
        <ul className="space-y-2">
          {data.map(item => (
            <li key={item.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600">{item.label}</span>
              </div>
              <span className="font-semibold text-slate-800">{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpendingRatioChart;