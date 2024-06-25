import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeRemaining',
})
export class TimeRemainingPipe implements PipeTransform {
  transform(endDate: string): string {
    const now = new Date();
    const end = new Date(endDate);

    const timeDiff = end.getTime() - now.getTime();

    if (timeDiff <= 0) {
      return 'Promotion terminée';
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    let remainingMonths = months % 12;
    let remainingDays = days % 30;

    let result = '';
    if (years > 0) {
      result += `${years} an${years > 1 ? 's' : ''} `;
    }
    if (remainingMonths > 0) {
      result += `${remainingMonths} mois `;
    }
    if (remainingDays > 0) {
      result += `${remainingDays} jour${remainingDays > 1 ? 's' : ''}`;
    }

    return result.trim();
  }
}
