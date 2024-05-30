import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'binType',
})
export class BinTypePipe implements PipeTransform {
  transform(type: string): string {
    const imageMap: { [key: string]: string } = {

      Verre: 'png/un-verre.png',
      Batterie: 'svg/batterie.svg',
      "Cartouche d'encre": 'svg/encre.svg',
      Parfum: 'svg/parfum.svg',
      Cosmetique: 'svg/cosmetic.svg',
      Telephone: 'png/iphone.png',

    };

    return imageMap[type];
  }
}
