"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { createContactMessage } from "../actions";

const contactFormSchema = z.object({
	name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
	email: z.string().email("Email inválido"),
	message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContatoPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error" | null;
		message: string;
	}>({ type: null, message: "" });

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const onSubmit = async (data: ContactFormData) => {
		setIsSubmitting(true);
		setSubmitStatus({ type: null, message: "" });

		try {
			const result = await createContactMessage(data);

			if (result.success) {
				setSubmitStatus({
					type: "success",
					message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
				});
				form.reset();
			} else {
				setSubmitStatus({
					type: "error",
					message: result.error || "Erro ao enviar mensagem. Tente novamente.",
				});
			}
		} catch (error) {
			setSubmitStatus({
				type: "error",
				message: "Erro inesperado. Tente novamente mais tarde.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-headline tracking-tight leading-tight">
					Contato
				</h1>
				<p className="mt-2 text-base md:text-lg text-muted-foreground">
					Fale conosco, tire suas dúvidas ou envie suas sugestões.
				</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Envie uma Mensagem</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input placeholder="Seu nome completo" {...field} />
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
												<Input
													type="email"
													placeholder="seu@email.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mensagem</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Escreva sua mensagem aqui..."
													rows={6}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{submitStatus.type && (
									<div
										className={`p-3 rounded-md text-sm ${submitStatus.type === "success"
											? "bg-green-50 text-green-700 border border-green-200"
											: "bg-red-50 text-red-700 border border-red-200"
											}`}
									>
										{submitStatus.message}
									</div>
								)}

								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<>
											<LoadingSpinner className="mr-2 h-4 w-4" />
											Enviando...
										</>
									) : (
										<>
											<Send className="mr-2 h-4 w-4" />
											Enviar Mensagem
										</>
									)}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Nossas Informações</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6 text-base">
						<div className="flex items-start gap-3 md:gap-4">
							<div className="h-5 w-5 md:h-8 md:w-8">
								<MapPin className="h-5 w-5 md:h-8 md:w-8 text-primary mt-1" />
							</div>
							<div>
								<h3 className="font-semibold">Endereço</h3>
								<p className="text-muted-foreground">
									Av. Litorânea, 1234 - Praia do Forte, Cabo Frio - RJ,
									28900-000
								</p>
							</div>
						</div>
						<div className="flex items-start gap-3 md:gap-4">
							<div className="h-5 w-5 md:h-8 md:w-8">
								<Mail className="h-5 w-5 md:h-8 md:w-8 text-primary mt-1" />
							</div>
							<div>
								<h3 className="font-semibold">Email</h3>
								<p className="text-muted-foreground">contato@bblagos.com.br</p>
							</div>
						</div>
						<div className="flex items-start gap-3 md:gap-4">
							<div className="h-5 w-5 md:h-8 md:w-8">
								<Phone className="h-5 w-5 md:h-8 md:w-8 text-primary mt-1" />
							</div>
							<div>
								<h3 className="font-semibold">Telefone</h3>
								<p className="text-muted-foreground">(22) 99999-8888</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
