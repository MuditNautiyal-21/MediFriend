
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface DisputeLetterProps {
    letter: string;
}

const DisputeLetter: React.FC<DisputeLetterProps> = ({ letter }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(letter).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const renderFormattedLine = (line: string) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <details className="bg-white rounded-xl shadow-lg border border-slate-200 open:ring-2 open:ring-blue-500 open:shadow-xl" open>
            <summary className="p-6 cursor-pointer list-none flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Generated Dispute Letter</h2>
                <svg className="w-6 h-6 transform transition-transform duration-300 details-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <div className="p-6 border-t border-slate-200">
                <div className="relative bg-slate-100 p-4 rounded-lg font-mono text-sm text-slate-800 border">
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 bg-slate-200 hover:bg-slate-300 rounded-md transition-colors"
                        aria-label="Copy to clipboard"
                    >
                        {copied ? <CheckIcon /> : <CopyIcon />}
                    </button>
                    <pre className="whitespace-pre-wrap">
                        {letter.replace(/\*{3,}/g, '').split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {renderFormattedLine(line)}
                                {'\n'}
                            </React.Fragment>
                        ))}
                    </pre>
                </div>
                <p className="text-sm text-slate-500 mt-2">The letter is displayed above for easy copying. You can paste it into an email or document.</p>
            </div>
        </details>
    );
};

export default DisputeLetter;
