import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DialogService } from "aurelia-dialog";
import { PLATFORM } from "aurelia-pal";
import { HttpClient } from "aurelia-http-client";
import { Redirect } from "aurelia-router";

@inject(EventAggregator, DialogService)
export class App {
    constructor(eventAggregator, dialogService) {
        this.ea = eventAggregator;
        this.dialogService = dialogService;
    }

    activate() {
        this.ea.subscribe("app:view-job", job => {
        });
    }

    configureRouter(config, router) {
        config.title = "Distribu";

        config.map([
            { 
                name: "home",
                route: ["","home","home-how-it-works"],
                moduleId: PLATFORM.moduleName("home/home"),
                title: "Home",
                auth: false,
                includeInBreadcrumbs: true
            },
            { 
                name: "campaigns",
                route: "campaigns",
                moduleId: PLATFORM.moduleName("campaigns/campaigns"),
                title: "Campaigns",
                auth: false,
                includeInBreadcrumbs: true
            },
            { 
                name: "campaigns",
                route: "campaign/:id",
                moduleId: PLATFORM.moduleName("campaigns/campaign"),
                title: "Campaign",
                auth: false,
                includeInBreadcrumbs: true
            },
            { 
                name: "reports",
                route: "reports",
                moduleId: PLATFORM.moduleName("reports/reports"),
                title: "Reports",
                auth: false,
                includeInBreadcrumbs: true
            },
            { 
                name: "my-subscriptions",
                route: "my-subscriptions",
                moduleId: PLATFORM.moduleName("account/subscriptions"),
                title: "Subscriptions",
                auth: false,
                includeInBreadcrumbs: true
            },
            { 
                name: "newcampaign",
                route: "newcampaign",
                moduleId: PLATFORM.moduleName("newcampaign/newcampaign"),
                title: "New Campaign",
                auth: false,
                includeInBreadcrumbs: true
            }
        ]);

        config.addPipelineStep("authorize", AuthorizeStep);

        this.router = router;
    }
}

class AuthorizeStep {
    run(navigationInstruction, next) {
        return new Promise(resolve => {
            let client = new HttpClient();

            return resolve(next());

            // client.get("/api/has-been-setup").then(res => {
            //     let parsedResponse = JSON.parse(res.response);
            //     let currentRoute = navigationInstruction.config;
            //     let loginRequired = currentRoute.auth && currentRoute.auth === true;

            //     if (!parsedResponse.hasBeenSetup && loginRequired) {
            //         return resolve(next.cancel(new Redirect("setup")));
            //     }

            //     return resolve(next());
            // });
        });
    }
}
