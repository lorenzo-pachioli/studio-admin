'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating AI hints for product/service listings.
 *
 * The flow takes product/service details as input and uses a language model to suggest relevant content for the 'dataAiHint' field.
 * This helps improve the searchability and discoverability of listings on the PawsomeMart e-commerce website.
 *
 * @interface GenerateAiHintInput - Input type for the generateAiHint function.
 * @interface GenerateAiHintOutput - Output type for the generateAiHint function.
 * @function generateAiHint - The main function to generate AI hints for a given product or service.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiHintInputSchema = z.object({
  name: z.string().describe('The name of the product or service.'),
  description: z.string().describe('A detailed description of the product or service.'),
  category: z.string().describe('The category the product or service belongs to.'),
  tags: z.string().optional().describe('A comma separated list of tags associated with the product or service.'),
});

export type GenerateAiHintInput = z.infer<typeof GenerateAiHintInputSchema>;

const GenerateAiHintOutputSchema = z.object({
  aiHint: z.string().describe('The generated AI hint for the product or service.'),
});

export type GenerateAiHintOutput = z.infer<typeof GenerateAiHintOutputSchema>;

export async function generateAiHint(input: GenerateAiHintInput): Promise<GenerateAiHintOutput> {
  return generateAiHintFlow(input);
}

const generateAiHintPrompt = ai.definePrompt({
  name: 'generateAiHintPrompt',
  input: {schema: GenerateAiHintInputSchema},
  output: {schema: GenerateAiHintOutputSchema},
  prompt: `You are an AI assistant designed to help sellers optimize their product and service listings on an e-commerce website.
  Your task is to generate a concise and relevant 'dataAiHint' that will improve the searchability and discoverability of their listings.
  The AI hint should be a short phrase or a few keywords that accurately describe the product or service and capture its essence.

  Here are the details of the product/service:
  Name: {{{name}}}
  Description: {{{description}}}
  Category: {{{category}}}
  Tags: {{#if tags}}{{{tags}}}{{else}}No tags provided{{/if}}

  Based on this information, generate a 'dataAiHint' for the product/service:
  `, // Added a colon at the end to indicate the expected output
});

const generateAiHintFlow = ai.defineFlow(
  {
    name: 'generateAiHintFlow',
    inputSchema: GenerateAiHintInputSchema,
    outputSchema: GenerateAiHintOutputSchema,
  },
  async input => {
    const {output} = await generateAiHintPrompt(input);
    return output!;
  }
);
