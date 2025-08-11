"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

const useHasMounted = () => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return hasMounted;
};

export function ToggleTheme() {
	const hasMounted = useHasMounted();
	const { resolvedTheme, setTheme } = useTheme();

	if (!hasMounted) {
		return (
			<Button className="group transition-colors delay-75 duration-200 size-9">
				<div className="transition-transform delay-150 duration-300">
					<Sun className="size-4" />
				</div>
			</Button>
		);
	}

	return (
		<Button
			className="group transition-colors delay-75 duration-200 size-9 max-[280px]:hidden"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			data-theme={resolvedTheme}
		>
			<div className="group-data-[theme=dark]:rotate-180 transition-transform delay-150 duration-300">
				{resolvedTheme === "dark" ? (
					<Sun className="size-4" />
				) : (
					<Moon className="size-4" />
				)}
			</div>
		</Button>
	);
}
