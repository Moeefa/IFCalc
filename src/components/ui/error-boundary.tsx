"use client";

import { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onReset?: () => void;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: any) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
		this.props.onReset?.();
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex flex-col items-center justify-center p-8 bg-card-gradient rounded-2xl border border-border">
					<AlertCircle className="size-12 text-destructive mb-4" />
					<h2 className="text-xl font-semibold mb-2">Algo deu errado</h2>
					<p className="text-muted-foreground text-center mb-4 max-w-md">
						Ocorreu um erro inesperado. Tente recarregar a página ou entre em contato com o suporte se o problema persistir.
					</p>
					<Button onClick={this.handleReset} className="flex items-center gap-2">
						<RefreshCw className="size-4" />
						Tentar novamente
					</Button>
				</div>
			);
		}

		return this.props.children;
	}
}

export function ErrorMessage({ 
	title = "Erro ao carregar dados", 
	message = "Não foi possível carregar os dados. Tente novamente mais tarde.",
	onRetry 
}: {
	title?: string;
	message?: string;
	onRetry?: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center p-8 bg-card-gradient rounded-2xl border border-border">
			<AlertCircle className="size-8 text-destructive mb-3" />
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<p className="text-muted-foreground text-center mb-4 text-sm">
				{message}
			</p>
			{onRetry && (
				<Button onClick={onRetry} variant="outline" size="sm" className="flex items-center gap-2">
					<RefreshCw className="size-4" />
					Tentar novamente
				</Button>
			)}
		</div>
	);
}

export function UnauthenticatedMessage({ message }: { message: string }) {
	return (
		<div className="text-sm text-center p-4 w-full h-64 flex items-center justify-center bg-card-gradient rounded-2xl border border-border font-semibold">
			{message}
		</div>
	);
}

