"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Instagram } from "@/components/icons/socials/instagram";
import { Github } from "@/components/icons/socials/github";
import { LinkedIn } from "@/components/icons/socials/linkedin";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Contributor } from "../../types/utils";

export const contributors: Contributor[] = [
	{
		name: "Gabriel Mendes",
		origin: "Rio Grande do Norte",
		image: "ifrn_gabriel.jpg",
		redirect_url: "https://www.linkedin.com/in/gabriel-mendes-bb5571264/",
		socials: [
			{
				name: "Instagram",
				url: "https://www.instagram.com/gabrielmenndess/",
			},
			{
				name: "LinkedIn",
				url: "https://www.linkedin.com/in/gabriel-mendes-bb5571264/",
			},
			{
				name: "GitHub",
				url: "https://github.com/GabrielMendessDev",
			},
		],
	},
];

export const Footer = () => {
	return (
		<footer className=" bg-card-gradient rounded-2xl border border-border">
			<div className="px-0 py-12">
				<div className="grid grid-cols-1 px-6 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
					<div className="lg:col-span-2">
						<div className="flex items-center gap-4 mb-6">
							<Image
								width={64}
								height={64}
								src="/avatar.jpg"
								alt="Luiz Henrique da Silva Xinaider"
								className="size-16 rounded-full"
							/>
							<div>
								<h3 className="text-xl font-semibold">
									Luiz Henrique da Silva Xinaider
								</h3>
							</div>
						</div>

						{/* Social Links */}
						<div className="flex items-center gap-3">
							<div className="flex gap-2">
								<a
									href="https://github.com/Moeefa"
									target="_blank"
									rel="noopener noreferrer"
									className="transition-colors group"
								>
									<Github size="1.5rem" />
								</a>
								<a
									href="https://www.linkedin.com/in/xinaider"
									target="_blank"
									rel="noopener noreferrer"
									className="transition-colors group"
								>
									<LinkedIn size="1.5rem" />
								</a>
								<a
									href="https://www.instagram.com/schneider_com_x"
									target="_blank"
									rel="noopener noreferrer"
									className="transition-colors group"
								>
									<Instagram size="1.5rem" />
								</a>
							</div>
						</div>
					</div>

					{/* <div> */}
					{/* 	<h4 className="font-semibold mb-4">Sobre o IFCalc</h4> */}
					{/* 	<ul className="space-y-2 text-sm text-muted-foreground"> */}
					{/* 		<li> */}
					{/* 			<a */}
					{/* 				href="#" */}
					{/* 				className="font-semibold hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1" */}
					{/* 			> */}
					{/* 				Como usar */}
					{/* 				<ExternalLink size={12} /> */}
					{/* 			</a> */}
					{/* 		</li> */}
					{/* 		<li> */}
					{/* 			<a */}
					{/* 				href="#" */}
					{/* 				className="font-semibold hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1" */}
					{/* 			> */}
					{/* 				Funcionalidades */}
					{/* 				<ExternalLink size={12} /> */}
					{/* 			</a> */}
					{/* 		</li> */}
					{/* 	</ul> */}
					{/* </div> */}

					<div>
						<h4 className="font-semibold mb-4">Suporte</h4>
						<ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
							<li>
								<a
									href="mailto:moeefa@protonmail.com"
									className="font-semibold hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1"
								>
									Contato
									<ExternalLink size={12} />
								</a>
							</li>
							<li>
								<a
									href="https://github.com/Moeefa/ifcalc"
									className="font-semibold hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1"
								>
									Repositório
									<ExternalLink size={12} />
								</a>
							</li>
							<li>
								<a
									href="https://github.com/Moeefa/ifcalc/blob/v3/README.md"
									className="font-semibold hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1"
								>
									Documentação
									<ExternalLink size={12} />
								</a>
							</li>
						</ul>
					</div>
				</div>

				{contributors.length > 0 && (
					<>
						<Separator className="my-8" />
						<div className="mt-12">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-6xl mx-auto px-6">
								<div className="flex flex-col items-start justify-center gap-3">
									<h4 className="text-sm font-semibold">Contribuidores:</h4>
									<div className="flex -space-x-2 hover:space-x-1 transition-all duration-300">
										{contributors.map((contributor, i) => (
											<HoverCard key={i}>
												<HoverCardTrigger asChild>
													<Link
														rel="noopener"
														target="_blank"
														href={contributor.redirect_url}
													>
														<div className="flex items-center space-x-1">
															<Avatar className="rounded-full size-6">
																<AvatarImage
																	src={contributor.image}
																	alt={contributor.name}
																	className="rounded-full"
																/>
																<AvatarFallback className="text-xs">
																	{contributor.name.at(0)}
																</AvatarFallback>
															</Avatar>
														</div>
													</Link>
												</HoverCardTrigger>
												<HoverCardContent className="w-80">
													<div className="flex justify-between space-x-4">
														<Avatar className="rounded-full size-10">
															<AvatarImage
																className="rounded-full"
																src={contributor.image}
															/>
															<AvatarFallback>
																{contributor.name.at(0)}
															</AvatarFallback>
														</Avatar>
														<div className="space-y-1">
															<h4 className="text-sm font-semibold">
																{contributor.name}
															</h4>
															<p className="text-sm font-semibold">
																{contributor.description ||
																	`Contribuiu com a autenticação de\n${contributor.origin}`}
															</p>
															<div className="flex gap-3 items-center pt-2">
																{contributor.socials.map((social, i) => (
																	<Link
																		key={i}
																		rel="noopener"
																		target="_blank"
																		href={social.url}
																		className="text-xs text-muted-foreground underline flex items-center"
																	>
																		{social.name}{" "}
																		<ExternalLink className="ml-1 h-3.5 w-3.5" />
																	</Link>
																))}
															</div>
														</div>
													</div>
												</HoverCardContent>
											</HoverCard>
										))}
									</div>
								</div>

								<div className="text-sm font-semibold">
									Agradecimento especial aos contribuidores
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</footer>
	);
};
