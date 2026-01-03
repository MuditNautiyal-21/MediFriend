export interface FileData {
  name: string;
  type: string;
  content: string[]; // data URLs for preview
  base64: string[];  // base64 content for API
}

export interface BillSummary {
  provider_name: string;
  patient_name: string;
  account_number: string;
  dates_of_service: string;
  total_amount_due: string;
}

export interface MedicalCode {
  code: string;
  description: string; // The original description from the bill
  explanation: string; // The AI's explanation of the code
  cost: string;
}

export interface CodeExplanation {
  cpt_codes: MedicalCode[];
  icd10_codes: MedicalCode[];
  hcpcs_codes: MedicalCode[];
}

export interface ErrorAnalysis {
  duplicate_entries: string[];
  other_potential_errors: string[];
}

export interface AnalysisResult {
  summary: BillSummary;
  codes: CodeExplanation;
  errors: ErrorAnalysis;
}

export interface AppState {
  fileData: FileData | null;
  analysisResult: AnalysisResult | null;
  disputeLetter: string | null;
  isLoading: boolean;
  isGeneratingLetter: boolean;
  error: string | null;
}