import { useFormContext } from 'react-hook-form';
import { Button, Textarea, Label, Card, Tooltip, TooltipTrigger, TooltipContent } from 'ui';
import { TbTrash, TbCheck } from 'react-icons/tb';
import type { TAutomationDetailsFormValues } from './CreateAutomation';

interface StepProps {
  index: number;
  onRemove: () => void;
  showRemove: boolean;
  selectElement: (stepIndex: number) => Promise<void>;
}

export const Step = ({ index, onRemove, showRemove, selectElement }: StepProps) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<TAutomationDetailsFormValues>();

  const stepError = errors.steps?.[index];
  const isStepSelected = !!getValues(`steps.${index}.element`);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">Step {index + 1}</Label>
        {showRemove && (
          <Tooltip>
            <TooltipTrigger>
              <TbTrash className="hover:text-destructive cursor-pointer" onClick={onRemove} />
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-sm">Remove step</p>
            </TooltipContent>
          </Tooltip>
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

      <Button
        size="sm"
        type="button"
        variant="outline"
        className="self-start"
        disabled={isStepSelected}
        onClick={() => selectElement(index)}>
        {isStepSelected ? (
          <>
            Element selected <TbCheck />
          </>
        ) : (
          'Select element'
        )}
      </Button>
    </Card>
  );
};
