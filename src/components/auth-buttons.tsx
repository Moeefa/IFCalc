import { signIn, signOut } from "@/auth";

import { Button } from "./ui/button";

export function SignIn({
  provider,
  children,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button variant="outline" {...props}>
        {children}
      </Button>
    </form>
  );
}

export function SignOut({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant="outline" {...props}>
        {children}
      </Button>
    </form>
  );
}
