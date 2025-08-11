import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"text-muted-foreground [box-shadow:0_0_1px_0px_hsl(var(--border)/_0.05),inset_0_1px_2px_0_rgb(255_255_255_/_0.2)] dark:[box-shadow:0_0_4px_1px_rgb(0_0_0_/_0.05),inset_0_0_4px_1px_rgb(255_255_255_/_0.02)] hover:bg-muted hover:text-foreground transition-colors delay-75 duration-200 shadow-sm flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
