import "next-auth";

// Declare your framework library
declare module "next-auth" {
  interface Profile {
    identificacao: string;
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
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
  /**
   * The shape of the account object returned in the OAuth providers' `account` callback,
   * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
   */
  interface Account {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user?: User;
    expires: ISODateString;
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
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
