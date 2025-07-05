import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'ui';
import { AutomationDetails } from './AutomationDetails';
import { Steps } from './Steps';
import { automationFormSchema, type TAutomationFormValues } from './formSchema';

export const CreateAutomation = () => {
  const methods = useForm<TAutomationFormValues>({
    resolver: zodResolver(automationFormSchema),
    defaultValues: {
      name: '',
      description: '',
      steps: [{ id: crypto.randomUUID(), instructions: '', element: undefined, clickOnly: false }],
    },
  });

  const onSubmit = (data: TAutomationFormValues) => {
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
