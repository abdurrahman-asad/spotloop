import { useFormContext } from 'react-hook-form';
import { Button, Textarea, Label, Card, toast } from 'ui';
import { TbTrash } from 'react-icons/tb';
import type { TAutomationDetailsFormValues } from './CreateAutomation';
import { FullScreen } from '../../components/FullScreen';
import { useElementSelection } from './useStepSelection';
import { isPageUnsupported } from '../../utils';

interface StepProps {
  index: number;
  onRemove: () => void;
  showRemove: boolean;
}

export const Step = ({ index, onRemove, showRemove }: StepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TAutomationDetailsFormValues>();
  const { isSelectingElement, cancelSelection, selectElement } = useElementSelection();

  const stepError = errors.steps?.[index];

  const handleElementSelection = async () => {
    if (await isPageUnsupported()) {
      toast.error('Element selection is not supported on default browser pages.');
      return;
    }
    selectElement();
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">Step {index + 1}</Label>
        {showRemove && (
          <TbTrash className="hover:text-destructive cursor-pointer" onClick={onRemove} />
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Enter step instructions"
          {...register(`steps.${index}.instructions`)}
        />
        {stepError?.instructions && (
          <p className="text-sm text-destructive">{stepError.instructions.message}</p>
        )}
      </div>

      {isSelectingElement && (
        <FullScreen>
          <p className="text-xl">Select an element on the page</p>
          <Button size="sm" variant="outline" className="mt-8" onClick={cancelSelection}>
            Cancel selection
          </Button>
        </FullScreen>
      )}

      <Button
        size="sm"
        type="button"
        variant="outline"
        className="self-start"
        onClick={handleElementSelection}>
        Select element
      </Button>
    </Card>
  );
};
