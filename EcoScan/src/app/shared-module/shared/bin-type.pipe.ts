import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'binType',
})
export class BinTypePipe implements PipeTransform {
  transform(type: string): string {
    const imageMap: { [key: string]: string } = {
      Verre: 'un-verre.png',
      Batterie: 'batterie.svg',
      "Cartouche d'encre": 'encre.svg',
      Parfum: 'parfum.svg',
      Cosmetique: 'cosmetic.svg',
    };

    return imageMap[type];
  }
}
