"use client";

import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Button } from "./ui/button";

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
	const [isAnimating, setIsAnimating] = useState(false);

	const handleClick = () => {
		if (isAnimating) return;

		setIsAnimating(true);
		setTheme(resolvedTheme === "dark" ? "light" : "dark");

		setTimeout(() => {
			setIsAnimating(false);
		}, 700);
	};

	if (!hasMounted) {
		return null;
	}

	return (
		<MotionConfig transition={{ type: "spring", duration: 0.7, bounce: 0 }}>
			<Button onClick={handleClick} className="flex items-center">
				{/* Theme Icon */}
				<motion.div layout>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 18 18"
						fill="none"
						className="size-5 mr-2"
						initial={false}
						animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
					>
						<motion.g fill="currentColor" className="nc-icon-wrapper">
							<motion.path
								d="M9 12V6a3 3 0 1 0 0 6M9 6a3 3 0 1 1 0 6v4.25a7.25 7.25 0 0 0 0-14.5z"
								data-color="color-2"
							></motion.path>
							<motion.path d="M9 1c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8m0 14.5c3.584 0 6.5-2.916 6.5-6.5S12.584 2.5 9 2.5 2.5 5.416 2.5 9s2.916 6.5 6.5 6.5"></motion.path>
						</motion.g>
					</motion.svg>
				</motion.div>

				{/* Mode Text */}
				<div className="flex flex-row">
					<AnimatePresence initial={false} mode="popLayout">
						<motion.span
							key={resolvedTheme === "dark" ? "dark" : "light"}
							initial={{ opacity: 0, y: -48 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 48 }}
						>
							{resolvedTheme === "dark" ? "Escuro" : "Claro"}
						</motion.span>
					</AnimatePresence>
				</div>
			</Button>
		</MotionConfig>
	);
}
