import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signal-understand',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signal-understand.component.html',
  styleUrls: ['./signal-understand.component.css'],
})
export class SignalUnderstandComponent {
  // =========================
  // Signals – بيانات عامة
  // =========================
  nameSignal = signal('Mohamed');
  ageSignal = signal(15);
  currentAge = signal(0);

  // =========================
  // Signals – Ticket Simulator
  // =========================
  fromStation = signal('');
  toStation = signal('');
  ticketCount = signal(1);
  classType = signal('economy');
  stations = signal<string[]>([]);

  // Map لأسعار الرحلات الأساسية
  priceMap = new Map<string, number>([
    ['Cairo-Alex', 100],
    ['Cairo-Aswan', 300],
    ['Alex-Aswan', 350],
    ['Alex-Minya', 310],
    ['Minya-Alex', 310],
  ]);

  // =========================
  // Computed
  // =========================
  upperName = computed(() => this.nameSignal().toUpperCase());

  isAdult = computed(() => (this.ageSignal() >= 18 ? 'بالغ' : 'قاصر'));

  isAdultComputed = computed(() => (this.currentAge() <= 18 ? 'قاصر' : 'بالغ'));

  // Computed للتذاكر
  isValidRoute = computed(
    () =>
      this.fromStation() !== '' &&
      this.toStation() !== '' &&
      this.fromStation() !== this.toStation(),
  );

  basePrice = computed(() => {
    if (!this.isValidRoute()) return 0;
    const key = `${this.fromStation()}-${this.toStation()}`;
    return this.priceMap.get(key) ?? 0;
  });

  totalPrice = computed(() => {
    if (!this.isValidRoute()) return 0;
    let multiplier = 1;
    switch (this.classType()) {
      case 'business':
        multiplier = 1.5;
        break;
      case 'first':
        multiplier = 2;
        break;
    }
    return this.basePrice() * this.ticketCount() * multiplier;
  });

  // =========================
  // Getter/Setter لـ ngModel
  // =========================
  get fromStationValue() {
    return this.fromStation();
  }
  set fromStationValue(value: string) {
    this.fromStation.set(value);
  }

  get toStationValue() {
    return this.toStation();
  }
  set toStationValue(value: string) {
    this.toStation.set(value);
  }

  // =========================
  // Constructor
  // =========================
  constructor(private http: HttpClient) {
    this.fetchStations();

    // Effect لتحديث document title حسب العمر
    effect(() => {
      document.title =
        this.currentAge() >= 18 ? '👑 مستخدم بالغ' : '🧒 مستخدم قاصر';
    });

    // Effect لمراقبة تغييرات Ticket Simulator
    effect(() => {
      console.log('----- تحديث حالة الرحلة -----');
      console.log('From:', this.fromStation());
      console.log('To:', this.toStation());
      console.log('Ticket Count:', this.ticketCount());
      console.log('Class Type:', this.classType());
      console.log('Valid Route:', this.isValidRoute() ? '✅ Yes' : '❌ No');
      console.log('Base Price:', this.basePrice());
      console.log('Total Price:', this.totalPrice());
    });
  }

  // =========================
  // Methods
  // =========================
  ngOnInit(): void {}

  increaseAge() {
    this.ageSignal.set(this.ageSignal() + 1);
  }

  increaseCurrentAge() {
    this.currentAge.set(this.currentAge() + 1);
  }

  printName() {
    console.log(this.nameSignal());
  }

  changeName() {
    this.nameSignal.set('Omar');
    console.log(this.nameSignal());
  }

  // جلب المحطات من API
  fetchStations() {
    this.http
      .get<string[]>('http://localhost:3000/api/stations')
      .subscribe((data) => this.stations.set(data));
  }

  // Book Tickets → اتصال بالباك
  bookTickets() {
    if (!this.isValidRoute()) return;

    const payload = {
      from: this.fromStation(),
      to: this.toStation(),
      ticketCount: this.ticketCount(),
      classType: this.classType(),
      totalPrice: this.totalPrice(),
    };

    this.http
      .post('http://localhost:3000/api/book', payload)
      .subscribe((res: any) => {
        alert(res.message);
        document.title = `🛒 تم الحجز: ${this.totalPrice()} EGP`;
      });
  }
}
