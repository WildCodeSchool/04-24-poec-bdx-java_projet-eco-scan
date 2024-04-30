import { BinType } from "../enums/BinType.enum";

export type Bin = {
    binID: string;
    type: BinType;
    location: string;
}