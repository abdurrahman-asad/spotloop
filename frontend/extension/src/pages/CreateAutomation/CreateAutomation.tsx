import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, toast } from 'ui';
import { AutomationDetails } from './AutomationDetails';
import { Steps } from './Steps';
import { automationFormSchema, type TAutomationFormValues } from './formSchema';
import { STORAGE_KEYS } from '../../utils';
import { useEffect } from 'react';

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
    chrome.storage.local.set({ [STORAGE_KEYS.automationData]: data });
    toast.success('Automation created successfully!');
    methods.reset();
  };

  useEffect(() => {
    const loadAutomationData = async () => {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEYS.automationData);
        const savedData = result[STORAGE_KEYS.automationData];

        if (savedData) {
          // Reset the form with the saved data
          methods.reset(savedData);
        }
      } catch (error) {
        console.error('Failed to load automation data from storage:', error);
      }
    };

    loadAutomationData();
  }, [methods]);

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
