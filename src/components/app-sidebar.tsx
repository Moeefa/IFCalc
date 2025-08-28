import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getPeriods, getUserData } from "@/lib/suap";
import { cookies } from "next/headers";
import { PeriodSelector } from "./period-selector";
import { isAuthenticated } from "@/lib/auth";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { COOKIES } from "@/lib/constants";

import { HouseIcon } from "@/components/icons/house";
import { RulerPenIcon } from "./icons/ruler-pen";
import { InboxIcon } from "./icons/inbox";
import { PaperclipIcon } from "./icons/paperclip";
import { CalendarDaysIcon } from "./icons/calendar-days";
import { TasksIcon } from "./icons/tasks";
import { CalculatorIcon } from "./icons/calculator";

const items = [
	{
		title: "Início",
		url: "/",
		icon: <HouseIcon />,
	},
	{
		title: "Calculadora",
		url: "/calculadora",
		icon: <CalculatorIcon />,
	},
	{
		title: "Matérias",
		url: "/materias",
		icon: <RulerPenIcon />,
	},
	{
		title: "Trabalhos",
		url: "/trabalhos",
		icon: <TasksIcon />,
	},
	{
		title: "Mensagens",
		url: "/mensagens",
		icon: <InboxIcon />,
	},
	{
		title: "Materiais",
		url: "/materiais",
		icon: <PaperclipIcon />,
	},
	{
		title: "Horários",
		url: "/horarios",
		icon: <CalendarDaysIcon />,
	},
];

async function UserData() {
	const user = await getUserData();
	const authenticated = isAuthenticated();

	return (
		<h1 className="font-semibold">
			Bem-vindo
			{authenticated &&
				user?.nome_usual &&
				`, ${user.nome_usual.split(" ")[0]}`}
			!
		</h1>
	);
}

async function SelectedPeriod() {
	const periods = await getPeriods();
	const authenticated = isAuthenticated();

	const cookieStore = cookies();
	const selectedPeriod =
		periods
			.find(
				(period) =>
					period.id.toString() === cookieStore.get(COOKIES.PERIOD)?.value,
			)
			?.id.toString() || periods[0]?.id.toString();

	return (
		<>
			{authenticated && (
				<SidebarFooter className="gap-0">
					<PeriodSelector periods={periods} initialValue={selectedPeriod} />
				</SidebarFooter>
			)}
		</>
	);
}

export async function AppSidebar() {
	return (
		<Sidebar className="border-none">
			<SidebarContent>
				<SidebarGroup className="flex-1">
					<SidebarGroupLabel className="flex items-center gap-2 mb-2">
						<Image
							width={20}
							height={20}
							src="/icon.svg"
							alt="IFCalc Logo"
							className="size-5"
						/>
						<Suspense fallback={<h1 className="font-semibold">Bem-vindo!</h1>}>
							<UserData />
						</Suspense>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											className="flex items-center text-foreground"
											href={item.url}
										>
											{item.icon}
											<span className="font-semibold">{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<Suspense fallback={<></>}>
					<SelectedPeriod />
				</Suspense>
			</SidebarContent>
		</Sidebar>
	);
}
