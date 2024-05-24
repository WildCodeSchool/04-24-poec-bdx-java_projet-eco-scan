import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Rubbish } from '../../../shared-module/models/types/Rubbish.type';
import { ScanService } from '../../../scan/services/scan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
})
export class PhotoComponent implements AfterViewInit {
  @ViewChild('video') public video!: ElementRef;
  @ViewChild('canvas') public canvas!: ElementRef;
  @ViewChild('bottomButtons') public bottomButtons!: ElementRef;

  public capturedImage: string | null = null;
  public binType: Observable<Rubbish | null> = this.scanService.getDurtyScan$();
  public captureButton = false;

  infos: String[] = [
    "Etre localisé proche d'une poubelle",
    'Prendre une photo claire',
    'Jeter votre déchet',
    'Prendre vos points',
  ];

  constructor(private scanService: ScanService) {}

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  takePhoto() {
    this.captureButton = true;
  }

  scrollToBottomButtons() {
    if (this.bottomButtons && this.bottomButtons.nativeElement) {
      this.bottomButtons.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  capture() {
    const video = this.video.nativeElement;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);
        this.capturedImage = canvas.toDataURL();
        video.pause();

        // Faire défiler vers le bas
        setTimeout(() => {
          this.scrollToBottomButtons();
        }, 100);
      } else {
        console.error('Unable to get 2D context for canvas.');
      }
    } else {
      console.error('Video element is null.');
    }
  }

  takePoints() {
    if (this.capturedImage) {
      this.scanService.insertImageIntoDatabase(this.capturedImage);
    }
  }

  retake() {
    this.capturedImage = null;
    this.video.nativeElement.play();
  }
}
