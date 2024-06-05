import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnChanges, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() text: string = '';
  @Input() date: Date | null = null;
  @ViewChild('titleElement', { static: true }) titleElement!: ElementRef;
  remainingTime: string = '';
  private intervalId: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date']) {
      this.updateRemainingTime();
    }
    if (changes['text']) {
      this.fitText();
    }
  }

  ngAfterViewInit() {
    this.fitText();
    window.addEventListener('resize', this.fitText.bind(this));
    this.startTimer();
  }

  ngAfterViewChecked() {
    this.fitText();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    window.removeEventListener('resize', this.fitText.bind(this));
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
  }

  updateRemainingTime() {
    if (!this.date) return;

    const now = new Date();
    const end = new Date(this.date);

    const days = differenceInDays(end, now);
    const hours = differenceInHours(end, now) % 24;
    const minutes = differenceInMinutes(end, now) % 60;
    const seconds = differenceInSeconds(end, now) % 60;
    this.remainingTime = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }

  fitText() {
    const element = this.titleElement.nativeElement;
    const parentWidth = element.parentElement.offsetWidth;
    let fontSize = 200; 
    element.style.fontSize = `${fontSize}px`;

    while (element.scrollWidth > parentWidth && fontSize > 0) {
      fontSize--;
      element.style.fontSize = `${fontSize}px`;
    }
  }
}
