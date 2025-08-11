// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { COOKIES } from "@/lib/constants";

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get(COOKIES.ACCESS_TOKEN);
	const refreshToken = request.cookies.get(COOKIES.REFRESH_TOKEN);

	if (!accessToken && refreshToken) {
		const res = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
			method: "POST",
			headers: { cookie: request.headers.get("cookie") || "" },
		});

		if (res.ok) {
			return NextResponse.next();
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/*"],
};
