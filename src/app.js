import { inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DialogService } from "aurelia-dialog";
import { JobDetailsModal } from "job/job-details-modal";
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
            let opts = {
                viewModel: JobDetailsModal,
                model: job
            };
    
            this.dialogService.open(opts);
        });
    }

    configureRouter(config, router) {
        config.title = "DistribYou";

        config.map([
            { 
                name: "get-started",
                route: "",
                moduleId: PLATFORM.moduleName("welcome/welcome"),
                title: "Get started",
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

            client.get("/api/has-been-setup").then(res => {
                let parsedResponse = JSON.parse(res.response);
                let currentRoute = navigationInstruction.config;
                let loginRequired = currentRoute.auth && currentRoute.auth === true;

                if (!parsedResponse.hasBeenSetup && loginRequired) {
                    return resolve(next.cancel(new Redirect("setup")));
                }

                return resolve(next());
            });
        });
    }
}
