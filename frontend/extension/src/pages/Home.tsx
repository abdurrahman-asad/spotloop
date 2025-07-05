import { useEffect, useState } from 'react';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'ui';
import { TbExternalLink } from 'react-icons/tb';
import { STORAGE_KEYS } from '../utils';
import type { TAutomationFormValues } from './CreateAutomation/formSchema';

export const Home = () => {
  const [automations, setAutomations] = useState<TAutomationFormValues[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAutomations = async () => {
      try {
        const result = await chrome.storage.local.get(STORAGE_KEYS.automationData);
        const savedAutomation = result[STORAGE_KEYS.automationData];

        // Put the single automation in an array if it exists
        if (savedAutomation) {
          setAutomations([savedAutomation]);
        } else {
          setAutomations([]);
        }
      } catch (error) {
        console.error('Failed to load automation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAutomations();
  }, []);

  const handleEdit = (automation: TAutomationFormValues, index: number) => {
    console.log('Edit automation:', automation, index);
    // TODO: Navigate to edit page or open edit modal
  };

  const handlePreview = (automation: TAutomationFormValues, index: number) => {
    console.log('Preview automation:', automation, index);
    // TODO: Open preview modal or navigate to preview page
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">Loading automations...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-lg font-semibold mb-4">Recent Automations</h1>

      {automations.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <div className="text-muted-foreground mb-4">
            <span className="text-2xl">🤖</span>
            <p className="text-lg mb-2">No automations yet</p>
            <p className="text-sm">Create your first automation to see it here</p>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <div className="grid gap-4">
            {automations.map((automation, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col gap-4">
                  <CardTitle className="break-words hyphens-auto line-clamp-2">
                    {automation.name}
                  </CardTitle>
                  <CardDescription className="break-words hyphens-auto line-clamp-2">
                    {automation.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <Tooltip>
                      <TooltipTrigger>
                        <TbExternalLink
                          size={20}
                          className="hover:opacity-80 cursor-pointer"
                          onClick={() => handleEdit(automation, index)}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-sm">Open in web app</p>
                      </TooltipContent>
                    </Tooltip>

                    <div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mr-2"
                        onClick={() => handleEdit(automation, index)}>
                        Edit steps
                      </Button>
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handlePreview(automation, index)}>
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
