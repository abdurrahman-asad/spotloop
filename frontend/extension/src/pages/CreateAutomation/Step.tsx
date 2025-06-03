import { useFormContext } from 'react-hook-form';
import { Button, Textarea, Label, Card } from 'ui';
import { TbTrash } from 'react-icons/tb';
import type { TAutomationDetailsFormValues } from './CreateAutomation';

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

  const stepError = errors.steps?.[index];

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">Step {index + 1}</Label>
        {showRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove} className="hover:text-destructive">
            <TbTrash className="h-4 w-4" />
          </Button>
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

      <Button type="button" variant="outline" size="sm" className="self-start">
        Select element
      </Button>
    </Card>
  );
};
