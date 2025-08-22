
import { EventsList } from './(components)/events-list';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl">
          Calendário de Eventos
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Acompanhe o circuito e fique por dentro das últimas competições de bodyboard na região dos Lagos.
        </p>
      </header>

      <EventsList />
    </div>
  );
}
