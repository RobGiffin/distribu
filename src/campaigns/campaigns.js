import { HttpClient } from "aurelia-http-client";

export class Campaigns {
    constructor() {
    }

    activate() {
        return new Promise(resolve => {
            let client = new HttpClient();

            client.get("/api/campaigns").then(data => {
                this.campaigns = JSON.parse(data.response);

                resolve();
            });
        });
    }

    deactivate() {
    }
}