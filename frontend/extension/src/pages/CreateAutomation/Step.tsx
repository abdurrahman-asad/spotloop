import { useFormContext } from 'react-hook-form';
import {
  Button,
  Textarea,
  Label,
  Card,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Checkbox,
} from 'ui';
import { TbTrash, TbCheck } from 'react-icons/tb';
import type { TAutomationFormValues } from './formSchema';

interface StepProps {
  index: number;
  onRemove: () => void;
  showRemove: boolean;
  selectElement: (stepIndex: number) => Promise<void>;
}

export const Step = ({ index, onRemove, showRemove, selectElement }: StepProps) => {
  const {
    watch,
    trigger,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<TAutomationFormValues>();

  const stepError = errors.steps?.[index];
  const isStepSelected = !!getValues(`steps.${index}.element`);
  const isClickOnly = watch(`steps.${index}.clickOnly`);

  const handleClickOnlyChange = () => {
    setValue(`steps.${index}.clickOnly`, !isClickOnly);
    if (stepError?.instructions) {
      trigger(`steps.${index}.instructions`);
    }
  };

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
          disabled={isClickOnly}
          placeholder="Enter step instructions"
          {...register(`steps.${index}.instructions`)}
        />
        {stepError?.instructions && (
          <p className="text-sm text-destructive">{stepError.instructions.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
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

        <div className="flex items-center gap-2">
          <Checkbox
            checked={isClickOnly}
            id={`click-only-checkbox-${index}`}
            onCheckedChange={handleClickOnlyChange}
          />
          <Label htmlFor={`click-only-checkbox-${index}`} className="text-sm cursor-pointer">
            Click only
          </Label>
        </div>
      </div>
    </Card>
  );
};
