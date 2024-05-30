import { Component } from '@angular/core';
import { SecondRubbish } from '../../../shared-module/models/types/SecondRubbish.type';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrl: './glossary.component.scss',
})
export class GlossaryComponent {
  glossary!: SecondRubbish[];
  newCard!: SecondRubbish;

  ngOnInit() {
    this.glossary = [
      {
        rubbishID: '123',
        type: 'Verre',
        points: 20,
      },
      {
        rubbishID: '234',
        type: 'Batterie',
        points: 50,
      },
      {
        rubbishID: '345',
        type: "Cartouche d'encre",
        points: 100,
      },
      {
        rubbishID: '345',
        type: 'Cosmetique',
        points: 150,
      },
      {
        rubbishID: '456',
        type: 'Parfum',
        points: 250,
      },
      {
        rubbishID: '234',
        type: 'Batterie',
        points: 50,
      },
      {
        rubbishID: '345',
        type: "Cartouche d'encre",
        points: 100,
      },
      {
        rubbishID: '345',
        type: 'Cosmetique',
        points: 150,
      },
      {
        rubbishID: '456',
        type: 'Parfum',
        points: 250,
      },
    ];
    this.newCard = {
      rubbishID: '154',
      type: 'Telephone',
      points: 1000,
    };
  }
}
