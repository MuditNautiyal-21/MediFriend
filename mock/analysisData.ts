
import { AnalysisResult } from '../types';

export const mockAnalysisData: AnalysisResult = {
  summary: {
    provider_name: 'JACKSON PURCHASE MED CTR',
    patient_name: 'THANA MCGARY',
    account_number: '907055417',
    dates_of_service: '10/11/2022-10/12/2022',
    total_amount_due: '$8,311.46',
  },
  codes: {
    cpt_codes: [
      {
        code: '0110',
        description: 'Room and Care',
        explanation: 'Charges for the room, board, and nursing services during the inpatient stay.',
        cost: '$1,545.34',
      },
      {
        code: '036600',
        description: 'ARTERIAL PUNCTURE',
        explanation: 'A procedure to obtain a blood sample from an artery, typically to measure blood gas levels.',
        cost: '$372.28',
      },
      {
        code: '080053',
        description: 'COMP METABOLIC PANEL',
        explanation: 'A comprehensive blood test that measures 14 different substances in the blood to check general health, including kidney and liver function.',
        cost: '$434.60',
      },
      {
        code: '085025',
        description: 'CBC AUTO DIFF',
        explanation: 'Complete Blood Count with automated differential. A blood test to evaluate overall health and detect a wide range of disorders.',
        cost: '$220.95',
      },
      {
        code: '071045',
        description: 'XR CHEST SGL VIEW',
        explanation: 'A single-view X-ray of the chest, used to examine the lungs, heart, and chest wall.',
        cost: '$256.78',
      },
      {
        code: '094640',
        description: 'HAND HELD NEB SUBQ',
        explanation: 'A treatment using a nebulizer, a device that turns liquid medicine into a mist for inhalation.',
        cost: '$116.55',
      },
    ],
    icd10_codes: [],
    hcpcs_codes: [],
  },
  errors: {
    duplicate_entries: [
      'The charge for "CBC AUTO DIFF" at $220.95 appears on both 10/11/22 and 10/12/22.',
      'The charge for "HAND HELD NEB SUBQ" at $116.55 appears multiple times on 10/12/22.',
    ],
    other_potential_errors: [
      'Multiple charges for "CHEST PHYSIO SUBSQ" on the same day (10/12/22) may require review for medical necessity.',
    ],
  },
};
