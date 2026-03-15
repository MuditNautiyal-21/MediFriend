# 🏥 MediFriend — AI-Powered Medical Billing Advocate

Intelligent patient advocacy platform that demystifies medical bills through OCR, LLM analysis, and automated dispute generation.

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **🏆 Winner - AI For Good Hackathon, University at Buffalo**

---

## The Problem

Over **80% of medical bills in the US contain errors** — duplicate charges, incorrect CPT codes, upcoded procedures. Patients receive complex itemized statements they can't interpret, overpay by thousands of dollars, and have no easy way to dispute charges. The system is designed to be opaque.

## The Solution

**MediFriend** acts as an AI-powered patient advocate. Upload a medical bill (PDF), and it will:

1. **Extract** every line item, CPT/ICD code, and charge using OCR
2. **Analyze** for billing errors — duplicates, upcoding, mismatched codes
3. **Generate** a legally-structured dispute letter ready to send to the provider
4. **Connect** patients with legal representation and financial assistance if needed

---

## Demo

### Dashboard
Track all your analyzed bills, spending patterns, and potential savings in one place.

![Dashboard](screenshots/dashboard.png)

### HIPAA-Compliant Upload
Privacy-first design with full HIPAA consent flow before any document is processed.

![HIPAA Consent](screenshots/hipaa_consent.png)

![Upload](screenshots/upload.png)

### Bill Ingestion & OCR
Upload a PDF medical bill — the system extracts and displays the original document alongside structured data.

![Bill Document](screenshots/bill_document.png)

### AI-Powered Analysis
Extracted CPT codes, service descriptions, and charges are parsed into a reviewable summary. Each line item is individually expandable.

![Bill Analysis](screenshots/bill_analysis.png)

### Error Detection
The system flags potential billing errors — duplicate entries, same-day charges, and codes that may require medical necessity review. Patients can confirm or dispute each finding.

![Error Detection](screenshots/error_detection.png)

### Automated Dispute Letter
One click generates a formal, legally-structured dispute letter referencing specific account numbers, dates of service, and flagged discrepancies — ready to send to the provider's billing department.

![Dispute Letter](screenshots/dispute_letter.png)

---

## Architecture

```mermaid
flowchart LR
    A["📄 PDF Upload"] --> B["🔒 HIPAA Consent"]
    B --> C["👁️ OCR Extraction"]
    C --> D["🤖 Gemini LLM"]
    D --> E["⚠️ Error Detection"]
    E --> F["📝 Dispute Letter"]
    F --> G["⚖️ Legal / Financial Aid"]

    subgraph D["🤖 Gemini LLM"]
        direction TB
        D1["Entity Extraction"]
        D2["CPT/ICD Validation"]
        D3["Duplicate Detection"]
    end

    style A fill:#1a1a2e,stroke:#3b82f6,color:#fff
    style B fill:#16213e,stroke:#10b981,color:#fff
    style C fill:#16213e,stroke:#3b82f6,color:#fff
    style E fill:#0f3460,stroke:#f59e0b,color:#fff
    style F fill:#0f3460,stroke:#3b82f6,color:#fff
    style G fill:#1a1a2e,stroke:#10b981,color:#fff
    style D1 fill:#533483,stroke:#3b82f6,color:#fff
    style D2 fill:#533483,stroke:#3b82f6,color:#fff
    style D3 fill:#533483,stroke:#3b82f6,color:#fff
```

---

## Key Features

**AI-Driven Bill Analysis**
- OCR ingestion of PDF medical bills (up to 5 pages)
- Extracts line items, CPT/ICD codes, dates of service, and provider details
- Cross-references codes against standard billing rules to flag overcharges, duplicates, and upcoding

**Automated Advocacy**
- Generates legally-structured dispute letters with specific account numbers and discrepancy details
- Connects high-complexity cases with legal representation
- Integrated financial assistance for patients needing urgent debt relief

**Financial Intelligence**
- Spending visualization by category (hospital stays, specialist visits, prescriptions, lab work)
- Bill status tracking across the full lifecycle (Analyzed → Disputed → Resolved)
- Lifetime savings tracker across all analyzed bills

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18 (TypeScript) |
| Build System | Vite |
| Styling | Tailwind CSS |
| Visualization | Recharts |
| AI / LLM | Google Gemini API |
| State Management | React Hooks |

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/MuditNautiyal-21/MediFriend.git
   cd MediFriend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```
   GEMINI_API_KEY=your_key_here
   ```

   > Google Gemini API offers a free tier — [get your key here](https://ai.google.dev/).

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open** `http://localhost:5173` in your browser

---

## Project Structure

```
MediFriend/
├── components/
│   ├── FileUpload.tsx          # PDF upload with drag-and-drop
│   ├── BillStatusChart.tsx     # Bill lifecycle status tracker
│   ├── DonutChart.tsx          # Spending breakdown visualization
│   ├── MedicalCodesDisplay.tsx # CPT/ICD code renderer
│   ├── DisputeLetter.tsx       # AI-generated dispute letter view
│   └── RepresentationConsent.tsx # Legal consent flow
├── services/
│   └── geminiService.ts        # Google Gemini API integration
├── mock/
│   └── ...                     # Demo data for presentation mode
├── App.tsx                     # Main application entry
├── types.ts                    # TypeScript type definitions
└── index.html
```

---

## My Role

Built as part of a **3-person team** at the **AI For Good Hackathon** (University at Buffalo). I was one of two developers, responsible for:

- Planning the end-to-end data flow: PDF upload → OCR → Gemini entity extraction → error detection → dispute generation
- Co-building the Gemini API integration layer (`geminiService.ts`) for structured medical data extraction
- Co-building the CPT/ICD code validation and duplicate charge detection logic
- Co-building the automated dispute letter generation pipeline

---

## Achievements

**🏆 Winner — AI For Good Hackathon, University at Buffalo**

Recognized for the innovative use of Agentic AI in solving real-world healthcare transparency issues.

---

> [!NOTE]
> This application uses mock data for demonstration purposes. The OCR and Gemini analysis pipeline is fully functional when provided with a valid API key.
