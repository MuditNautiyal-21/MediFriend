# MediFriend

**AI Powered Medical Billing Assistant and Patient Advocacy Platform**

MediFriend is an intelligent healthcare financial assistant designed to demystify medical bills. Leveraging Google Gemini and OCR technology, it ingests unstructured medical invoices, detects billing errors (such as CPT and ICD mismatches), and automates the generation of dispute letters to empower patients to navigate the complex US healthcare system.

## Key Features

**1. AI Driven Bill Analysis**
* **OCR Ingestion:** Instantly parses PDF and Image medical bills to extract line items, dates, and service codes.
* **Smart Error Detection:** Cross references extracted CPT and ICD codes against standard billing rules to identify potential overcharges, duplicate billings, or upcoding.

**2. Automated Advocacy Agents**
* **Dispute Letter Generator:** Uses Google Gemini (LLM) to draft legally sound dispute letters ready to be sent to providers or insurance companies.
* **Legal Aid Connection:** Matches high complexity cases with relevant legal representation.

**3. Financial Intelligence Dashboard**
* **Spending Visualization:** Interactive analytics for tracking medical expenses, potential savings, and dispute statuses.
* **Financial Assistance:** Integrated tools to connect patients with medical loan providers for urgent debt relief.

## Tech Stack

* **Frontend:** React 18 (TypeScript)
* **Build System:** Vite
* **Styling:** Tailwind CSS
* **Visualization:** Recharts
* **AI Integration:** Google Gemini (via geminiService.ts)
* **State Management:** React Hooks

## System Architecture

The application uses a modular component based architecture with a flat structure for ease of access:

* **src/components:** Contains all UI elements including Charts (BillStatusChart, DonutChart), Legal Tools (DisputeLetter, RepresentationConsent), and Core Logic (FileUpload, MedicalCodesDisplay).
* **src/services:** Handles external API integrations, specifically the Google Gemini AI service.
* **src/mock:** Stores static analysis data used for demonstration purposes.
* **src/types.ts:** Centralized TypeScript definitions for billing entities and patient data.

## Achievements

**Winner: AI For Good Hackathon**
Recognized for the innovative use of Agentic AI in solving real world healthcare transparency issues.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [https://github.com/MuditNautiyal-21/MediFriend.git](https://github.com/MuditNautiyal-21/MediFriend.git)
   ```
1. **Install Dependencies**
   ```bash
   git clone [https://github.com/MuditNautiyal-21/MediFriend.git](https://github.com/MuditNautiyal-21/MediFriend.git)
   ```
1. **Set up Environment Variables Create a .env file in the root directory and add your Google Gemini API key**
   ```bash
   git clone [https://github.com/MuditNautiyal-21/MediFriend.git](https://github.com/MuditNautiyal-21/MediFriend.git)
   ```
1. **Run the Development Server**
   ```bash
   git clone [https://github.com/MuditNautiyal-21/MediFriend.git](https://github.com/MuditNautiyal-21/MediFriend.git)
   ```
