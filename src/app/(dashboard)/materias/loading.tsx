import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
	return (
		<div className="flex flex-wrap gap-4">
			{[...Array(8)].map((_, index) => (
				<Skeleton
					key={index}
					className="rounded-2xl p-5 lg:w-64 w-full h-auto min-h-56"
				/>
			))}
		</div>
	);
}
