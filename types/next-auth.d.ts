import { JWT } from "@auth/core/jwt";

declare module "next-auth" {
  export interface DefaultSession {
    user?: User;
    expires: ISODateString;
    access_token?: string;
  }

  export interface JWT {
    sub?: string;
    access_token?: string;
    uid?: {
      id?: string;
      identificacao?: string;
      nome_social?: string;
      nome_usual?: string;
      nome_registro?: string;
      nome?: string;
      email?: string;
      email_secundario?: string;
      email_google_classroom?: string;
      email_academico?: string;
      campus?: string;
      foto?: string;
      tipo_usuario?: string;
    };
  }
}
