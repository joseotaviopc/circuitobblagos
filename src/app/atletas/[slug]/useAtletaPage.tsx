import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateAtleta } from "@/app/actions";
import { useData } from "@/context/data-context";
import type { Atleta } from "../../../../db/schema";

const formSchema = z.object({
	nome: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z
		.string()
		.email({ message: "Invalid email." })
		.optional()
		.or(z.literal("")),
	telefone: z.string().optional().or(z.literal("")),
	cpf: z.string().optional().or(z.literal("")),
	nascimento: z.string().optional().or(z.literal("")),
	estado: z.string().optional().or(z.literal("")),
	profileUrl: z
		.string()
		.url({ message: "Invalid URL for profile image." })
		.optional()
		.or(z.literal("")),
	actionUrl: z
		.string()
		.url({ message: "Invalid URL." })
		.optional()
		.or(z.literal("")),
	bio: z.string().optional().or(z.literal("")),
	isAffiliated: z.boolean().optional(),
	socialLinks: z.string().optional().or(z.literal("")),
	fotos: z.string().optional().or(z.literal("")),
	videos: z.string().optional().or(z.literal("")),
	resultados: z.string().optional().or(z.literal("")),
	eventos: z.string().optional().or(z.literal("")),
	vitorias: z.string().optional().or(z.literal("")),
	podios: z.string().optional().or(z.literal("")),
});

export type UseAtletaForm = z.infer<typeof formSchema>;

