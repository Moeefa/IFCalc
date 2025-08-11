import Link from "next/link";
import Image from "next/image";

export default async function Home() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full">
			<Link
				href="/calculadora"
				className="md:col-span-2 sm:h-full h-36 lg:col-span-2 md:row-span-2 bg-card-gradient rounded-2xl p-6 flex items-center justify-center border border-border"
			>
				<div className="text-center">
					<h2 className="sm:text-2xl text-xl font-semibold mb-2">
						Calculadora
					</h2>
					<p className="text-muted-foreground font-semibold">
						Use a calculadora para descobrir a média de suas notas
					</p>
				</div>
			</Link>

			<Link
				href="/trabalhos"
				className="lg:col-span-2 sm:h-full h-36 bg-card-gradient rounded-2xl p-6 flex items-center justify-center border border-border"
			>
				<div className="text-center">
					<h3 className="sm:text-xl text-xl font-semibold mb-1">Trabalhos</h3>
					<p className="text-muted-foreground font-semibold">
						Veja os trabalhos pendentes e suas datas de entrega
					</p>
				</div>
			</Link>

			<Link
				href="/mensagens"
				className="sm:h-full h-36 bg-card-gradient rounded-2xl p-6 flex items-center justify-center border border-border"
			>
				<div className="text-center">
					<h3 className="sm:text-lg text-xl font-semibold mb-1">Mensagens</h3>
					<p className="text-muted-foreground font-semibold sm:text-sm">
						Novas mensagens e notificações
					</p>
				</div>
			</Link>

			<Link
				href="/materiais"
				className="sm:h-full h-36 bg-card-gradient rounded-2xl p-6 flex items-center justify-center border border-border"
			>
				<div className="text-center">
					<h3 className="sm:text-lg text-xl font-semibold mb-1">Materiais</h3>
					<p className="text-muted-foreground font-semibold sm:text-sm">
						Acesse os materiais de suas disciplinas
					</p>
				</div>
			</Link>

			<Link
				href="/materias"
				className="sm:h-full h-36 md:col-span-2 bg-card-gradient rounded-2xl p-6 flex items-center justify-center border border-border"
			>
				<div className="text-center">
					<h3 className="sm:text-xl text-xl font-semibold mb-2">Matérias</h3>
					<p className="text-muted-foreground font-semibold">
						Visualize suas matérias e notas
					</p>
				</div>
			</Link>

			<div className="rounded-2xl p-6 items-center justify-center text-white sm:flex hidden">
				<Image
					src="/icon.svg"
					alt="Logo"
					width={128}
					height={128}
					className="size-32"
				/>
			</div>
		</div>
	);
}
