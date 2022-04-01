import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {loadStripe, Stripe} from "@stripe/stripe-js";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PaymentsService} from "../../../shared/services/payments/payments.service";
import {IPayments} from "../../../shared/interfaces/payments.interface";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-stripe-dialog',
  templateUrl: 'stripe-dialog.component.html',
  styleUrls: ['stripe-dialog.component.scss']
})


export class StripeDialogComponent implements OnInit {

  @ViewChild('cartName') cardNumber!: any
  private stripe!: Stripe | null | any
  private cart!: any
  email = new FormControl('');

  constructor(
     public dialogRef: MatDialogRef<StripeDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private paymentsServices: PaymentsService
  ) {
  }

  ngOnInit(): void {
    this.initScript()
  }

    initScript(): void {
    this.stripe =  loadStripe(environment.stripe).then(res => {
      this.stripe = res;
      const elements = res?.elements({
        locale: 'en'
      })
      this.cart = elements?.create('cardNumber', {
        iconStyle: 'solid',
        showIcon: true
      });
      this.cart?.mount('#card-number-element');

      const cardExpiryElement = elements?.create('cardExpiry');
      cardExpiryElement?.mount('#card-expiry-element');

      const cardCvcElement = elements?.create('cardCvc');
      cardCvcElement?.mount('#card-cvc-element');
    });

  }

  buy(): void {
    this.stripe?.createToken(this.cart,{email: this.email.value }).then((res: any) => {
      if(res.token) {
        const pay = JSON.parse(this.data.obj)
        const payments: IPayments = {amount: this.data.totalPrice * 100, currency: "EUR" , productOrderId: pay.id, stripeEmail: res.token.email , stripeToken: res.token.id }
        this.paymentsServices.addPayments(payments).subscribe(res => {
          this.dialogRef.close()
        })
      }
    })
  }
}
