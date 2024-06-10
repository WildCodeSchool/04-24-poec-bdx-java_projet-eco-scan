import { UserPromos } from "../../shared-module/models/types/UserPromos.type";

export type GetUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  userPromos: UserPromos[];
};
