export type User = {
    id: string,
    name: string,
    surname: string,
    email: string,
    role: UserRole

}

export enum UserRole {
    Admin = "admin",
    User = "user"
}