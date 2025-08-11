import { NextResponse } from "next/server";
import { AuthService } from "@/lib/auth-service";

export async function POST(request: Request) {
	const result = await AuthService.refreshToken();

	if (!result.success) {
		return NextResponse.json(
			{ error: result.error || "Token refresh failed" },
			{ status: 401 },
		);
	}

	return NextResponse.json({ success: true });
}
