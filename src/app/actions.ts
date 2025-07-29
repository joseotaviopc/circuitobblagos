'use server';

import {
  summarizeEvent,
  type SummarizeEventInput,
  type SummarizeEventOutput,
} from '@/ai/flows/summarize-event';

export async function summarizeEventAction(
  input: SummarizeEventInput
): Promise<SummarizeEventOutput> {
  return await summarizeEvent(input);
}
