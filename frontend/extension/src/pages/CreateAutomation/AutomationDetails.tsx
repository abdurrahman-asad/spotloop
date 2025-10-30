import { useFormContext } from 'react-hook-form';
import { Input, Textarea, Label } from 'ui';
import type { TAutomationFormValues } from './formSchema';

export const AutomationDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TAutomationFormValues>();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="automation-name" className="text-sm font-medium">
            Name
          </Label>
          <Input id="automation-name" type="text" placeholder="Enter name" {...register('name')} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="automation-description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="automation-description"
            placeholder="Enter description"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
