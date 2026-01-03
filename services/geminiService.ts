
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, BillSummary } from '../types';
import { mockAnalysisData } from '../mock/analysisData';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      description: "A summary of the medical bill.",
      properties: {
        provider_name: { type: Type.STRING, description: "Name of the hospital or provider." },
        patient_name: { type: Type.STRING, description: "Name of the patient." },
        account_number: { type: Type.STRING, description: "The bill's account number." },
        dates_of_service: { type: Type.STRING, description: "The date or range of dates for the services." },
        total_amount_due: { type: Type.STRING, description: "The total amount owed." },
      },
      required: ["provider_name", "patient_name", "account_number", "dates_of_service", "total_amount_due"],
    },
    codes: {
      type: Type.OBJECT,
      description: "Explanation of medical codes found on the bill.",
      properties: {
        cpt_codes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: { 
              code: { type: Type.STRING },
              description: { type: Type.STRING, description: "The original line item description for this code as it appears on the bill." },
              explanation: { type: Type.STRING },
              cost: { type: Type.STRING, description: "The cost or charge for this specific code/procedure from the bill." }
            },
            required: ["code", "description", "explanation", "cost"],
          },
        },
        icd10_codes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: { 
              code: { type: Type.STRING }, 
              description: { type: Type.STRING, description: "The original line item description for this code as it appears on the bill." },
              explanation: { type: Type.STRING },
              cost: { type: Type.STRING, description: "The cost or charge for this specific code/procedure from the bill." }
            },
            required: ["code", "description", "explanation", "cost"],
          },
        },
        hcpcs_codes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: { 
              code: { type: Type.STRING }, 
              description: { type: Type.STRING, description: "The original line item description for this code as it appears on the bill." },
              explanation: { type: Type.STRING },
              cost: { type: Type.STRING, description: "The cost or charge for this specific code/procedure from the bill." }
            },
            required: ["code", "description", "explanation", "cost"],
          },
        },
      },
    },
    errors: {
      type: Type.OBJECT,
      description: "Analysis of potential billing errors. Separate duplicates from other issues.",
      properties: {
        duplicate_entries: {
            type: Type.ARRAY,
            description: "List of entries that appear to be exact duplicates of another line item.",
            items: { type: Type.STRING },
        },
        other_potential_errors: {
            type: Type.ARRAY,
            description: "List of other potential errors found, such as services that seem unnecessary, upcoding, or unbundling.",
            items: { type: Type.STRING },
        },
      },
      required: ["duplicate_entries", "other_potential_errors"],
    },
  },
  required: ["summary", "codes", "errors"],
};

const ANALYSIS_PROMPT = `
You are a meticulous medical bill auditor and data extraction expert. Your audience is a layperson with no medical billing knowledge. Analyze the provided medical bill images, which are pages from a single document.
Your task is to extract specific information from across all pages and identify potential issues.
For each medical code (CPT, ICD-10, HCPCS), you must do three things:
1. Extract the exact line-item description for that code as it is written on the bill.
2. Provide a simple, clear explanation of what the procedure or diagnosis code means in a general sense. Use the Healthcare Common Procedure Coding System (HCPCS) and other standard medical references as a basis for your explanation. Write it for someone who is not a medical professional.
3. Extract the associated cost or charge for that specific line item from the bill.
Critically, you must also identify potential errors. Separate your findings into two categories:
- In the 'duplicate_entries' field, list any line items that appear to be exact duplicates.
- In the 'other_potential_errors' field, list any other potential issues you find (e.g., mismatched codes, potential upcoding, etc.).
Respond ONLY with a single, valid JSON object that conforms to the provided schema.
Do not include any other text, explanations, or markdown formatting like \`\`\`json.
`;

