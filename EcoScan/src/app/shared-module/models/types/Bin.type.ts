import { WasteType } from "../enums/WasteType.enum";

export type Bin = {
    binID: string;
    type: WasteType;
    lat: string;
    lng: string;
}