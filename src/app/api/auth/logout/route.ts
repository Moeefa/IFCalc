import { NextResponse } from "next/server";
import { AuthService } from "@/lib/auth-service";

export async function POST(request: Request) {
	AuthService.logout();
	return NextResponse.redirect(new URL("/", request.url));
}
