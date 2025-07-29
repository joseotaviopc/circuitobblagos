import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getEvent } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { EventSummaryGenerator } from '@/components/event-summary-generator';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = getEvent(params.id);

  if (!event) {
    notFound();
  }

  const eventForAISummary = {
    eventName: event.name,
    eventDate: new Date(event.date).toLocaleDateString(),
    eventLocation: event.location,
    eventHighlights: event.highlights,
    eventResults: event.results,
  };

  return (
    <div className="space-y-8">
      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src={event.poster}
          alt={event.name}
          fill
          className="object-cover object-center"
          priority
          data-ai-hint={event['data-ai-hint'] || 'surfing action'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-white drop-shadow-lg">
            {event.name}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-lg">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{event.location}</span>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Event Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{event.highlights}</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{event.results}</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
          <EventSummaryGenerator event={eventForAISummary} />
        </div>
      </div>
    </div>
  );
}
