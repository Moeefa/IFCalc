import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
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
  }

  interface Account {}

  export interface Session {
    user?: User;
    expires: ISODateString;
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    access_token?: string;
    uid?: User;
  }
}
