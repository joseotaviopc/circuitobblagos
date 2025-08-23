
import { EventsList } from './(components)/events-list';

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
          Calendário de Eventos
        </h1>
        <p className="mt-2 text-base md:text-lg text-muted-foreground">
          Acompanhe o circuito e fique por dentro das últimas competições de bodyboard na região dos Lagos.
        </p>
      </header>

      <EventsList />
    </div>
  );
}
