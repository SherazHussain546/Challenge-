'use server';
/**
 * @fileOverview This file defines a Genkit flow for automated lead qualification and response generation.
 *
 * - automatedLeadQualificationAndResponse - A function that processes rental inquiries, qualifies leads,
 *   and generates professional responses.
 * - AutomatedLeadQualificationAndResponseInput - The input type for the automatedLeadQualificationAndResponse function.
 * - AutomatedLeadQualificationAndResponseOutput - The return type for the automatedLeadQualificationAndResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedLeadQualificationAndResponseInputSchema = z.object({
  inquiry: z.string().describe('The raw rental inquiry from a prospect.'),
});
export type AutomatedLeadQualificationAndResponseInput = z.infer<typeof AutomatedLeadQualificationAndResponseInputSchema>;

const AutomatedLeadQualificationAndResponseOutputSchema = z.object({
  isQualified: z.boolean().describe('Whether the lead is qualified based on mentioning a budget or move-in date.'),
  qualificationDetails: z.string().describe('Details explaining the qualification status (e.g., "Mentioned budget of X and move-in date of Y" or "Did not mention budget or move-in date.").'),
  response: z.string().describe('A professional response suggesting a viewing for this Friday at 10 AM.'),
});
export type AutomatedLeadQualificationAndResponseOutput = z.infer<typeof AutomatedLeadQualificationAndResponseOutputSchema>;

const leadQualificationPrompt = ai.definePrompt({
  name: 'leadQualificationPrompt',
  input: {schema: AutomatedLeadQualificationAndResponseInputSchema},
  output: {schema: AutomatedLeadQualificationAndResponseOutputSchema},
  prompt: `You are an AI leasing assistant for "Dublin AI Systems", a premium AI Automation Agency. Your goal is to process rental inquiries efficiently.

Analyze the following rental inquiry:
---
Inquiry: "{{{inquiry}}}"
---

First, determine if the prospect mentioned a "budget" or a "move-in date" (or similar phrases like "move in by", "available from", "price range", "rent", etc.) in their inquiry.

Set 'isQualified' to true if either a budget or a move-in date (or both) are clearly mentioned. Otherwise, set it to false.

For 'qualificationDetails', provide a concise summary of why the lead was qualified or not. If qualified, highlight what was mentioned (e.g., "Mentioned budget of €1500 and move-in date in October."). If not qualified, state "Did not mention budget or move-in date.".

Finally, generate a professional and friendly response that thanks the prospect for their interest and politely suggests a viewing for this Friday at 10 AM. Emphasize that this is an exclusive viewing opportunity. The response should be concise and direct.

Example Professional Response Structure:
"Dear [Prospect Name or 'Valued Prospect'],

Thank you for your inquiry regarding our properties. We'd be delighted to arrange an exclusive viewing for you this Friday at 10 AM. Please let us know if this time suits you.

Best regards,
The Dublin AI Systems Team"`,
});

const automatedLeadQualificationAndResponseFlow = ai.defineFlow(
  {
    name: 'automatedLeadQualificationAndResponseFlow',
    inputSchema: AutomatedLeadQualificationAndResponseInputSchema,
    outputSchema: AutomatedLeadQualificationAndResponseOutputSchema,
  },
  async (input) => {
    const {output} = await leadQualificationPrompt(input);
    return output!;
  }
);

export async function automatedLeadQualificationAndResponse(
  input: AutomatedLeadQualificationAndResponseInput
): Promise<AutomatedLeadQualificationAndResponseOutput> {
  return automatedLeadQualificationAndResponseFlow(input);
}
