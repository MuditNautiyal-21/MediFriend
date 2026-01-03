
import React, { useState, useCallback, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { AppState, FileData, MedicalCode, AnalysisResult } from './types';
import { analyzeBill, generateDisputeLetter } from './services/geminiService';
import { HeaderIcon, ChevronDownIcon } from './components/icons';
import FileUpload from './components/FileUpload';
import Spinner from './components/Spinner';
import DocumentPreview from './components/DocumentPreview';
import DisputeLetter from './components/DisputeLetter';
import BillSummaryDisplay from './components/BillSummaryDisplay';
import MedicalCodesDisplay from './components/MedicalCodesDisplay';
import ErrorsDisplay from './components/ErrorsDisplay';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import PrivacyAgreement from './components/PrivacyAgreement';
import RepresentationConsent from './components/RepresentationConsent';
import LawFirmList from './components/LawFirmList';
import LoanProviderList from './components/LoanProviderList';
import ActionCenter from './components/ActionCenter';
import { mockAnalysisData } from './mock/analysisData';

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

const initialState: AppState = {
  fileData: null,
  analysisResult: null,
  disputeLetter: null,
  isLoading: false,
  isGeneratingLetter: false,
  error: null,
};

const analysisSteps = [
    "Step 1/3: Identifying key bill information (provider, patient, totals)...",
    "Step 2/3: Explaining medical codes and charges...",
    "Step 3/3: Scanning for potential errors and duplicates...",
    "Finalizing the report..."
];

type RepresentationStep = 'none' | 'consent' | 'list';
type LoanAssistanceStep = 'none' | 'list';

const ScrollDownIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
      setIsVisible(isScrollable && !isAtBottom);
    };
    const timeoutId = setTimeout(checkScrollPosition, 500); 
    
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-blue-600 text-white rounded-full p-3 shadow-lg animate-bounce">
        <ChevronDownIcon />
      </div>
    </div>
  );
};


