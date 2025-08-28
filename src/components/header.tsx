import { SignIn, SignOut } from "./auth-buttons";
import { ToggleTheme } from "@/components/toggle-theme";
import { isAuthenticated } from "@/lib/auth";
import { SidebarTrigger } from "./ui/sidebar";
import { ArrowInIcon } from "./icons/arrow-in";
import { ArrowOutIcon } from "./icons/arrow-out";

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
							Sair <ArrowOutIcon className="size-5 ml-2" />
						</SignOut>
					) : (
						<SignIn>
							Entrar com SUAP <ArrowInIcon className="size-5 ml-2" />
						</SignIn>
					)}
				</nav>
			</div>
		</header>
	);
};
