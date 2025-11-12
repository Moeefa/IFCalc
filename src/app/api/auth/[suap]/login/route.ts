import { AuthService } from "@/lib/auth-service";

export async function POST(
	request: Request,
	{ params }: { params: { suap: string } },
) {
	const searchParams = new URL(request.url).searchParams;
	const redirect = searchParams.get("redirect") || "/";

	const formData = await request.formData();
	const username = formData.get("matricula");
	const password = formData.get("senha");

	if (!username || !password)
		return AuthService.createUnauthenticatedResponse(
			"Missing credentials",
			400,
		);

	const result = await AuthService.login({
		username: username.toString(),
		password: password.toString(),
		provider: params.suap,
	});

	if (!result.success)
		return AuthService.createUnauthenticatedResponse(
			result.error || "Login failed",
			401,
		);

	return AuthService.createAuthenticatedRedirect(
		decodeURIComponent(redirect),
		request,
	);
}
