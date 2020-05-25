import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


interface Menu {
    title: string,
    link: string,
    icon: string,
    enable?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class StaticDataService {

    paymentsList = [
        {
            bic: 'ETHNGRAA',
            title: 'SUPPORT.PAYMENT_CHOICES.A',
            name: 'NationalBankofGreece',
            value: '',
            description: '',
        },
        {
            bic: 'PIRBGRAA',
            title: 'SUPPORT.PAYMENT_CHOICES.B',
            name: 'PiraeusBank',
            value: '',
            description: '',
        },
        {
            bic: 'EFGBGRAA',
            title: 'SUPPORT.PAYMENT_CHOICES.C',
            name: 'EFGEurobankErgasias',
            value: '',
            description: '',
        },
        {
            bic: 'CRBAGRAA',
            title: 'SUPPORT.PAYMENT_CHOICES.D',
            name: 'AlphaBankAE',
            value: '',
            description: '',
        },
        {
            bic: 'PAYPAL',
            title: 'SUPPORT.PAYMENT_CHOICES.E',
            name: 'Paypal',
            value: '',
            description: '',
        }
    ];

    public get getPaymentsList() {
        return this.paymentsList;
    };
}