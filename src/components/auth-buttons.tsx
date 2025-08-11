"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SignIn({
	provider,
	children,
	...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
	const pathname = usePathname();
	const redirectPath = pathname ?? "/";

	return (
		<Link href={`/login?redirect=${encodeURIComponent(redirectPath)}`}>
			<Button type="submit" {...props}>
				{children}
			</Button>
		</Link>
	);
}

export function SignOut({
	children,
	...props
}: React.ComponentPropsWithRef<typeof Button>) {
	return (
		<form action="/api/auth/logout" method="POST">
			<Button type="submit" {...props}>
				{children}
			</Button>
		</form>
	);
}
