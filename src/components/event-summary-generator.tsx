'use client';

import { useState } from 'react';
import { summarizeEventAction } from '@/app/actions';
import type { SummarizeEventInput } from '@/ai/flows/summarize-event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function EventSummaryGenerator({
  event,
}: {
  event: SummarizeEventInput;
}) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    setSummary('');
    try {
      const result = await summarizeEventAction(event);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate event summary.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Bot className="text-primary" />
          AI Event Summary
        </CardTitle>
        <CardDescription>
          Click the button to generate a summary of the event using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Summary'
          )}
        </Button>
        {summary && (
          <div className="p-4 bg-secondary rounded-lg border">
            <p className="text-secondary-foreground">{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
