import { Rubbish } from './Rubbish.type';

export type StagedRubbish = {
  id: number;
  userID: string;
  rubbishID: Rubbish[];
};
