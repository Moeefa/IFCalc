import {
	Card,
	CardTitle,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PROVIDER_NAMES } from "@/lib/constants";

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
							<CardTitle className="text-xl">Bem-vindo</CardTitle>
							<CardDescription>
								Para acessar suas notas e frequência, faça login com a conta do
								SUAP de seu Instituto Federal.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form action={`/api/auth/${params.suap}/login`} method="POST">
								<div className="grid gap-6">
									<div className="grid gap-6">
										<div className="grid gap-2">
											{Object.entries(PROVIDER_NAMES).map(([key, value]) => (
												<Link
													href={`/login/${key}`}
													key={key}
													className="w-full"
												>
													<Button className="w-full mb-1">{value}</Button>
												</Link>
											))}
										</div>
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
