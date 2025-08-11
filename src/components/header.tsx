import { LogIn, LogOut } from "lucide-react";
import { SignIn, SignOut } from "./auth-buttons";

import { ToggleTheme } from "@/components/toggle-theme";
import { SidebarTrigger } from "./ui/sidebar";
import { isAuthenticated } from "@/lib/auth";

export const Header = async () => {
	const authenticated = isAuthenticated();

	return (
		<header className="z-50">
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<SidebarTrigger />
				</div>
				<nav className="flex space-x-2">
					<ToggleTheme />
					{authenticated ? (
						<SignOut>
							Sair <LogOut className="w-4 h-4 ml-2" />
						</SignOut>
					) : (
						<SignIn>
							Entrar com SUAP <LogIn className="w-4 h-4 ml-2" />
						</SignIn>
					)}
				</nav>
			</div>
		</header>
	);
};
