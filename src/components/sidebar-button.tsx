"use client";

import Link from "next/link";
import {
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";

export function SidebarButton({
	item,
}: {
	item: { title: string; icon: React.ReactNode; url: string };
}) {
	const isMobile = useIsMobile();
	const { toggleSidebar } = useSidebar();
	const pathname = usePathname();

	return (
		<SidebarMenuItem
			key={item.title}
			onClick={() => {
				if (isMobile) toggleSidebar();
			}}
		>
			<SidebarMenuButton
				isActive={pathname == item.url}
				className="data-[active=false]/menu-button:text-muted-foreground"
				asChild
			>
				<Link className="flex items-center text-foreground" href={item.url}>
					{item.icon}
					<span className="font-semibold">{item.title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
