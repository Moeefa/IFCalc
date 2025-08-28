"use client";

import Link from "next/link";
import {
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function SidebarButton({
	item,
}: {
	item: { title: string; icon: React.ReactNode; url: string };
}) {
	const isMobile = useIsMobile();
	const { toggleSidebar } = useSidebar();

	return (
		<SidebarMenuItem
			onClick={() => {
				if (isMobile) toggleSidebar();
			}}
			className="hidden sm:block"
			key={item.title}
		>
			<SidebarMenuButton asChild>
				<Link className="flex items-center text-foreground" href={item.url}>
					{item.icon}
					<span className="font-semibold">{item.title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
