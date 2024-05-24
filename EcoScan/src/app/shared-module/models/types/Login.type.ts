export type Login = {
  userID: string;
  salt: string;
  email: string;
  hashedPassword: string;
};
