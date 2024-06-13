import { StagedRubbish } from './StagedRubbish.type';
import { UserPromos } from './UserPromos.type';

export type GetUser = {
  id: string;
  staged: StagedRubbish;
  firstname: string;
  username: string;
  lastname: string;
  email: string;
  points: number;
  userPromos: UserPromos[];
};
