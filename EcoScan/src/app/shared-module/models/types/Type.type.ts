import { Bin } from './Bin.type';

export type Type = {
  id: number;
  name: string;
  pictogram: string;
  points: number;
  description: string;
  bins?: Bin[];
};