export function useAtletaPage({ atleta }: { atleta?: Atleta }) {
	// console.log("atleta => ", JSON.stringify(atleta, null, 4))
	const { refreshAtletas } = useData();
	const [isEditing, setIsEditing] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(atleta?.profileUrl || null);
	const [socialLinksList, setSocialLinksList] = useState<string[]>(
		atleta?.socialLinks || [],
	);
	const [socialInput, setSocialInput] = useState("");
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	// Image upload state
	const [uploadingImage, setUploadingImage] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [uploadError, setUploadError] = useState<string | null>(null);
	const [galleryImages, setGalleryImages] = useState<string[]>(atleta?.fotos || []);
	const [uploadingGallery, setUploadingGallery] = useState(false);
	const [galleryUploadProgress, setGalleryUploadProgress] = useState<{ [key: string]: number }>({});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: atleta?.nome,
			email: atleta?.email || "",
			telefone: atleta?.telefone || "",
			cpf: atleta?.cpf || "",
			nascimento: atleta?.nascimento || "",
			estado: atleta?.estado || "",
			profileUrl: atleta?.profileUrl || "",
			actionUrl: atleta?.actionUrl || "",
			bio: atleta?.bio || "",
			isAffiliated: atleta?.isAffiliated === "true",
			socialLinks: JSON.stringify(atleta?.socialLinks || []),
			fotos: JSON.stringify(atleta?.fotos || []),
			videos: JSON.stringify(atleta?.videos || []),
			resultados: JSON.stringify(atleta?.resultados || { results: [] }),
			eventos: atleta?.estatisticas?.eventos?.toString() || "",
			vitorias: atleta?.estatisticas?.vitorias?.toString() || "",
			podios: atleta?.estatisticas?.podios?.toString() || "",
		},
	});

	function handleAddOrUpdateSocial() {
		const trimmed = socialInput.trim();
		if (!trimmed) return;
		if (editingIndex !== null) {
			setSocialLinksList((prev) =>
				prev.map((v, i) => (i === editingIndex ? trimmed : v)),
			);
			setEditingIndex(null);
		} else {
			setSocialLinksList((prev) => [...prev, trimmed]);
		}
		setSocialInput("");
	}

	function handleEditSocial(idx: number) {
		setEditingIndex(idx);
		setSocialInput(socialLinksList[idx]);
	}

	function handleRemoveSocial(idx: number) {
		setSocialLinksList((prev) => prev.filter((_, i) => i !== idx));
		if (editingIndex !== null && editingIndex === idx) {
			setEditingIndex(null);
			setSocialInput("");
		}
	}

	// Handle file upload to cloud storage
	// async function handleFileUpload(file: File) {
	// 	try {
	// 		setUploadingImage(true);
	// 		setUploadError(null);
	// 		setUploadProgress(0);

	// 		// Validate file before upload
	// 		const fileValidation = validateFile(file);
	// 		if (!fileValidation.valid) {
	// 			throw new Error(fileValidation.error);
	// 		}

	// 		// Validate image dimensions
	// 		const dimensionValidation = await validateImageDimensions(file);
	// 		if (!dimensionValidation.valid) {
	// 			throw new Error(dimensionValidation.error);
	// 		}

	// 		// Create preview URL
	// 		const reader = new FileReader();
	// 		reader.onload = (e) => {
	// 			if (typeof e.target?.result === 'string') {
	// 				setPreviewUrl(e.target.result);
	// 			}
	// 		};
	// 		reader.readAsDataURL(file);

	// 		// Simulate progress for better UX
	// 		setUploadProgress(10);

	// 		// Upload directly to Cloudinary via uploadService
	// 		const result = await uploadService.uploadImage(file, 'profile');

	// 		setUploadProgress(100);

	// 		// Update form with new URL
	// 		form.setValue('profileUrl', result.publicUrl);
	// 		setPreviewUrl(result.publicUrl);

	// 		setUploadingImage(false);
	// 		return result;
	// 	} catch (error) {
	// 		setUploadingImage(false);
	// 		setUploadError(error instanceof Error ? error.message : 'Upload failed');
	// 		throw error;
	// 	}
	// }

	// Handle gallery image uploads
	// async function handleGalleryUpload(files: File[]) {
	// 	try {
	// 		setUploadingGallery(true);
	// 		setUploadError(null);

	// 		const uploadPromises = files.map(async (file, index) => {
	// 			const fileId = `file-${index}-${Date.now()}`;

	// 			// Track progress for each file
	// 			setGalleryUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

	// 			try {
	// 				// Validate each file before upload
	// 				const fileValidation = validateFile(file);
	// 				if (!fileValidation.valid) {
	// 					console.error(`File validation failed for ${file.name}:`, fileValidation.error);
	// 					setGalleryUploadProgress(prev => ({ ...prev, [fileId]: -1 }));
	// 					return null;
	// 				}

	// 				// Validate image dimensions
	// 				const dimensionValidation = await validateImageDimensions(file);
	// 				if (!dimensionValidation.valid) {
	// 					console.error(`Dimension validation failed for ${file.name}:`, dimensionValidation.error);
	// 					setGalleryUploadProgress(prev => ({ ...prev, [fileId]: -1 }));
	// 					return null;
	// 				}

	// 				setGalleryUploadProgress(prev => ({ ...prev, [fileId]: 25 }));

	// 				// Upload directly to Cloudinary via uploadService
	// 				const result = await uploadService.uploadImage(file, 'gallery');

	// 				setGalleryUploadProgress(prev => ({ ...prev, [fileId]: 100 }));
	// 				return result.publicUrl;
	// 			} catch (error) {
	// 				console.error(`Failed to upload ${file.name}:`, error);
	// 				setGalleryUploadProgress(prev => ({ ...prev, [fileId]: -1 })); // -1 indicates error
	// 				return null;
	// 			}
	// 		});

	// 		const uploadedUrls = await Promise.all(uploadPromises);
	// 		const successfulUploads = uploadedUrls.filter(url => url !== null) as string[];

	// 		// Update gallery images
	// 		const newGalleryImages = [...galleryImages, ...successfulUploads];
	// 		setGalleryImages(newGalleryImages);
	// 		form.setValue('fotos', JSON.stringify(newGalleryImages));

	// 		setUploadingGallery(false);
	// 		setGalleryUploadProgress({});

	// 		return successfulUploads;
	// 	} catch (error) {
	// 		setUploadingGallery(false);
	// 		setUploadError(error instanceof Error ? error.message : 'Gallery upload failed');
	// 		setGalleryUploadProgress({});
	// 		throw error;
	// 	}
	// }

	// Remove image from gallery
	function handleRemoveGalleryImage(index: number) {
		const newGalleryImages = galleryImages.filter((_, i) => i !== index);
		setGalleryImages(newGalleryImages);
		form.setValue('fotos', JSON.stringify(newGalleryImages));
	}

	// Handle Cloudinary upload widget result
	function handleCloudinaryUpload(result: any) {
		if (result.event === 'success') {
			const uploadedUrl = result.info.secure_url;
			const publicId = result.info.public_id;

			// Check if it's a profile image upload based on folder
			if (publicId.includes('profile')) {
				// Update profile image
				form.setValue('profileUrl', uploadedUrl);
				// console.log('Profile image updated =>', uploadedUrl)
				setPreviewUrl(uploadedUrl);
			} else if (publicId.includes('gallery')) {
				// Add to gallery
				const newGalleryImages = [...galleryImages, uploadedUrl];
				setGalleryImages(newGalleryImages);
				form.setValue('fotos', JSON.stringify(newGalleryImages));
			}

			// console.log('Upload successful:', {
			// 	url: uploadedUrl,
			// 	publicId: publicId,
			// 	width: result.info.width,
			// 	height: result.info.height,
			// 	format: result.info.format
			// });
		}
	}

	// Handle single profile image upload
	const handleProfileImageUpload = async (file: File) => {
		try {
			setUploadingImage(true);
			setUploadError(null);
			setUploadProgress(0);

			// Create preview URL immediately
			const reader = new FileReader();
			reader.onload = (e) => {
				if (typeof e.target?.result === 'string') {
					setPreviewUrl(e.target.result);
				}
			};
			reader.readAsDataURL(file);

			setUploadProgress(25);

			// Upload to Cloudinary
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'circuito-bb-lagos-profile');

			const response = await fetch(`https://api.cloudinary.com/v1_1/dp2qljyxs/upload`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Upload failed');
			}

			const result = await response.json();

			if (result.secure_url) {
				setUploadProgress(100);
				form.setValue('profileUrl', result.secure_url);
				setPreviewUrl(result.secure_url);
				setUploadingImage(false);
				return result.secure_url;
			} else {
				throw new Error('No URL returned from upload');
			}
		} catch (error) {
			setUploadingImage(false);
			setUploadError(error instanceof Error ? error.message : 'Upload failed');
			throw error;
		}
	};

	const handleMultipleFileUpload = async (files: FileList) => {
		const uploadPromises = Array.from(files).map((file) => {
			return new Promise<string>((resolve, reject) => {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('upload_preset', 'circuito-bb-lagos-gallery'); // Replace with your upload preset

				fetch(`https://api.cloudinary.com/v1_1/dp2qljyxs/upload`, {
					method: 'POST',
					body: formData,
				})
					.then((response) => response.json())
					.then((result) => {
						if (result.secure_url) {
							resolve(result.secure_url);
						} else {
							reject(new Error('Upload failed'));
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		});

		try {
			const uploadedUrls = await Promise.all(uploadPromises);
			setGalleryImages((prevImages) => {
				const newImages = [...prevImages, ...uploadedUrls];
				form.setValue('fotos', JSON.stringify(newImages));
				return newImages;
			});
		} catch (error) {
			console.error('Error uploading files:', error);
		}
	};

	// Delete image from cloud storage
	// async function handleDeleteImage(publicId: string): Promise<boolean> {
	// 	try {
	// 		const success = await uploadService.deleteImage(publicId);
	// 		if (!success) {
	// 			console.error('Failed to delete image from cloud storage');
	// 		}
	// 		return success;
	// 	} catch (error) {
	// 		console.error('Error deleting image:', error);
	// 		return false;
	// 	}
	// }

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsEditing(true)
		try {
			// Parse JSON fields safely
			let parsedSocialLinks: string[] = [];
			let parsedFotos: string[] = [];
			let parsedVideos: string[] = [];
			let parsedResultados: any = { results: [] };

			try {
				parsedSocialLinks = values.socialLinks
					? JSON.parse(values.socialLinks)
					: [];
			} catch (_e) {
				alert("Invalid JSON in socialLinks");
				return;
			}
			try {
				parsedFotos = values.fotos ? JSON.parse(values.fotos) : [];
			} catch (_e) {
				alert("Invalid JSON in fotos");
				return;
			}
			try {
				parsedVideos = values.videos ? JSON.parse(values.videos) : [];
			} catch (_e) {
				alert("Invalid JSON in videos");
				return;
			}
			try {
				parsedResultados = values.resultados
					? JSON.parse(values.resultados)
					: { results: [] };
			} catch (_e) {
				alert("Invalid JSON in resultados");
				return;
			}

			const estatisticas = {
				eventos: values.eventos
					? Number(values.eventos)
					: atleta?.estatisticas?.eventos || 0,
				vitorias: values.vitorias
					? Number(values.vitorias)
					: atleta?.estatisticas?.vitorias || 0,
				podios: values.podios
					? Number(values.podios)
					: atleta?.estatisticas?.podios || 0,
			};

			const updateData = {
				nome: values.nome,
				email: values.email || null,
				telefone: values.telefone || null,
				cpf: values.cpf || null,
				nascimento: values.nascimento || null,
				estado: values.estado || null,
				profileUrl: values.profileUrl || null,
				actionUrl: values.actionUrl || null,
				bio: values.bio || null,
				isAffiliated: values.isAffiliated ? "true" : "false",
				socialLinks: parsedSocialLinks,
				fotos: parsedFotos,
				videos: parsedVideos,
				resultados: parsedResultados,
				estatisticas,
			};

			// console.log('updateData => ', updateData)
			const updatedAtleta = await updateAtleta(atleta?.id || "", updateData);

			// console.log("updatedAtleta => ", updatedAtleta);
			await refreshAtletas();
		} catch (error) {
			console.error("Failed to update athlete:", error);
			alert("Failed to update athlete.");
		} finally {
			setIsEditing(false);
		}
	}

	return {
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
	};
}
