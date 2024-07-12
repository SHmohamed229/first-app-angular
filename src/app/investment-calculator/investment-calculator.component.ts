import { Component, EventEmitter, Output } from '@angular/core';
import { InvestmentDetails } from '../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-investment-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './investment-calculator.component.html',
  styleUrl: './investment-calculator.component.css'
})
export class InvestmentCalculatorComponent {

  @Output() investmentDetails = new EventEmitter<InvestmentDetails>();



  initialInvestment: number = 0;
  annualInvestment: number = 0;
  expectedReturn: number = 0; 
  duration: number = 0;

  onFormSubmit() {
    this.investmentDetails.emit({
      initialInvestment: this.initialInvestment,
      annualInvestment: this.annualInvestment,
      expectedReturn: this.expectedReturn,
      duration: this.duration
    });
  }


}
