"use client";

import { SignIn } from "@/components/auth-buttons";
import { CalculatorIcon } from "@/components/icons/calculator";
import { CalendarDaysIcon } from "@/components/icons/calendar-days";
import { TasksIcon } from "@/components/icons/tasks";
import { InboxIcon } from "@/components/icons/inbox";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RulerPenIcon } from "@/components/icons/ruler-pen";
import { PaperclipIcon } from "@/components/icons/paperclip";

export default function Home() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	// Parallax transforms for hero section
	const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
	const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.7]);
	const heroScale = useTransform(scrollYProgress, [0, 0.9], [1, 0.98]);

	// Parallax transforms for grade cards (more subtle)
	const cardY = useTransform(scrollYProgress, [0.3, 0.7], ["5%", "-5%"]);
	const card2Y = useTransform(scrollYProgress, [0.25, 0.75], ["8%", "-8%"]);
	const card3Y = useTransform(scrollYProgress, [0.35, 0.65], ["3%", "-3%"]);

	return (
		<div ref={containerRef} className="overflow-hidden">
			{/* Hero Section */}
			<motion.section
				className="py-20 px-6 text-center"
				style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
			>
				<div className="container mx-auto max-w-4xl">
					<motion.h1
						className="text-4xl md:text-6xl font-bold mb-6"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						Simplifique sua vida acadêmica
					</motion.h1>
					<motion.p
						className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-semibold"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
					>
						Gerencie suas notas, horários e atividades acadêmicas de forma
						inteligente e organizada.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
					>
						<SignIn size="lg" className="text-lg px-8">
							Começar agora
						</SignIn>
					</motion.div>
				</div>
			</motion.section>

			{/* Grade Preview Section */}
			<section className="py-16 px-6">
				<div className="container mx-auto max-w-6xl">
					<motion.h2
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						className="text-3xl md:text-4xl font-bold text-center mb-12"
					>
						Visualize suas notas de forma clara
					</motion.h2>
					<motion.p
						className="text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto font-semibold"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
					>
						IFCalc é uma calculadora de notas que ajuda estudantes a calcular
						suas notas finais com base em suas pontuações atuais e no peso de
						cada avaliação. Perfeita para quem quer acompanhar seu desempenho
						acadêmico.
					</motion.p>

					<div className="flex relative flex-wrap justify-center gap-10 select-none">
						<motion.div
							className="p-4 z-50 border bg-card-gradient rounded-3xl h-80 w-72 shadow-2xl"
							style={{ y: cardY }}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<div className="p-6 border bg-card-gradient rounded-[calc(theme(borderRadius.3xl)-0.5rem)] h-full w-full shadow">
								<h2 className="text-2xl font-bold mb-4">Matemática</h2>
								<h2 className="text-6xl font-extrabold mb-2">9.5</h2>
								<h3 className="text-lg font-semibold mb-4 text-green-600">
									Aprovado
								</h3>
							</div>
						</motion.div>
						<motion.div
							className="p-4 scale-90 rotate-[5deg] opacity-75 absolute left-[13.55rem] border bg-card-gradient rounded-3xl h-80 w-72 shadow-lg"
							style={{ y: card2Y }}
							initial={{ opacity: 0, y: 50, rotate: 5 }}
							whileInView={{ opacity: 0.75, y: 0, rotate: 5 }}
							transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<div className="p-6 border bg-card-gradient rounded-[calc(theme(borderRadius.3xl)-0.5rem)] h-full w-full shadow">
								<h2 className="text-2xl font-bold mb-4">História</h2>
								<h2 className="text-6xl font-extrabold mb-2">8.7</h2>
								<h3 className="text-lg font-semibold mb-4 text-green-600">
									Aprovado
								</h3>
							</div>
						</motion.div>
						<motion.div
							className="p-4 scale-90 -rotate-[3deg] opacity-75 absolute right-[13.55rem] border bg-card-gradient rounded-3xl h-80 w-72 shadow-lg"
							style={{ y: card3Y }}
							initial={{ opacity: 0, y: 50, rotate: -3 }}
							whileInView={{ opacity: 0.75, y: 0, rotate: -3 }}
							transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<div className="p-6 border bg-card-gradient rounded-[calc(theme(borderRadius.3xl)-0.5rem)] h-full w-full shadow">
								<h2 className="text-2xl font-bold mb-4">Biologia</h2>
								<h2 className="text-6xl font-extrabold mb-2">9.0</h2>
								<h3 className="text-lg font-semibold mb-4 text-green-600">
									Aprovado
								</h3>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-6">
				<div className="container mx-auto max-w-6xl">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
						Tudo que você precisa em um só lugar
					</h2>
					<p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto font-semibold">
						Acesse todas as informações do seu curso de forma rápida e
						organizada
					</p>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<motion.div
							className="text-center p-6"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div
								className="inline-flex items-center justify-center size-16 border border-border bg-card-gradient rounded-2xl mb-4"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: 0.2, ease: "backOut" }}
								viewport={{ once: true }}
							>
								<CalculatorIcon className="size-8" />
							</motion.div>
							<h3 className="text-xl font-semibold mb-3">
								Calculadora de notas
							</h3>
							<p className="text-muted-foreground font-semibold">
								Calcule suas notas finais e descubra o que precisa tirar nas
								próximas avaliações para ser aprovado.
							</p>
						</motion.div>
						<motion.div
							className="text-center p-6"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div
								className="inline-flex items-center justify-center size-16 border border-border bg-card-gradient rounded-2xl mb-4"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
								viewport={{ once: true }}
							>
								<CalendarDaysIcon className="size-8" />
							</motion.div>
							<h3 className="text-xl font-semibold mb-3">Horários</h3>
							<p className="text-muted-foreground font-semibold">
								Visualize seus horários de aula de forma clara e organizada,
								nunca mais perca uma aula.
							</p>
						</motion.div>
						<motion.div
							className="text-center p-6"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div
								className="inline-flex items-center justify-center size-16 border border-border bg-card-gradient rounded-2xl mb-4"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: 0.4, ease: "backOut" }}
								viewport={{ once: true }}
							>
								<TasksIcon className="size-8" />
							</motion.div>
							<h3 className="text-xl font-semibold mb-3">Trabalhos</h3>
							<p className="text-muted-foreground font-semibold">
								Acompanhe todos os seus trabalhos e atividades pendentes em um
								só lugar.
							</p>
						</motion.div>
						<motion.div
							className="text-center p-6"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div
								className="inline-flex items-center justify-center size-16 border border-border bg-card-gradient rounded-2xl mb-4"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: 0.5, ease: "backOut" }}
								viewport={{ once: true }}
							>
								<PaperclipIcon className="size-8" />
							</motion.div>
							<h3 className="text-xl font-semibold mb-3">Materiais</h3>
							<p className="text-muted-foreground font-semibold">
								Acesse rapidamente todos os materiais de estudo das suas
								disciplinas.
							</p>
						</motion.div>
						<motion.div
							className="text-center p-6"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div
								className="inline-flex items-center justify-center size-16 border border-border bg-card-gradient rounded-2xl mb-4"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: 0.6, ease: "backOut" }}
								viewport={{ once: true }}
							>
								<InboxIcon className="size-8" />
							</motion.div>
							<h3 className="text-xl font-semibold mb-3">Mensagens</h3>
							<p className="text-muted-foreground font-semibold">
								Receba e visualize mensagens importantes da sua instituição de
								ensino.
							</p>
						</motion.div>
						<motion.div
							className="text-center p-6"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<motion.div
								className="inline-flex items-center justify-center size-16 border border-border bg-card-gradient rounded-2xl mb-4"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.4, delay: 0.7, ease: "backOut" }}
								viewport={{ once: true }}
							>
								<RulerPenIcon className="size-8" />
							</motion.div>
							<h3 className="text-xl font-semibold mb-3">Gestão de matérias</h3>
							<p className="text-muted-foreground font-semibold">
								Organize e acompanhe o progresso em todas as suas disciplinas
								acadêmicas.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<motion.section
				className="py-20 px-6 bg-card-gradient border border-border rounded-2xl"
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				viewport={{ once: true, margin: "-100px" }}
			>
				<div className="container mx-auto max-w-4xl text-center">
					<motion.h2
						className="text-3xl md:text-4xl font-bold mb-6"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						Pronto para simplificar sua vida acadêmica?
					</motion.h2>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						<SignIn size="lg" className="text-lg px-8">
							Começar agora
						</SignIn>
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
}
