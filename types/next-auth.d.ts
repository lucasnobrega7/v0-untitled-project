import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Extending the built-in session types
   */
  interface Session {
    user: {
      /** The user's id. */
      id: string
      /** The user's roles. */
      roles: string[]
    } & DefaultSession["user"]
  }

  /**
   * Extending the built-in user types
   */
  interface User {
    /** The user's roles. */
    roles?: string[]
  }
}

declare module "next-auth/jwt" {
  /** Extending the built-in JWT types */
  interface JWT {
    /** The user's id. */
    id: string
    /** The user's roles. */
    roles: string[]
  }
}
