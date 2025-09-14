import "../globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { ErrorBoundary } from "@/components/common/error-boundary";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AppSidebar />
			<div className="flex flex-col min-h-screen overflow-hidden p-6 w-full">
				<Header />
				<main className="flex flex-col flex-1 relative my-6">
					<Link
						href="https://instagram.com/pet.autonet"
						target="_blank"
						className="mb-6 max-[275px]:hidden h-32 min-h-32"
					>
						<div className="relative w-full h-full rounded-2xl overflow-hidden border border-border mb-6">
							<Image
								src="/image.png"
								alt="PET Autonet"
								fill
								className="absolute top-0 left-0 blur-sm h-full w-full object-cover rounded-2xl overflow-hidden"
							/>
							<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 rounded-2xl overflow-hidden" />
							<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-2">
								<h1 className="sm:text-3xl text-xl font-bold text-center text-white">
									Conheça o PET Autonet
								</h1>
								<p className="sm:text-base text-sm text-white text-center mt-2 font-semibold max-w-xl">
									Transforme curiosidade em conhecimento! O PET Autonet conecta
									teoria e prática com projetos inovadores.
								</p>
							</div>
						</div>
					</Link>
					<ErrorBoundary>{children}</ErrorBoundary>
				</main>
				<Footer />
			</div>
		</>
	);
}
