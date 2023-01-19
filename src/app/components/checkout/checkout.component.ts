import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { AntsRouteFormServiceService } from 'src/app/services/ants-route-form-service.service';
import { AntsRouteValidators } from 'src/app/validators/ants-route-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  // country list is the same for shippingAddress and billingAddress
  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private antsRouteFormService: AntsRouteFormServiceService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),

        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populate credit card months
    const currentMonth: number = new Date().getMonth();
    console.log('startMonth: ' + (currentMonth + 1));

    this.antsRouteFormService
      .getCreditCardMonths(currentMonth + 1)
      .subscribe((data) => {
        console.log(
          'ngOnInit() Retrieved credit card months: ' + JSON.stringify(data)
        );
        this.creditCardMonths = data;
      });

    // populate credit card years
    this.antsRouteFormService.getCreditCardYears().subscribe((data) => {
      console.log(
        'ngOnInit() Retrieved credit card years: ' + JSON.stringify(data)
      );
      this.creditCardYears = data;
    });

    // populate countries
    this.antsRouteFormService.getCountries().subscribe((data) => {
      console.log('ngOnInit() Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(
        this.checkoutFormGroup.controls.shippingAddress.value
      );

      // bug fix for states copy
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      // bug fix for states copy
      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log('Handling the submit button');

    // Touching all fields triggers the display of the error messages
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup!.get('customer')?.value);
    console.log(
      'The email address is ' +
        this.checkoutFormGroup!.get('customer')?.value.email
    );
  }

  // when user change the selected year, retrieve the month list again
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup!.value.expirationYear
    );

    // if the current year equals the selected year, then start with the current month
    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.antsRouteFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data) => {
        console.log('Retrieved credit card months: ' + JSON.stringify(data));
        this.creditCardMonths = data;
      });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.antsRouteFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // select first item by default
      formGroup!.get('state')!.setValue(data[0]);
    });
  }
}
