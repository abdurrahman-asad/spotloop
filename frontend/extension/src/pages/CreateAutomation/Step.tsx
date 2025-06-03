import { useFormContext } from 'react-hook-form';
import { Button, Textarea, Label, Card } from 'ui';
import { TbTrash } from 'react-icons/tb';
import type { TAutomationDetailsFormValues } from './CreateAutomation';
import { getCurrentTab, injectScriptInCurrentTab, STORAGE_KEYS } from '../../utils';
import { startDOMCapture } from '../../messaging/signals';
import createSpotScriptPath from '../../content-scripts/createSpot?script';

interface StepProps {
  index: number;
  onRemove: () => void;
  showRemove: boolean;
}

// Trigger the content script for DOM selection
export const onSelectElement = async () => {
  const currentTab = await getCurrentTab();
  await injectScriptInCurrentTab(createSpotScriptPath);
  startDOMCapture.emit({ tabId: currentTab?.id });
  chrome.storage.local.set({ [STORAGE_KEYS.captureTabId]: currentTab?.id });
};

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

      <Button
        size="sm"
        type="button"
        variant="outline"
        className="self-start"
        onClick={onSelectElement}>
        Select element
      </Button>
    </Card>
  );
};