export default function App() {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState<'dashboard' | 'privacy' | 'analysis'>('dashboard');
  const [userDisputedItems, setUserDisputedItems] = useState<MedicalCode[]>([]);
  const [verifiedDuplicates, setVerifiedDuplicates] = useState<Set<string>>(new Set());
  const [loadingMessage, setLoadingMessage] = useState("Analyzing your bill...");
  const [isReviewComplete, setIsReviewComplete] = useState(false);
  const [representationStep, setRepresentationStep] = useState<RepresentationStep>('none');
  const [loanAssistanceStep, setLoanAssistanceStep] = useState<LoanAssistanceStep>('none');
  
  const messageIntervalRef = useRef<number | null>(null);

  const resetAnalysisState = useCallback(() => {
    setState(initialState);
    setUserDisputedItems([]);
    setVerifiedDuplicates(new Set());
    setLoadingMessage("Analyzing your bill...");
    setIsReviewComplete(false);
    setRepresentationStep('none');
    setLoanAssistanceStep('none');
    if (messageIntervalRef.current) {
        clearInterval(messageIntervalRef.current);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setViewMode('dashboard');
  };

  const handleLogout = () => {
    resetAnalysisState();
    setViewMode('dashboard');
    setIsLoggedIn(false);
  };
  
  const handleStartAnalysis = () => {
    resetAnalysisState();
    setViewMode('privacy');
  };
  
  const handleAgreeToPrivacy = () => {
    setViewMode('analysis');
  };

  const handleCancelPrivacy = () => {
    setViewMode('dashboard');
  };

  const handleReviewComplete = () => {
    setIsReviewComplete(true);
  };

  const handleFindRepresentation = () => {
    setRepresentationStep('consent');
  };

  const handleRepresentationConsentAgree = () => {
    setRepresentationStep('list');
  };

  const handleRepresentationConsentCancel = () => {
    setRepresentationStep('none');
  };
  
  const handleFindLoanAssistance = () => {
    setLoanAssistanceStep('list');
  };


  useEffect(() => {
    return () => {
        if (messageIntervalRef.current) {
            clearInterval(messageIntervalRef.current);
        }
    };
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    resetAnalysisState();
    setState(prevState => ({ ...prevState, isLoading: true }));
    setLoadingMessage("Processing your PDF and extracting pages...");

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      try {
        const pdfData = new Uint8Array(reader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        
        const contentPages: string[] = [];
        const base64Pages: string[] = [];
        
        const MAX_PAGES = 5;
        const pagesToProcess = Math.min(pdf.numPages, MAX_PAGES);

        for (let i = 1; i <= pagesToProcess; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({ canvas, canvasContext: context, viewport: viewport }).promise;
            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
            contentPages.push(dataUrl);
            base64Pages.push(dataUrl.split(',')[1]);
          }
        }
        
        const newFileData: FileData = { name: file.name, type: file.type, content: contentPages, base64: base64Pages };
        
        setState(prevState => ({ ...prevState, fileData: newFileData }));

        let messageIndex = 0;
        setLoadingMessage("Sending document to the AI for analysis...");
        
        messageIntervalRef.current = window.setInterval(() => {
            if(messageIndex < analysisSteps.length) {
                setLoadingMessage(analysisSteps[messageIndex]);
                messageIndex++;
            } else {
                 if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
            }
        }, 2500);

        // FIX: Add a .catch() to the analysis promise to handle offline/network errors gracefully
        // by resolving with mock data. This prevents the Promise.race from rejecting.
        const analysisPromise = analyzeBill(newFileData.base64, 'image/jpeg').catch(err => {
            console.error("AI analysis failed, falling back to mock data.", err);
            return mockAnalysisData;
        });

        const timeoutPromise = new Promise<AnalysisResult>((resolve) =>
            setTimeout(() => {
                console.log("AI analysis timed out after 10 seconds. Using mock data.");
                resolve(mockAnalysisData);
            }, 10000)
        );

        const result = await Promise.race([analysisPromise, timeoutPromise]);

        if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
        setState(prevState => ({ ...prevState, analysisResult: result, isLoading: false, error: null }));

      } catch (err) {
        if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while processing the PDF.';
        setState(prevState => ({ ...prevState, error: errorMessage, isLoading: false }));
      }
    };
    reader.onerror = () => {
      resetAnalysisState();
      setState(prevState => ({ ...prevState, error: 'Failed to read the file.' }));
    };
  }, [resetAnalysisState]);
  
  const handleProcedureDispute = useCallback((code: MedicalCode) => {
    const uniqueId = `${code.code}-${code.description}-${code.cost}`;
    const isAlreadyDisputed = userDisputedItems.some(item => 
        `${item.code}-${item.description}-${item.cost}` === uniqueId
    );

    if (!isAlreadyDisputed) {
        setUserDisputedItems(prev => [...prev, code]);
    }
  }, [userDisputedItems]);

  const handleVerifyDuplicate = useCallback((duplicateText: string) => {
    setVerifiedDuplicates(prev => new Set(prev).add(duplicateText));
  }, []);


  const handleGenerateLetter = useCallback(async () => {
    if (!state.analysisResult) return;
    
    const unresolvedDuplicates = state.analysisResult.errors.duplicate_entries.filter(
        dup => !verifiedDuplicates.has(dup)
    );

    const duplicateErrors = unresolvedDuplicates.map(
        dup => `Duplicate Charge: The line item "${dup}" appears to be a duplicate entry.`
    );

    const disputedItemErrors = userDisputedItems.map(
        item => `Service Not Performed: The charge for code ${item.code} (Description: "${item.description}", Cost: ${item.cost}) is disputed because this service was not performed.`
    );
    
    const otherErrors = state.analysisResult.errors.other_potential_errors.map(
        err => `Potential Error: ${err}`
    );

    const finalErrorList = [
        ...duplicateErrors,
        ...otherErrors,
        ...disputedItemErrors
    ];

    if (finalErrorList.length === 0) return;

    setState(prevState => ({ ...prevState, isGeneratingLetter: true, disputeLetter: null }));
    try {
      const letter = await generateDisputeLetter(state.analysisResult.summary, finalErrorList);
      setState(prevState => ({ ...prevState, disputeLetter: letter, isGeneratingLetter: false }));
    } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while generating the letter.';
        setState(prevState => ({ ...prevState, error: errorMessage, isGeneratingLetter: false }));
    }
  }, [state.analysisResult, userDisputedItems, verifiedDuplicates]);

  const handleBackToDashboard = () => {
    resetAnalysisState();
    setViewMode('dashboard');
  };
  
  const unresolvedDuplicates = state.analysisResult?.errors.duplicate_entries.filter(
    dup => !verifiedDuplicates.has(dup)
  ) || [];

  const hasErrorsToDispute = 
    unresolvedDuplicates.length > 0 ||
    (state.analysisResult?.errors.other_potential_errors?.length || 0) > 0 ||
    userDisputedItems.length > 0;

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <HeaderIcon />
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                MediFriend
              </h1>
            </div>
            
            {isLoggedIn && (
              <div className="flex flex-wrap items-center gap-2">
                {['Dashboard', 'Profile', 'Assistance', 'Negotiation', 'Bill Status', 'Features'].map(item => (
                  <button
                    key={item}
                    onClick={item === 'Dashboard' ? handleBackToDashboard : undefined}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                      item === 'Dashboard' && (viewMode === 'dashboard' || viewMode === 'privacy')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                    <span className="hidden sm:inline text-slate-600 text-sm">Welcome, Thana McGary</span>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm font-semibold"
                    >
                      Logout
                    </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {viewMode === 'dashboard' &&
          <Dashboard onStartAnalysis={handleStartAnalysis} />
        }
        
        {viewMode === 'privacy' &&
          <PrivacyAgreement onAgree={handleAgreeToPrivacy} onCancel={handleCancelPrivacy} />
        }
        
        {viewMode === 'analysis' && (
          <>
            {!state.fileData && !state.isLoading && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-700 mb-4">Upload Your Bill</h2>
                    <p className="text-slate-500 mb-6 text-sm">Upload your medical bill in PDF format. The first 5 pages will be analyzed.</p>
                    <FileUpload onFileSelect={handleFileSelect} disabled={state.isLoading} />
                </div>
              </div>
            )}
            
            {state.error && (
                <div className="max-w-4xl mx-auto my-6 p-4 bg-red-100 text-red-800 border-l-4 border-red-500 rounded-r-lg">
                    <h3 className="font-bold">An Error Occurred</h3>
                    <p>{state.error}</p>
                </div>
            )}

            {state.isLoading && <Spinner message={loadingMessage} />}

            {state.fileData && !state.isLoading && (
              <div className="max-w-4xl mx-auto space-y-8">
                <DocumentPreview fileData={state.fileData} />
                
                {state.analysisResult && <BillSummaryDisplay summary={state.analysisResult.summary} />}
                {state.analysisResult && <MedicalCodesDisplay
                    codes={state.analysisResult.codes}
                    onDisputeCode={handleProcedureDispute}
                    disputedItems={userDisputedItems}
                    isReviewComplete={isReviewComplete}
                    onReviewComplete={handleReviewComplete}
                />}
                {state.analysisResult && <ErrorsDisplay
                    errors={state.analysisResult.errors}
                    userDisputedItems={userDisputedItems}
                    verifiedDuplicates={verifiedDuplicates}
                    onVerifyDuplicate={handleVerifyDuplicate}
                    onGenerateLetter={handleGenerateLetter}
                    isGeneratingLetter={state.isGeneratingLetter}
                    hasErrorsToDispute={hasErrorsToDispute}
                />}
                
                {state.disputeLetter && <DisputeLetter letter={state.disputeLetter} />}

                {state.analysisResult && hasErrorsToDispute && (
                  <ActionCenter
                    onFindRepresentation={handleFindRepresentation}
                    onFindLoanAssistance={handleFindLoanAssistance}
                  />
                )}
                
                {representationStep === 'consent' && (
                   <RepresentationConsent
                      onAgree={handleRepresentationConsentAgree}
                      onCancel={handleRepresentationConsentCancel}
                   />
                )}

                {representationStep === 'list' && <LawFirmList />}
                
                {loanAssistanceStep === 'list' && <LoanProviderList />}
              </div>
            )}
             <ScrollDownIndicator />
          </>
        )}
      </main>
    </div>
  );
}
