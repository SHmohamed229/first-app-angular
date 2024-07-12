import { Component, Input } from '@angular/core';
import { AnnualData } from '../types';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  @Input({required: true}) displayData: AnnualData[] = [];


}
