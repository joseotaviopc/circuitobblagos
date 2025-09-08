import { useData } from "@/context/data-context";

export function NextEvent() {
  const { events } = useData();

  const nextEvent = events
    ? events
        .filter((event) => event.data && new Date(event.data) > new Date())
        .sort((a, b) => {
          if (b.data && a.data) {
            return new Date(a.data).getTime() - new Date(b.data).getTime();
          }
          return 0;
        })[0]
    : null;

  if (!nextEvent) return null;

  return (
    <section className="text-center py-6 md:py-8 lg:py-12 w-[calc(100% + 4rem)] -mx-4 md:-mx-6 lg:-mx-8 ">
      <div className="relative w-full h-96 overflow-hidden">
        {nextEvent?.cartazUrl && (
          <img
            src={nextEvent?.cartazUrl}
            alt={nextEvent?.nome}
            className="w-full h-full object-cover"
          />
        )}
        <h1 className="absolute inset-0 backdrop-blur-sm flex items-center justify-center text-5xl md:text-7xl font-extrabold tracking-tight font-headline text-white leading-tight bg-black bg-opacity-50 p-4">
          {nextEvent?.nome}
          <br />
          {nextEvent?.data &&
            new Date(nextEvent?.data).toLocaleDateString("pt-BR", {
              dateStyle: "short",
            })}
        </h1>
        {nextEvent.data && (
          <h2 className="absolute inset-0 flex items-end justify-center text-2xl md:text-4xl font-medium tracking-tight font-headline text-white leading-tight  p-4">
            Faltam{" "}
            {Math.ceil(
              (new Date(nextEvent?.data).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            )}{" "}
            dias!
          </h2>
        )}
      </div>
      <p className="mt-3 text-lg md:text-xl text-muted-foreground leading-snug px-4 text-wrap max-w-prose mx-auto">
        O Circuito BB Lagos é o maior e mais tradicional campeonato de bodyboard
        da Região dos Lagos, no estado do Rio de Janeiro. Feito de bodyboard
        para bodyboard, o circuito reúne atletas da base até os Legends, sempre
        nas melhores ondas da região.
      </p>
    </section>
  );
}
