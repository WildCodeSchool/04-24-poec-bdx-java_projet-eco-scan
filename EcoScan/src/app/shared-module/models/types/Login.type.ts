export type Login = {
    userID: string;
    salt: string;
    hashedPassword: string;
}