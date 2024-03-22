import { Coffee, LogIn, LogOut } from "lucide-react";
import { SignIn, SignOut } from "./auth-buttons";

import { Button } from "./ui/button";
import Link from "next/link";
import { ToggleTheme } from "./toggle-theme";
import { auth } from "@/auth";

export const Header = async () => {
  const session = await auth();

  return (
    <>
      <div className="fixed w-full z-10 filter bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-2">
        <div className="flex relative w-full sm:justify-between justify-end container">
          {session?.user && (
            <div className="hidden sm:flex justify-center items-center gap-4 text-sm">
              <p>Bem-vindo, {session.user.name}</p>
            </div>
          )}

          <Button
            asChild
            size="icon"
            className="flex sm:flex-none mr-2 h-9 sm:p-4 sm:w-fit items-center gap-2"
          >
            <Link target="_blank" href="https://livepix.gg/moeefa">
              <Coffee className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Doar</span>
            </Link>
          </Button>

          <div className="flex justify-between w-full flex-1 sm:flex-none sm:w-fit items-center gap-4">
            <ToggleTheme />
            {session?.user ? (
              <SignOut>
                Encerrar sessão <LogOut className="w-4 h-4 ml-2" />
              </SignOut>
            ) : (
              <SignIn>
                Entrar com o SUAP <LogIn className="w-4 h-4 ml-2" />
              </SignIn>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
