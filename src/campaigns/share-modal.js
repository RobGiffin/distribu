import { inject } from "aurelia-framework";
import { DialogController } from "aurelia-dialog";

@inject(DialogController)
export class ShareModal {
    constructor(dialogController) {
        this.dialogController = dialogController;
    }

    activate(campaign) {
        this.campaign = campaign;
    }
}