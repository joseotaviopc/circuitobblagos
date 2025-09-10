"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useData } from "@/context/data-context";
import { slugify } from "@/lib/utils";
import { DisplayAtleta } from "./display-atleta";
import { EditAtleta } from "./edit-atleta";
import { useAtletaPage } from "./useAtletaPage";

export default function AthleteProfilePage() {
	const { slug } = useParams();
	const { user } = useUser();
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
		previewUrl,
		setIsEditing,
		isEditing,
		setSocialInput,
		socialInput,
		socialLinksList,
		editingIndex,
		handleCloudinaryUpload,
		handleProfileImageUpload,
		handleMultipleFileUpload,
		uploadingImage,
		uploadProgress,
		uploadError,
		handleRemoveGalleryImage,
		galleryImages,
		uploadingGallery,
		galleryUploadProgress,
	} = useAtletaPage({ atleta });

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		maxFiles: 1,
		accept: {
			"image/*": [],
		},
		onDrop: async (acceptedFiles) => {
			if (acceptedFiles[0]) {
				try {
					// Upload to cloud storage
					// await handleFileUpload(acceptedFiles[0]);
				} catch (error) {
					// console.error("Upload failed:", error);
					// Fallback to local preview
					// const reader = new FileReader();
					// reader.readAsDataURL(acceptedFiles[0]);
					// reader.onload = (e) => {
					// 	if (typeof e.target?.result === "string")
					// 		setPreviewUrl(e.target?.result);
					// };
				}
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
					handleCloudinaryUpload={handleCloudinaryUpload}
					handleProfileImageUpload={handleProfileImageUpload}
					handleMultipleFileUpload={handleMultipleFileUpload}
					uploadingImage={uploadingImage}
					uploadProgress={uploadProgress}
					uploadError={uploadError}
					handleRemoveGalleryImage={handleRemoveGalleryImage}
					galleryImages={galleryImages}
					uploadingGallery={uploadingGallery}
					galleryUploadProgress={galleryUploadProgress}
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
