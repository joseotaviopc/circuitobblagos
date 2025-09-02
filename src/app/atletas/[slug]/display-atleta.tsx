import { BarChart, CheckCircle, ImageIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Atleta } from "../../../../db/schema";

interface DisplayAtletaProps {
    atleta: Atleta;
    canEdit: boolean;
    isSignedIn: boolean;
    userEmail: string | undefined;
}

export function DisplayAtleta({
    atleta,
    canEdit,
    isSignedIn,
    userEmail,
}: DisplayAtletaProps) {
    const router = useRouter();
    return (
        <>
            {!canEdit && isSignedIn && (
                <div className="container mx-auto py-2 text-center gap-2">
                    <p className="text-lg font-semibold">
                        Seu e-mail de login ({userEmail}) não corresponde ao e-mail deste
                        atleta ou não foi cadastrado.
                    </p>
                    <p className="text-md text-muted-foreground">
                        Para editar esta página, por favor, certifique-se de que seu e-mail
                        está registrado para este atleta. Você pode solicitar a propriedade
                        da sua conta.
                    </p>
                    <Button onClick={() => router.push("/sign-in")}>Solicitar</Button>
                </div>
            )}
            <header className="relative">
                <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative w-full aspect-square md:aspect-auto">
                            <Image
                                src={atleta.profileUrl || "https://placehold.co/400x400/png"}
                                alt={atleta.nome}
                                width={400}
                                height={400}
                                className="object-cover w-full h-full"
                                priority
                                data-ai-hint="atleta portrait"
                            />
                        </div>
                        <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center gap-4">
                            <h1 className="text-4xl lg:text-5xl font-extrabold font-headline mt-1">
                                {atleta.nome}
                                {atleta.isAffiliated === "true" && (
                                    <CheckCircle className="ml-1 h-8 w-8 text-green-500 inline-block" />
                                )}
                            </h1>
                            {atleta.bio && (
                                <div>
                                    <p className="text-sm font-semibold">Bio:</p>
                                    <p className="text-muted-foreground">{atleta.bio}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Card>
            </header>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline">Informações Pessoais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        {atleta.email && (
                            <div className="w-1/3">
                                <p className="text-sm font-semibold">Email:</p>
                                <p className="text-muted-foreground">
                                    {atleta.email.split("@")[0]}
                                    {"@*******."}
                                    {atleta.email.split("@")[1].split(".")[1]}
                                </p>
                            </div>
                        )}
                        {atleta.telefone && (
                            <div>
                                <p className="text-sm font-semibold">Telefone:</p>
                                <p className="text-muted-foreground">
                                    {atleta.telefone.slice(0, 7)}
                                    {"****"}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-4">
                        {atleta.nascimento && (
                            <div className="w-1/3">
                                <p className="text-sm font-semibold">Data de Nascimento:</p>
                                <p className="text-muted-foreground">{atleta.nascimento}</p>
                            </div>
                        )}
                        {atleta.estado && (
                            <div>
                                <p className="text-sm font-semibold">Estado:</p>
                                <p className="text-muted-foreground">{atleta.estado}</p>
                            </div>
                        )}
                    </div>

                    {atleta.actionUrl && (
                        <div>
                            <p className="text-sm font-semibold">Action URL:</p>
                            <a
                                href={atleta.actionUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                            >
                                {atleta.actionUrl}
                            </a>
                        </div>
                    )}
                    {atleta.socialLinks && atleta.socialLinks.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold">Redes Sociais:</p>
                            <div className="space-y-1">
                                {atleta.socialLinks.map((link: string) => (
                                    <a
                                        key={link}
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 underline block"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="stats">
                        <BarChart className="mr-2 h-4 w-4" />
                        Estatísticas
                    </TabsTrigger>
                    <TabsTrigger value="photos">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Fotos
                    </TabsTrigger>
                    <TabsTrigger value="videos">
                        <VideoIcon className="mr-2 h-4 w-4" />
                        Vídeos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">
                                Estatísticas da Carreira
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                                <div className="p-4 bg-secondary rounded-lg">
                                    <p className="text-3xl font-bold">
                                        {atleta.estatisticas?.eventos}
                                    </p>
                                    <p className="text-muted-foreground">Eventos</p>
                                    <hr className="my-1" />
                                    {atleta.resultados?.results.map(
                                        (result: { evento: string; categoria: string }) => (
                                            <div key={result.evento + result.categoria}>
                                                <p className="text-xs text-left">
                                                    {result.evento} - {result.categoria}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                                <div className="p-4 bg-secondary rounded-lg">
                                    <p className="text-3xl font-bold text-primary">
                                        {atleta.estatisticas?.vitorias}
                                    </p>
                                    <p className="text-muted-foreground">Vitórias</p>
                                    <hr className="my-1" />
                                    {atleta.resultados?.results.map(
                                        (result: {
                                            evento: string;
                                            categoria: string;
                                            posicao: number;
                                        }) => (
                                            <div key={result.evento + result.categoria}>
                                                <p className="text-xs text-left">
                                                    {result.posicao === 1 &&
                                                        `🏆 ${result.evento} - ${result.categoria}`}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                                <div className="p-4 bg-secondary rounded-lg">
                                    <p className="text-3xl font-bold">
                                        {atleta.estatisticas?.podios}
                                    </p>
                                    <p className="text-muted-foreground">Pódios</p>
                                    <hr className="my-1" />
                                    {atleta.resultados?.results.map(
                                        (result: {
                                            evento: string;
                                            categoria: string;
                                            posicao: number;
                                        }) => (
                                            <div key={result.evento + result.categoria}>
                                                <p className="text-xs text-left">
                                                    {result.posicao <= 4 &&
                                                        `${result.posicao}º - ${result.evento} - ${result.categoria}`}
                                                </p>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="photos" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Galeria de Fotos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {atleta.fotos && atleta.fotos.length > 0 ? (
                                <Carousel>
                                    <CarouselContent>
                                        {atleta.fotos.map((photo: string) => (
                                            <CarouselItem
                                                key={photo}
                                                className="md:basis-1/2 lg:basis-1/3"
                                            >
                                                <div className="aspect-video relative rounded-lg overflow-hidden">
                                                    <Image
                                                        src={photo}
                                                        alt={`${atleta.nome} photo`}
                                                        fill
                                                        className="object-cover"
                                                        data-ai-hint="atleta surfing"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    Sem fotos.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="videos" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">
                                Destaques em Vídeo
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {atleta.videos && atleta.videos.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {atleta.videos.map((video: string) => (
                                        <div
                                            key={video}
                                            className="aspect-video bg-secondary rounded-lg flex items-center justify-center"
                                        >
                                            <p className="text-muted-foreground">Video Placeholder</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted-foreground py-8">
                                    Sem videos.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
}
