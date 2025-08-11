import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
	count?: number;
	className?: string;
	children?: React.ReactNode;
}

export function LoadingState({ count = 1, className = "" }: LoadingStateProps) {
	return (
		<div className={cn("space-y-4", className)}>
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			))}
		</div>
	);
}
