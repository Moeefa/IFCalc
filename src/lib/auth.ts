import { AuthService } from "./auth-service";

export function isAuthenticated(): boolean {
	return AuthService.isAuthenticated();
}

export { AuthService };
