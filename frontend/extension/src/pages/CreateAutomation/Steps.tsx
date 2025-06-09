import { Button, toast } from 'ui';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Step } from './Step';
import type { TAutomationDetailsFormValues } from './CreateAutomation';
import { useElementSelection } from './useStepSelection';
import { FullScreen } from '../../components/FullScreen';
import { useEffect, useState } from 'react';
import { isPageUnsupported } from '../../utils';

export const Steps = () => {
  const { control, setValue } = useFormContext<TAutomationDetailsFormValues>();
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const {
    selectedElement,
    isSelectingElement,
    setSelectedElement,
    cancelSelection,
    selectElement,
  } = useElementSelection();

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

  const handleElementSelection = async (index: number) => {
    if (await isPageUnsupported()) {
      toast.error('Element selection is not supported on default browser pages.');
      return;
    }
    setSelectedStep(index);
    selectElement();
  };

  useEffect(() => {
    if (selectedElement?.XPath) {
      setValue(`steps.${selectedStep}.element`, selectedElement.XPath);
      setSelectedElement(undefined);
    }
  }, [selectedElement?.XPath, setValue, selectedStep, setSelectedElement]);

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
            selectElement={handleElementSelection}
          />
        ))}
      </div>
      <div className="mt-4">
        <Button type="button" variant="default" onClick={addStep}>
          Add Step
        </Button>
      </div>

      {isSelectingElement && (
        <FullScreen>
          <p className="text-xl">Select an element on the page</p>
          <Button size="sm" variant="outline" className="mt-8" onClick={cancelSelection}>
            Cancel selection
          </Button>
        </FullScreen>
      )}
    </div>
  );
};
