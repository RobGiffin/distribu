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

                console.log(this.campaign);

                resolve();
            });
        });
    }

    attached() {
        console.log("attached!");

        if (this.campaign.location) {
            var mymap = L.map('mapid').setView([
                parseFloat(this.campaign.location.lat), 
                parseFloat(this.campaign.location.lng)
            ], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoicm9iZXJ0LXdhZ2dvdHQiLCJhIjoiMmRlMmI0MTIzYjJkYWU4YTQ5MzRhOTFkMWNhZWY1ZWEifQ.5uVZ6P4XGNC4gnmbNS5OLQ', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);
            
            L.marker([
                parseFloat(this.campaign.location.lat), 
                parseFloat(this.campaign.location.lng)                
            ]).addTo(mymap);            
        }
    }

    deactivate() {
    }

    joinCampaign() {

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