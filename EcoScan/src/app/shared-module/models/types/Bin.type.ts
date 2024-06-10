import { WasteType } from '../enums/WasteType.enum';
import { Type } from './Type.type';

export type Bin = {
  id: string;
  localisation: string;
  binName: string;
  type: Type;
};
