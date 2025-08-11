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
import Image from "next/image";

export default function Page({ params }: { params: { suap: string } }) {
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 w-full">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<div className="flex items-center gap-2 self-center">
					<div className="text-primary-foreground flex size-12 items-center justify-center rounded-md">
						<Image src="/icon.svg" alt="Logo" width={200} height={200} />
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<Card className="w-full bg-card-gradient shadow-none rounded-2xl border border-border">
						<CardHeader className="text-center">
							<CardTitle className="text-xl">
								SUAP {params.suap.toUpperCase()}
							</CardTitle>
							<CardDescription>
								Para acessar suas notas e frequência, faça login com a conta do
								SUAP de seu Instituto Federal.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form action={`/api/auth/${params.suap}/login`} method="POST">
								<div className="grid gap-6">
									<div className="grid gap-6">
										<div className="grid gap-3">
											<Label htmlFor="matricula">Matrícula</Label>
											<Input
												className="rounded-md"
												name="matricula"
												id="matricula"
												type="text"
												placeholder=""
												required
											/>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="senha">Senha</Label>
											<Input
												className="rounded-md"
												name="senha"
												id="senha"
												type="password"
												required
											/>
										</div>
										<Button type="submit" className="w-full">
											Entrar
										</Button>
									</div>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
