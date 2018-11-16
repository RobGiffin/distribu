import { inject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";
import { CurrentState } from "../current-state";

@inject(DialogController)
export class ConfirmModal {
    constructor(dialogController) {
        this.dialogController = dialogController;
        this.agreedToTermsAndConditions = false;
    }

    activate(state) {
        this.state = state;

        this.setupStripeHandler();
    }

    setupStripeHandler() {
        this.handler = StripeCheckout.configure({
            key: 'pk_test_uP4xO5fMSTcUqez9MQ67b60X',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: (token) => {
                this.dialogController.ok();
            }
        });

        window.addEventListener('popstate', function() {
            if (this.handler) {
                this.handler.close();
            }
        });          
    }

    confirm() {
        console.log(this.state);

        this.handler.open({
            name: 'Distribu',
            description: `Subscription to support the ${this.state.campaign.name} campaign`,
            amount: 100,
            email: CurrentState.state.email,
            currency: "gbp",
            billingAddress: false,
            allowRememberMe: false,
            panelLabel: "Pay {{amount}} monthly"
        });      
    }
}