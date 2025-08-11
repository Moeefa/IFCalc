import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "@/components/common/error-boundary";
import { isAuthenticated } from "@/lib/auth";
import { Lock } from "lucide-react";

interface DataWrapperProps {
	children: ReactNode;
	loading: ReactNode;
	unauthenticatedMessage?: string;
	requireAuth?: boolean;
	fallback?: ReactNode;
}

function UnauthenticatedMessage({ message }: { message: string }) {
	return (
		<div className="flex flex-col items-center justify-center p-8 space-y-4 bg-card-gradient rounded-2xl border border-border">
			<Lock className="size-12 text-muted-foreground" />
			<div className="text-center space-y-2">
				<p className="text-foreground max-w-md font-semibold">{message}</p>
			</div>
		</div>
	);
}

export function DataWrapper({
	children,
	loading,
	unauthenticatedMessage = "Faça o login com a conta do seu SUAP para acessar esta funcionalidade!",
	requireAuth = false,
	fallback,
}: DataWrapperProps) {
	const authenticated = isAuthenticated();

	if (requireAuth && !authenticated) {
		return <UnauthenticatedMessage message={unauthenticatedMessage} />;
	}

	return (
		<ErrorBoundary fallback={fallback}>
			<Suspense fallback={loading}>{children}</Suspense>
		</ErrorBoundary>
	);
}
