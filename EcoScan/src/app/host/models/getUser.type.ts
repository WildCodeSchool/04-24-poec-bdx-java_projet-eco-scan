import { StagedRubbish } from '../../shared-module/models/types/StagedRubbish.type';
import { UserPromos } from '../../shared-module/models/types/UserPromos.type';

export type GetUser = {
  id: string;
  staged: StagedRubbish;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  userPromos: UserPromos[];
};
