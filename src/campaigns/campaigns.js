import { HttpClient } from "aurelia-http-client";

export class Campaigns {
    constructor() {
    }

    activate() {
        return new Promise(resolve => {
            let client = new HttpClient();

            client.get("/api/campaigns").then(data => {
                this.campaigns = JSON.parse(data.response);

                this.setDefaultLocalCampaigns();
                resolve();
            });
        });
    }

    deactivate() {
    }

    handlePostcodeKeydown(e) {
        if (e.code !== "Enter") {
            return true;
        }

        this.searchByPostcode();
        return true;
    }

    searchByPostcode() {
        if (!this.postcode) {
            this.setDefaultLocalCampaigns();
            return;
        }

        let data = {
            postcode: this.postcode
        };

        let client = new HttpClient();

        client.post("/api/postcode/search", data).then(data => {
            this.localCampaigns = JSON.parse(data.response);
        });        
    }

    setDefaultLocalCampaigns() {
        this.localCampaigns = this.campaigns.filter(c => c.area === "local");
    }

    shareOnTwitter(campaign) {
        var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');
        
        if (twitterWindow.focus) { 
            twitterWindow.focus(); 
        }

        return false;
    }

    shareOnFacebook(campaign) {
        let facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');
        
        if (facebookWindow.focus) { 
            facebookWindow.focus(); 
        }

        return false;
    }
}