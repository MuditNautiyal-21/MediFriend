
import React from 'react';

const LineChart: React.FC = () => {
    // Mock data for the chart
    const data = [
        { month: 'Jan', value: 3200 },
        { month: 'Feb', value: 1800 },
        { month: 'Mar', value: 2400 },
        { month: 'Apr', value: 4100 },
        { month: 'May', value: 875 },
        { month: 'Jun', value: 2600 },
    ];

    const chartHeight = 250;
    const chartWidth = 600;
    const yMax = Math.max(...data.map(d => d.value)) * 1.1; // Add 10% padding
    const xStep = chartWidth / (data.length -1);
    
    const points = data.map((d, i) => {
        const x = i * xStep;
        const y = chartHeight - (d.value / yMax) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="min-w-[600px]">
                {/* Y-axis lines */}
                {[0.25, 0.5, 0.75, 1].map(p => (
                    <line key={p} x1="0" y1={chartHeight * (1 - p)} x2={chartWidth} y2={chartHeight * (1 - p)} stroke="#e2e8f0" strokeWidth="1" />
                ))}

                {/* Data line */}
                <polyline
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    points={points}
                />

                {/* Data points */}
                {data.map((d, i) => {
                    const x = i * xStep;
                    const y = chartHeight - (d.value / yMax) * chartHeight;
                    return (
                        <g key={d.month}>
                           <circle cx={x} cy={y} r="4" fill="#4f46e5" />
                           <text x={x} y={chartHeight - 5} textAnchor="middle" fill="#64748b" fontSize="12">{d.month}</text>
                        </g>
                    )
                })}
            </svg>
        </div>
    );
};

export default LineChart;
