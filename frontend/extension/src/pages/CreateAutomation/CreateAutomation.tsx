import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, toast } from 'ui';
import { AutomationDetails } from './AutomationDetails';
import { Steps } from './Steps';
import { automationFormSchema, type TAutomationFormValues, defaultValues } from './formSchema';
import { STORAGE_KEYS } from '../../utils';
import { useEffect } from 'react';
import { useStore } from '../../store';
import { useNavigate, useSearchParams } from 'react-router';

export const CreateAutomation = () => {
  const methods = useForm<TAutomationFormValues>({
    resolver: zodResolver(automationFormSchema),
    defaultValues,
  });
  const { dispatch, state } = useStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEditing = searchParams.get('edit');

  const onSubmit = (data: TAutomationFormValues) => {
    chrome.storage.local.set({ [STORAGE_KEYS.automationData]: data });
    toast.success(`Automation ${isEditing ? 'updated' : 'created'} successfully!`);
    clearCurrentAutomation();
  };

  const clearCurrentAutomation = () => {
    dispatch({
      type: 'CLEAR_CURRENT_AUTOMATION',
    });
    navigate('/');
  };

  // if user has edit mode open and switches to create mode, reset the form
  useEffect(() => {
    if (!isEditing) {
      methods.reset(defaultValues);
    }
  }, [methods, isEditing]);

  useEffect(() => {
    if (state.currentAutomation) {
      methods.reset(state.currentAutomation);
      dispatch({
        type: 'CLEAR_CURRENT_AUTOMATION',
      });
    }
  }, [state.currentAutomation, methods, dispatch]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl self-center mb-4">{isEditing ? 'Editing' : 'Create'} Automation</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
          <AutomationDetails />
          <Steps />
          <div className="mt-auto py-2 flex justify-end gap-2">
            {/* <Button type="button" variant="outline" onClick={clearCurrentAutomation}>
              Cancel
            </Button> */}
            <Button type="submit">{isEditing ? 'Update' : 'Create'} Automation</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
