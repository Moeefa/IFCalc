import {
	Backpack,
	Inbox,
	Sigma,
	Paperclip,
	PencilRuler,
	Home,
	CalendarDays,
} from "lucide-react";
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

const items = [
	{
		title: "Início",
		url: "/",
		icon: Home,
	},
	{
		title: "Calculadora",
		url: "/calculadora",
		icon: Sigma,
	},
	{
		title: "Matérias",
		url: "/materias",
		icon: PencilRuler,
	},
	{
		title: "Trabalhos",
		url: "/trabalhos",
		icon: Backpack,
	},
	{
		title: "Mensagens",
		url: "/mensagens",
		icon: Inbox,
	},
	{
		title: "Materiais",
		url: "/materiais",
		icon: Paperclip,
	},
	{
		title: "Horários",
		url: "/horarios",
		icon: CalendarDays,
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
		<Sidebar>
			<SidebarContent>
				<SidebarGroup className="flex-1">
					<SidebarGroupLabel className="flex items-center gap-2">
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
											<item.icon />
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
