// Summarize-event.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing bodyboarding events.
 *
 * - summarizeEvent - A function that takes event details and returns a concise summary.
 * - SummarizeEventInput - The input type for the summarizeEvent function.
 * - SummarizeEventOutput - The return type for the summarizeEvent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEventInputSchema = z.object({
  eventName: z.string().describe('The name of the bodyboarding event.'),
  eventDate: z.string().describe('The date of the event.'),
  eventLocation: z.string().describe('The location where the event took place.'),
  eventHighlights: z.string().describe('Key moments and highlights from the event.'),
  eventResults: z.string().describe('The final results and outcomes of the event.'),
});
export type SummarizeEventInput = z.infer<typeof SummarizeEventInputSchema>;

const SummarizeEventOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the bodyboarding event.'),
});
export type SummarizeEventOutput = z.infer<typeof SummarizeEventOutputSchema>;

export async function summarizeEvent(input: SummarizeEventInput): Promise<SummarizeEventOutput> {
  return summarizeEventFlow(input);
}

const summarizeEventPrompt = ai.definePrompt({
  name: 'summarizeEventPrompt',
  input: {schema: SummarizeEventInputSchema},
  output: {schema: SummarizeEventOutputSchema},
  prompt: `You are an expert sports journalist specializing in bodyboarding events. Your task is to generate a concise and engaging summary of the event using the provided details.

Event Name: {{{eventName}}}
Event Date: {{{eventDate}}}
Event Location: {{{eventLocation}}}
Event Highlights: {{{eventHighlights}}}
Event Results: {{{eventResults}}}

Write a short summary that captures the essence of the event, highlighting key moments and outcomes. The summary should be no more than 150 words.
`,
});

const summarizeEventFlow = ai.defineFlow(
  {
    name: 'summarizeEventFlow',
    inputSchema: SummarizeEventInputSchema,
    outputSchema: SummarizeEventOutputSchema,
  },
  async input => {
    const {output} = await summarizeEventPrompt(input);
    return output!;
  }
);
