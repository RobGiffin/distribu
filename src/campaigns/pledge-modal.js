import { inject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
export class PledgeModal {
    constructor(dialogController) {
        this.dialogController = dialogController;
    }

    activate(campaign) {
        this.campaign = campaign;
    }

    // yes() {
    //     this.dialogController.ok();
    // }
}