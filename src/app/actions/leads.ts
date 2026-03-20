
'use server';

import { db } from '@/lib/firebase-admin';
import { automatedLeadQualificationAndResponse } from '@/ai/flows/automated-lead-qualification-and-response-flow';
import { Timestamp } from 'firebase-admin/firestore';

export async function submitLeadAction(formData: { name: string; email: string; inquiry: string }) {
  try {
    // 1. Process with GenAI flow
    const aiResult = await automatedLeadQualificationAndResponse({ inquiry: formData.inquiry });

    // 2. Save to Firestore
    const leadData = {
      ...formData,
      ...aiResult,
      createdAt: Timestamp.now(),
      status: 'new'
    };

    await db.collection('leads').add(leadData);

    return { success: true };
  } catch (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error: 'Failed to process lead request.' };
  }
}
