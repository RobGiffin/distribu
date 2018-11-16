import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)
export class Campaign {
    constructor(router) {
        this.router = router;
    }

    activate(args) {

    }

    findACampaign() {
        this.router.navigate("campaigns");
    }
}