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
	const { refreshAtletas } = useData();
	const [isEditing, setIsEditing] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [socialLinksList, setSocialLinksList] = useState<string[]>(
		atleta?.socialLinks || [],
	);
	const [socialInput, setSocialInput] = useState("");
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

	async function onSubmit(values: z.infer<typeof formSchema>) {
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
			const updatedAtleta = await updateAtleta(atleta?.id || "", updateData);
			console.log("updatedAtleta => ", updatedAtleta);
			refreshAtletas();
			setIsEditing(false);
		} catch (error) {
			console.error("Failed to update athlete:", error);
			alert("Failed to update athlete.");
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
	};
}
