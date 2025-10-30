import { z } from 'zod/v4';

const elementSchema = z.object({
  XPath: z.string(),
  tag: z.string(),
  isIframe: z.boolean(),
});

const withInstructionsSchema = z.object({
  id: z.string(),
  clickOnly: z.literal(false),
  url: z.string(),
  instructions: z
    .string()
    .trim()
    .min(1, 'Step instructions are required')
    .max(500, 'Instructions must be at most 500 characters'),
  element: elementSchema.optional(),
});

const withoutInstructionsSchema = z.object({
  id: z.string(),
  clickOnly: z.literal(true),
  url: z.string(),
  instructions: z.string().optional(),
  element: elementSchema.optional(),
});

const stepSchema = z.discriminatedUnion('clickOnly', [
  withInstructionsSchema,
  withoutInstructionsSchema,
]);

export const automationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),
  description: z.string().trim().max(500, 'Description must be at most 500 characters').optional(),
  steps: z.array(stepSchema),
});

export type TAutomationFormValues = z.infer<typeof automationFormSchema>;

export const defaultValues = {
  name: '',
  description: '',
  steps: [{ id: crypto.randomUUID(), instructions: '', element: undefined, clickOnly: false }],
};
