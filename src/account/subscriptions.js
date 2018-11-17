import { HttpClient } from "aurelia-http-client";

export class Subscriptions {
    activate() {
        return new Promise(resolve => {
            let client = new HttpClient();

            client.get("/api/campaigns").then(data => {
                this.campaigns = JSON.parse(data.response).filter(x => x.subscribed);

                resolve();
            });
        });
    }
}