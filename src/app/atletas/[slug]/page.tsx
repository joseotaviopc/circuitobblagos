"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  BarChart,
  CheckCircle,
  Edit,
  ImageIcon,
  Upload,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import {
  type DropzoneInputProps,
  type DropzoneRootProps,
  useDropzone,
} from "react-dropzone";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/context/data-context";
import { cn, slugify } from "@/lib/utils";
import type { Atleta } from "../../../../db/schema";
import { type UseAtletaForm, useAtletaPage } from "./useAtletaPage";

interface EditAtletaProps {
  form: UseFormReturn<UseAtletaForm>;
  onSubmit: (values: UseAtletaForm) => Promise<void>;
  socialInput: string;
  setSocialInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddOrUpdateSocial: () => void;
  editingIndex: number | null;
  handleEditSocial: (idx: number) => void;
  handleRemoveSocial: (idx: number) => void;
  socialLinksList: string[];
  previewUrl: string | null;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive: boolean;
}

const EditAtleta = ({
  form,
  onSubmit,
  socialInput,
  setSocialInput,
  handleAddOrUpdateSocial,
  editingIndex,
  handleEditSocial,
  handleRemoveSocial,
  socialLinksList,
  previewUrl,
  getRootProps,
  getInputProps,
  isDragActive,
}: EditAtletaProps) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-extrabold font-headline tracking-tight lg:text-5xl mb-8">
        Editar Perfil
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do Atleta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY-MM-DD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: RJ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Foto de Perfil</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/profile.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(21) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="000.000.000-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="actionUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/action" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Short biography" {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Foto de Perfil</FormLabel>
            <div className="flex flex-col h-40 w-auto aspect-[4/3]">
              {previewUrl ? (
                <div
                  {...getRootProps({
                    className: cn(
                      "mt-2 h-40 w-auto relative",
                      isDragActive
                        ? "flex items-center justify-center border-2 border-dashed border-primary bg-muted/50"
                        : "",
                    ),
                  })}
                >
                  {isDragActive ? (
                    <p className="text-sm text-muted-foreground">
                      Solte a imagem aqui...
                    </p>
                  ) : (
                    <>
                      <Image
                        src={previewUrl}
                        alt="preview"
                        className="h-40 w-auto object-cover rounded"
                        width={100}
                        height={100}
                      />
                      <Upload className="h-6 w-6 p-1 text-muted-foreground absolute bottom-2 left-2 rounded-full bg-white" />
                      <input {...getInputProps()} />
                      <div className="w-full">
                        <Input type="file" {...getInputProps()} />
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div
                    {...getRootProps({
                      className: cn(
                        "flex flex-col items-center justify-center h-40 p-6 border-2 border-dashed rounded-md cursor-pointer ",
                        isDragActive
                          ? "border-primary bg-muted/50"
                          : "border-input bg-background",
                      ),
                    })}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    {isDragActive ? (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Solte a imagem aqui...
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Arraste e solte uma imagem aqui, ou clique para
                        selecionar
                      </p>
                    )}
                  </div>

                  <div className="w-full">
                    <Input type="file" {...getInputProps()} />
                  </div>
                </>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="socialLinks"
            render={() => (
              <FormItem>
                <FormLabel>Links de Redes Sociais</FormLabel>
                <FormControl>
                  <div>
                    <div className="flex space-x-2">
                      <Input
                        value={socialInput}
                        onChange={(e) => setSocialInput(e.target.value)}
                        placeholder="https://instagram.com/username"
                      />
                      <Button type="button" onClick={handleAddOrUpdateSocial}>
                        {editingIndex !== null ? "Atualizar" : "Adicionar"}
                      </Button>
                    </div>
                    <div className="mt-3 space-y-2">
                      {socialLinksList.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          Nenhum link adicionado.
                        </p>
                      )}
                      {socialLinksList.map((link: string, idx: number) => (
                        <div
                          key={Math.random().toString(36).slice(2)}
                          className="flex items-center justify-between bg-secondary p-2 rounded"
                        >
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm underline"
                          >
                            {link}
                          </a>
                          <div className="space-x-2">
                            <Button
                              size="sm"
                              type="button"
                              onClick={() => handleEditSocial(idx)}
                            >
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              type="button"
                              onClick={() => handleRemoveSocial(idx)}
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Salvar Alterações</Button>
        </form>
      </Form>
    </div>
  );
};

interface DisplayAtletaProps {
  atleta: Atleta;
  canEdit: boolean;
  isSignedIn: boolean;
  userEmail: string | undefined;
}

const DisplayAtleta: React.FC<DisplayAtletaProps> = ({
  atleta,
  canEdit,
  isSignedIn,
  userEmail,
}) => {
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
                <p className="text-muted-foreground">{atleta.email.split("@")[0]}{"@*******."}{atleta.email.split("@")[1].split(".")[1]}</p>
              </div>
            )}
            {atleta.telefone && (
              <div>
                <p className="text-sm font-semibold">Telefone:</p>
                <p className="text-muted-foreground">{atleta.telefone.slice(0, 7)}{"****"}</p>
              </div>
            )}
          </div>
          {/* {atleta.cpf && (
            <div>
              <p className="text-sm font-semibold">CPF:</p>
              <p className="text-muted-foreground">{atleta.cpf}</p>
            </div>
          )} */}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
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
};

export default function AthleteProfilePage() {
  const { slug } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const { atletas, loadingData } = useData();
  const { isLoaded, isSignedIn } = useAuth();

  const atleta = atletas.find((atleta) => slugify(atleta.nome) === slug);
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const canEdit = Boolean(
    isSignedIn && userEmail && atleta?.email === userEmail,
  );

  const {
    form,
    handleAddOrUpdateSocial,
    handleEditSocial,
    handleRemoveSocial,
    onSubmit,
    setPreviewUrl,
    previewUrl,
    setIsEditing,
    isEditing,
    setSocialInput,
    socialInput,
    socialLinksList,
    editingIndex,
  } = useAtletaPage({ atleta });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles[0] => ", acceptedFiles[0]);
      if (acceptedFiles[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = (e) => {
          if (typeof e.target?.result === "string")
            setPreviewUrl(e.target?.result);
        };
      }
    },
  });

  if (!slug) {
    notFound();
  }

  if (!atleta) {
    notFound();
    return null;
  }

  if (loadingData || !isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {canEdit && (
        <Button
          size="sm"
          className="absolute top-3 right-16 z-20"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="mr-2 h-4 w-4" />
          {isEditing ? "Cancelar Edição" : "Editar Página"}
        </Button>
      )}
      {isEditing && canEdit ? (
        <EditAtleta
          form={form}
          onSubmit={onSubmit}
          socialInput={socialInput}
          setSocialInput={setSocialInput}
          handleAddOrUpdateSocial={handleAddOrUpdateSocial}
          editingIndex={editingIndex}
          handleEditSocial={handleEditSocial}
          handleRemoveSocial={handleRemoveSocial}
          socialLinksList={socialLinksList}
          previewUrl={previewUrl}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
        />
      ) : (
        <DisplayAtleta
          atleta={atleta}
          canEdit={canEdit}
          isSignedIn={isSignedIn}
          userEmail={userEmail}
        />
      )}
    </div>
  );
}
