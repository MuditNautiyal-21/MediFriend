
import React from 'react';
import { FileData } from '../types';

interface DocumentPreviewProps {
  fileData: FileData;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ fileData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 h-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Uploaded Document: {fileData.name}</h2>
      <div className="overflow-auto bg-slate-100 p-2 md:p-4 rounded-lg" style={{maxHeight: '80vh'}}>
      {fileData.content.map((pageDataUrl, index) => (
        <img 
            key={index} 
            src={pageDataUrl} 
            alt={`Page ${index + 1} of ${fileData.name}`} 
            className="w-full h-auto object-contain mb-4 shadow-md rounded"
        />
      ))}
      </div>
    </div>
  );
};

export default DocumentPreview;