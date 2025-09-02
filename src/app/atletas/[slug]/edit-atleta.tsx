import { ImageIcon, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useId } from "react";
import type { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import type { UseAtletaForm } from "./useAtletaPage";

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
    handleCloudinaryUpload: (result: any) => void;
    handleMultipleFileUpload: (files: FileList) => Promise<void>;
    uploadingImage: boolean;
    uploadProgress: number;
    uploadError: string | null;
    handleRemoveGalleryImage: (index: number) => void;
    galleryImages: string[];
    uploadingGallery: boolean;
    galleryUploadProgress: { [key: string]: number };
}

export function EditAtleta({
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
    handleCloudinaryUpload,
    handleMultipleFileUpload,
    uploadingImage,
    uploadError,
    handleRemoveGalleryImage,
    galleryImages,
    uploadingGallery,
}: EditAtletaProps) {
    const galleryUploadId = useId();
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
                        {uploadError && (
                            <p className="text-sm text-red-500 mt-1">{uploadError}</p>
                        )}
                        <div className="flex flex-col gap-4 mt-2">
                            {/* Current Profile Image Preview */}
                            {previewUrl && (
                                <div className="relative h-40 w-40">
                                    <Image
                                        src={previewUrl}
                                        alt="Profile preview"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    {uploadingImage && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                            <div className="text-white text-center">
                                                <LoadingSpinner className="mb-2" />
                                                <p className="text-sm">Enviando...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Cloudinary Upload Widget for Profile */}
                            <CldUploadWidget
                                uploadPreset="circuito-bb-lagos-profile"
                                onSuccess={handleCloudinaryUpload}
                                options={{
                                    folder: "circuito-bb-lagos/profile",
                                    maxFiles: 1,
                                    resourceType: "image",
                                    maxFileSize: 5000000, // 5MB
                                    cropping: true,
                                    croppingAspectRatio: 1, // Square aspect ratio
                                    croppingDefaultSelectionRatio: 1,
                                    croppingShowDimensions: true,
                                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                                }}
                            >
                                {({ open, isLoading }) => (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => open()}
                                        disabled={isLoading || uploadingImage}
                                        className="w-fit"
                                    >
                                        {isLoading || uploadingImage ? (
                                            <>
                                                <LoadingSpinner className="mr-2 h-4 w-4" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                {previewUrl ? "Alterar Foto" : "Upload Foto"}
                                            </>
                                        )}
                                    </Button>
                                )}
                            </CldUploadWidget>
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

                    {/* Gallery Upload Section */}
                    <div>
                        <FormLabel>Galeria de Fotos</FormLabel>
                        {uploadError && (
                            <p className="text-sm text-red-500 mt-1">{uploadError}</p>
                        )}

                        <div className="mt-2">
                            <input
                                type="file"
                                multiple
                                id={galleryUploadId}
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        handleMultipleFileUpload(e.target.files);
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    document.getElementById(galleryUploadId)?.click()
                                }
                                disabled={uploadingGallery}
                                className="w-fit"
                            >
                                {uploadingGallery ? (
                                    <>
                                        <LoadingSpinner className="mr-2 h-4 w-4" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        Adicionar Fotos à Galeria (Máx. 5)
                                    </>
                                )}
                            </Button>
                        </div>
                        {/* Gallery Preview */}
                        {galleryImages.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium mb-2">
                                    Fotos da Galeria ({galleryImages.length})
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {galleryImages.map((imageUrl, index) => (
                                        <div key={imageUrl} className="relative group">
                                            <div className="aspect-square relative rounded-lg overflow-hidden">
                                                <Image
                                                    src={imageUrl}
                                                    alt={`Gallery image ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleRemoveGalleryImage(index)}
                                                type="button"
                                            >
                                                <Trash className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <Button type="submit">Salvar Alterações</Button>
                </form>
            </Form>
        </div>
    );
}
