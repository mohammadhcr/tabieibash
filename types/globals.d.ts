export {}

export type Roles = "admin" | "member"

declare global {
    interface CustomSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}