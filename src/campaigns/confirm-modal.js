import { inject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
export class ConfirmModal {
    constructor(dialogController) {
        this.dialogController = dialogController;
    }

    activate(campaign) {
        this.campaign = campaign;
    }
}