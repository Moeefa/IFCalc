"use client";

import {
	AnimatePresence,
	type MotionStyle,
	type SpringOptions,
	motion,
	useSpring,
} from "framer-motion";
import type React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

export interface RevealItem {
	content: React.ReactNode;
	rotate?: number;
	translateX?: string;
	translateY?: string;
	delay?: number;
	className?: string;
	transformOrigin?: string;
}

export type TriggerProps = {
	onMouseEnter: (e: React.MouseEvent) => void;
	onMouseLeave: () => void;
	onMouseMove: (e: React.MouseEvent) => void;
};

export function RevealElements({
	items,
	children,
	offsetX = 10,
	offsetY = 25,
	cursorFollowOptions = {
		stiffness: 300, // Higher stiffness for more immediate following
		damping: 30, // Higher damping to reduce oscillation
		mass: 0.8, // Lower mass for quicker response
		duration: 0.3, // Shorter duration for smoother tracking
	},
	baseDelay = 0.1, // Base delay between each item
}: {
	items: RevealItem[];
	children: (triggerProps: TriggerProps) => React.ReactNode;
	offsetX?: number;
	offsetY?: number;
	cursorFollowOptions?: SpringOptions;
	baseDelay?: number;
}) {
	const x = useSpring(0, cursorFollowOptions);
	const y = useSpring(0, cursorFollowOptions);
	const [isInside, setIsInside] = useState<boolean>(false);

	const handleMouseMove = (e: React.MouseEvent) => {
		x.set(e.clientX + offsetX);
		y.set(e.clientY + offsetY);
	};

	const handleMouseLeave = () => setIsInside(false);

	const handleMouseEnter = (e: React.MouseEvent) => {
		// Immediately jump to position without animation
		x.jump(e.clientX + offsetX);
		y.jump(e.clientY + offsetY);
		setIsInside(true);
	};

	const triggerProps: TriggerProps = {
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		onMouseMove: handleMouseMove,
	};

	// Bouncy animation only for popup/popout, not for cursor following
	const itemVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: (delay: number) => ({
			scale: 1,
			opacity: 1,
			transition: {
				delay: delay,
				scale: {
					type: "spring" as const,
					stiffness: 280, // Bouncy spring for popup
					damping: 32, // Low damping for more bounce
					mass: 1.2, // Slightly higher mass for more bounce
					velocity: 12, // Initial velocity for pop effect
				},
				opacity: {
					duration: 0.3,
					ease: "easeOut" as const,
				},
			},
		}),
		exit: {
			scale: 0,
			opacity: 0,
			transition: {
				scale: {
					type: "spring" as const,
					stiffness: 300,
					damping: 25,
				},
				opacity: {
					duration: 0.2,
					ease: "easeIn" as const,
				},
			},
		},
	};

	const renderRevealItem = (item: RevealItem, index: number) => {
		const itemStyle: MotionStyle = {
			position: "fixed",
			top: y, // Read current position
			left: x,
			// overflow: "hidden",
			pointerEvents: "none",
			rotate: item.rotate || 0,
			translateX: item.translateX || "0%",
			translateY: item.translateY || "0%",
			transformOrigin: item.transformOrigin || "center",
		};

		const calculatedDelay =
			item.delay !== undefined ? item.delay : index * baseDelay;

		return (
			<motion.div
				key={index}
				style={itemStyle}
				className={`z-50 select-none ${item.className || ""}`}
				custom={calculatedDelay}
				variants={itemVariants}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				{item.content}
			</motion.div>
		);
	};

	return (
		<>
			{children(triggerProps)}
			{typeof window !== "undefined" &&
				document.body &&
				createPortal(
					<AnimatePresence>
						{isInside &&
							items.map((item, index) => renderRevealItem(item, index))}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
}
