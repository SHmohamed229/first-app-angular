import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from './dummy-users';
import { InvestmentCalculatorComponent } from "./investment-calculator/investment-calculator.component";
import { AnnualData, InvestmentDetails } from './types';
import { ResultsComponent } from './results/results.component';
import calculateInvestmentResults from './investment-results';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, UserComponent, InvestmentCalculatorComponent, ResultsComponent] // import the CommonModule because we use ngFor in the template

})
export class AppComponent {
  title = 'first-app-angular';
  users=DUMMY_USERS
  name: string | null = null;
  calculatedResults: AnnualData[] = []


  ngOnInit(): void {
    const storedResults = localStorage.getItem('investmentResults');
    if (storedResults) {
      this.calculatedResults = JSON.parse(storedResults);
    }
  }

onInvestmentDetails(investment: InvestmentDetails) {
  this.calculatedResults = calculateInvestmentResults(
    investment.initialInvestment,
    investment.annualInvestment,
    investment.duration,
    investment.expectedReturn
  );
}

}
