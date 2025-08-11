"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.error("Error Boundary caught an error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex flex-col items-center justify-center p-8 space-y-4 bg-card-gradient rounded-2xl border border-border">
					<AlertTriangle className="size-12 text-destructive" />
					<div className="text-center space-y-2">
						<h2 className="text-xl font-semibold">Algo deu errado</h2>
						<p className="text-muted-foreground">
							{this.state.error?.message ||
								"Ocorreu um erro inesperado. Tente recarregar a página."}
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							onClick={() => window.location.reload()}
							className="flex items-center gap-2"
						>
							<RefreshCw className="size-4" />
							Recarregar página
						</Button>
						<Button onClick={() => this.setState({ hasError: false })}>
							Tentar novamente
						</Button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export function useErrorHandler() {
	return (error: Error) => {
		console.error("Error caught by useErrorHandler:", error);
	};
}