export const analyzeBill = async (base64Images: string[], mimeType: string): Promise<AnalysisResult> => {
  // Note: The primary offline/error handling is now in App.tsx via a .catch() on the promise.
  // This function will throw on failure, and the caller will handle the fallback.
  try {
    const imageParts = base64Images.map(img => ({
      inlineData: { data: img, mimeType }
    }));

    if (imageParts.length === 0) {
      throw new Error("No pages could be extracted from the PDF.");
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          ...imageParts,
          { text: ANALYSIS_PROMPT }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim().replace(/^```json/, '').replace(/```$/, '').trim();
    try {
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as AnalysisResult;
    } catch(e) {
        console.error("Failed to parse JSON from model response:", jsonText);
        throw new Error("The AI returned a response that was not valid JSON. Please try again.");
    }

  } catch (error) {
    console.error("Error analyzing bill:", error);
    if (error instanceof Error && error.message.includes("not valid JSON")) {
        throw error;
    }
    throw new Error("Failed to analyze the bill with AI. The model may have returned an unexpected format or an error occurred.");
  }
};


// FIX: Add a detailed mock letter for offline/error fallback.
const mockDisputeLetter = `[Your Name]
[Your Address]
[City, State, Zip Code]
[Your Phone Number]
[Your Email Address]

[Date]

Billing Department
[Provider Name from Summary]
[Provider Address - Placeholder]
[City, State, Zip Code]

Subject: Dispute of Charges for Account Number: [Account Number from Summary]

To Whom It May Concern,

I am writing to formally dispute several charges on my recent medical bill for patient [Patient Name from Summary], with account number [Account Number from Summary] for services rendered on [Dates of Service from Summary].

After careful review of the itemized statement, I have identified the following discrepancies which I request you investigate:

*   [This is a placeholder for the list of errors that would be generated by the AI. Since the AI call failed, please review your bill and manually list the disputed items here based on the analysis provided.]
*   Example: Duplicate charge for procedure XYZ on [Date].
*   Example: Billed for service ABC which was not performed.

I request a thorough review of these items and that you provide me with a corrected, itemized bill. Please also send a written response detailing the outcome of your investigation for each disputed charge.

I also request that you place my account on hold during this investigation period, ensuring no collection activities are initiated and no late fees are applied.

Thank you for your prompt attention to this matter. I look forward to your response and to resolving this issue amicably.

Sincerely,

_________________________
[Your Printed Name]
`;

export const generateDisputeLetter = async (analysisSummary: BillSummary, errorList: string[]): Promise<string> => {
   if (errorList.length === 0) {
    return "No errors were provided to generate a dispute letter.";
  }
  const prompt = `
    You are a professional medical billing advocate writing on behalf of a patient. Your task is to draft a formal dispute letter to a medical provider's billing department based on the provided bill summary and a list of specific errors. The tone must be professional, polite, and firm.

    **Letter Content Requirements:**

    1.  **Patient & Bill Information:** Clearly state the patient's name (${analysisSummary.patient_name}), account number (${analysisSummary.account_number}), and date(s) of service (${analysisSummary.dates_of_service}) to identify the bill in question.

    2.  **Purpose of Letter:** Begin by stating the purpose is to formally dispute specific charges and request a review.

    3.  **Detailed List of Discrepancies:** This is the core of the letter. Create a clear, bulleted or numbered list. For each item in the "List of Errors to Dispute", rephrase it professionally. For example:
        - If an error starts with "Duplicate Charge:", write something like "This charge appears to be a duplicate of another line item." and include the details.
        - If an error starts with "Service Not Performed:", write "This service was billed but was not performed." and include the details of the service, code, and cost.
        - For other errors, describe the issue based on the provided text.

    4.  **Requested Actions:** Conclude the body of the letter by clearly requesting the following actions:
        - A thorough review of the listed discrepancies.
        - A corrected, itemized bill to be sent to the patient.
        - A written response detailing the outcome of their review.
        - Confirmation that the account will be placed on hold, with no collection activities or late fees, while this dispute is investigated.

    5.  **Closing:** End with a professional closing (e.g., "Sincerely,") and placeholders for the patient's signature, full printed name, address, and phone number.

    **Data to Use:**
    ---
    **Bill Summary:** ${JSON.stringify(analysisSummary)}
    ---
    **List of Errors to Dispute:**
    ${errorList.join('\n')}
    ---

    Generate ONLY the text of the letter. Do not include any commentary before or after.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("AI dispute letter generation failed. Returning local fallback letter.", error);
        // Offline/Error Fallback: Populate the mock letter with summary details.
        let letter = mockDisputeLetter;
        letter = letter.replace('[Provider Name from Summary]', analysisSummary.provider_name || '[Provider Name]');
        letter = letter.replace('[Account Number from Summary]', analysisSummary.account_number || '[Account Number]');
        letter = letter.replace('[Patient Name from Summary]', analysisSummary.patient_name || '[Patient Name]');
        letter = letter.replace('[Dates of Service from Summary]', analysisSummary.dates_of_service || '[Dates of Service]');
        letter = letter.replace('[Your Name]', analysisSummary.patient_name || '[Patient Name]');
        letter = letter.replace('[Your Printed Name]', analysisSummary.patient_name || '[Patient Name]');

        const errorSection = errorList.map(e => `*   ${e}`).join('\n');
        letter = letter.replace('*   [This is a placeholder for the list of errors that would be generated by the AI. Since the AI call failed, please review your bill and manually list the disputed items here based on the analysis provided.]', errorSection);

        return letter;
    }
};
