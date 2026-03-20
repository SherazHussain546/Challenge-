
'use server';

/**
 * This Server Action is deprecated. 
 * Lead processing and persistence is now handled directly in the client 
 * (src/components/audit-form.tsx) for better reliability and faster UX.
 */

export async function submitLeadAction() {
  return { success: false, error: 'Deprecated: Use client-side persistence.' };
}
