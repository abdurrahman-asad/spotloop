import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from 'ui';
import { Step } from './Step';
import type { TAutomationDetailsFormValues } from './CreateAutomation';

export const Steps = () => {
  const { control } = useFormContext<TAutomationDetailsFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  });

  const addStep = () => {
    append({ id: crypto.randomUUID(), instructions: '', element: '' });
  };

  const removeStep = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">Steps</p>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <Step
            key={field.id}
            index={index}
            onRemove={() => removeStep(index)}
            showRemove={fields.length > 1}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button variant="default" onClick={addStep}>
          Add Step
        </Button>
      </div>
    </div>
  );
};
