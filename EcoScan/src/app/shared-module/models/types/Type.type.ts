import { Bin } from './Bin.type';

export type Type = {
    id: number | null;
    name: string;
    pictogram: string;
    pathOfImage: string;
    description: string;
    points: number;
    bins: Bin[];
}
