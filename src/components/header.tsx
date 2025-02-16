import { LogIn, LogOut } from "lucide-react";
import { SignIn, SignOut } from "./auth-buttons";

import { Settings } from "@/components/settings";
import { auth } from "@/auth";

export const Header = async () => {
	const session = await auth();

	return (
		<div className="fixed flex items-center w-full p-2 px-8 z-50 bg-background border-b border-border">
			<div className="justify-start">
				{session?.user && (
					<div className="hidden sm:flex justify-center items-center gap-4 text-sm">
						<p>Bem-vindo, {session.user.name}</p>
					</div>
				)}
			</div>
			<div className="flex flex-1 justify-end">
				<div className="flex justify-between w-full flex-1 sm:flex-none sm:w-fit items-center gap-3">
					<Settings />
					{session?.user ? (
						<SignOut variant="destructive">
							Encerrar sessão <LogOut className="w-4 h-4 ml-2" />
						</SignOut>
					) : (
						<SignIn variant="accent">
							Entrar com o SUAP <LogIn className="w-4 h-4 ml-2" />
						</SignIn>
					)}
				</div>
			</div>
		</div>
	);
};
