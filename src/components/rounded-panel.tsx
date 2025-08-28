"use client";

import { useIsMobile } from "@/hooks/use-mobile";

export function RoundedPanel({ children }: { children: React.ReactNode }) {
	const isMobile = useIsMobile();

	return (
		<div
			className={`bg-background border shadow-[inset_0_0px_5px_rgba(0,0,0,0.05)] p-6 w-full h-full ${isMobile ? "m-0 rounded-none" : "m-4 rounded-md"}`}
		>
			{children}
		</div>
	);
}
