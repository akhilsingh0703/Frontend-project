'use server';

/**
 * @fileOverview A university details summarization AI agent.
 *
 * - summarizeUniversityDetails - A function that handles the university details summarization process.
 * - SummarizeUniversityDetailsInput - The input type for the summarizeUniversityDetails function.
 * - SummarizeUniversityDetailsOutput - The return type for the summarizeUniversityDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUniversityDetailsInputSchema = z.object({
  universityDetails: z
    .string()
    .describe('The detailed information about the university.'),
});
export type SummarizeUniversityDetailsInput = z.infer<typeof SummarizeUniversityDetailsInputSchema>;

const SummarizeUniversityDetailsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the university details.'),
});
export type SummarizeUniversityDetailsOutput = z.infer<typeof SummarizeUniversityDetailsOutputSchema>;

export async function summarizeUniversityDetails(
  input: SummarizeUniversityDetailsInput
): Promise<SummarizeUniversityDetailsOutput> {
  return summarizeUniversityDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUniversityDetailsPrompt',
  input: {schema: SummarizeUniversityDetailsInputSchema},
  output: {schema: SummarizeUniversityDetailsOutputSchema},
  prompt: `You are an expert university summarizer.  You will be given detailed information about a university, and you will create a concise summary, highlighting key aspects like its strengths, focus areas, and unique attributes.

University Details: {{{universityDetails}}}`,
});

const summarizeUniversityDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeUniversityDetailsFlow',
    inputSchema: SummarizeUniversityDetailsInputSchema,
    outputSchema: SummarizeUniversityDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
