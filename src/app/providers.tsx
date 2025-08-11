"use client";

import { SettingsProvider } from "@/contexts/settings";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SettingsProvider>
			<SidebarProvider>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</SidebarProvider>
		</SettingsProvider>
	);
}
