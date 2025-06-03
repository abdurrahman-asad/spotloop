import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'ui';
import { AutomationDetails } from './AutomationDetails';
import { Steps } from './Steps';

const stepSchema = z.object({
  id: z.string(),
  instructions: z
    .string()
    .trim()
    .min(1, 'Step instructions are required')
    .max(500, 'Instructions must be at most 500 characters'),
  element: z.string().optional(),
});

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),
  description: z.string().trim().max(500, 'Description must be at most 500 characters').optional(),
  steps: z.array(stepSchema),
});

export type TAutomationDetailsFormValues = z.infer<typeof formSchema>;
export type TStepFormValues = z.infer<typeof stepSchema>;

export const CreateAutomation = () => {
  const methods = useForm<TAutomationDetailsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      steps: [{ id: crypto.randomUUID(), instructions: '', element: '' }],
    },
  });

  const onSubmit = (data: TAutomationDetailsFormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl self-center mb-4">Create Automation</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
          <AutomationDetails />
          <Steps />
          <div className="mt-auto py-2">
            <Button type="submit" className="w-full">
              Create Automation
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
