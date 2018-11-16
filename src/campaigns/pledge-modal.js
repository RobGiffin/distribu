import { inject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
export class PledgeModal {
    constructor(dialogController) {
        this.dialogController = dialogController;
        this.paymentSchedule = "yearly";
    }

    activate(campaign) {
        this.campaign = campaign;
    }

    switchPaymentSchedule(paymentSchedule) {
        this.paymentSchedule = paymentSchedule;
    }

    continue() {
        this.dialogController.ok({
            paymentSchedule: this.paymentSchedule
        });
    }
}