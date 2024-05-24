import { WasteType } from "../enums/WasteType.enum";

export type Bin = {
    id: string;
    type: WasteType;
    lat: string;
    lng: string;
}