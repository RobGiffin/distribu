import { HttpClient } from "aurelia-http-client";

export class Campaign {
    constructor() {
    }

    activate(args) {
        console.log(args);

        return new Promise(resolve => {
            let client = new HttpClient();

            client.get(`/api/campaign/${args.id}`).then(data => {
                this.campaign = JSON.parse(data.response);

                resolve();
            });
        });
    }

    attached() {
    }
}