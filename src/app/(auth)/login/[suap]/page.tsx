"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowInIcon } from "@/components/icons/arrow-in";
import { SUAP_ERRPORS } from "@/lib/constants";

const loginSchema = z.object({
	matricula: z.string(),
	senha: z.string(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage({ params }: { params: { suap: string } }) {
	const router = useRouter();
	const [serverError, setServerError] = React.useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			matricula: "",
			senha: "",
		},
	});

	async function onSubmit(data: LoginFormValues) {
		setServerError(null);

		const formData = new FormData();
		formData.append("matricula", data.matricula);
		formData.append("senha", data.senha);

		const res = await fetch(`/api/auth/${params.suap}/login`, {
			method: "POST",
			body: formData,
		});

		if (res.ok) {
			router.push("/");
		} else {
			const json = await res.json();
			setServerError(json.error || "Erro ao fazer login.");
		}
	}

	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 w-full">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className="flex items-center gap-2 self-center">
					<div className="text-primary-foreground flex size-12 items-center justify-center rounded-md">
						<Image src="/icon.svg" alt="Logo" width={200} height={200} />
						<Separator orientation="vertical" className="h-10 mx-4" />
						<Image
							src="/suap.png"
							alt="SUAP"
							width={48}
							height={48}
							className="ml-2"
						/>
					</div>
				</div>

				<Card className="w-full bg-card-gradient shadow-none rounded-2xl border border-border">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">
							SUAP {params.suap.toUpperCase()}
						</CardTitle>
						<CardDescription className="font-semibold">
							Para acessar suas notas e frequência, faça login com sua conta
							SUAP.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
							<div className="grid gap-3">
								<Label htmlFor="matricula" className="font-semibold">
									Matrícula
								</Label>
								<Input
									id="matricula"
									type="text"
									className="rounded-md bg-muted font-semibold"
									{...register("matricula")}
								/>
								{errors.matricula && (
									<p className="text-sm text-red-500 font-medium">
										{errors.matricula.message}
									</p>
								)}
							</div>

							<div className="grid gap-3">
								<Label htmlFor="senha" className="font-semibold">
									Senha
								</Label>
								<Input
									id="senha"
									type="password"
									className="rounded-md bg-muted font-semibold"
									{...register("senha")}
								/>
								{errors.senha && (
									<p className="text-sm text-red-500 font-medium">
										{errors.senha.message}
									</p>
								)}
							</div>

							{serverError && (
								<p className="text-red-500 text-center font-medium text-sm">
									{SUAP_ERRPORS[serverError as keyof typeof SUAP_ERRPORS] ||
										serverError}
								</p>
							)}

							<Button
								type="submit"
								className="w-full font-semibold border border-border"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Entrando..." : "Entrar"}
								<ArrowInIcon className="size-5 ml-2" />
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
