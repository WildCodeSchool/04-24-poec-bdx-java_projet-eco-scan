import { WasteType } from '../enums/WasteType.enum';
import { Type } from './Type.type';

export type Rubbish = {
  id: number;
  depot: boolean;
  type: Type;
};
