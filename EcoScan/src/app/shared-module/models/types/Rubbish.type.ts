import { WasteType } from '../enums/WasteType.enum';

export type Rubbish = {
  rubbishID: string;
  type: WasteType;
  points: number;
};
