# MediFriend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Winner: AI For Good Hackathon**
>
> *An intelligent patient advocacy platform demystifying medical billing through Agentic AI and OCR.*

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
   npm install
   ```
1. **Set up Environment Variables Create a .env file in the root directory and add your Google Gemini API key**
   ```bash
   GEMINI_API_KEY=your_key_here
   ```
1. **Run the Development Server**
   ```bash
   npm run dev
   ```
