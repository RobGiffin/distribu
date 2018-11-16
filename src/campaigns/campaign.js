import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";
import { Router } from "aurelia-router";
import { DialogService } from "aurelia-dialog";
import { PledgeModal } from "./pledge-modal";
import { ConfirmModal } from "./confirm-modal";
import { ShareModal } from "./share-modal";

@inject(DialogService, Router)
export class Campaign {
    constructor(dialogService, router) {
        this.dialogService = dialogService;
        this.router = router;
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

    joinCampaign(campaign) {
        let opts = {
            viewModel: PledgeModal,
            model: campaign
        };

        this.dialogService.open(opts).whenClosed(response => {
            if (response.wasCancelled) {
                return;
            }
                
            this.openConfirmModal(campaign, response.paymentSchedule);
        });
    }

    openConfirmModal(campaign, paymentSchedule) {
        let opts = {
            viewModel: ConfirmModal,
            model: {
                campaign: campaign,
                paymentSchedule: paymentSchedule
            }
        };

        this.dialogService.open(opts).whenClosed(response => {
            if (response.wasCancelled) {
                return;
            }
             
            this.openShareModal(campaign);
        });        
    }

    openShareModal(campaign) {
        let opts = {
            viewModel: ShareModal,
            model: campaign
        };

        this.dialogService.open(opts);
    }

    shareOnTwitter(campaign) {
        var twitterWindow = window.open('https://twitter.com/share?text=Check out the ' + campaign.name + ' campaign on Distribu&url=' + document.URL, 'twitter-popup', 'height=350,width=600');
        
        if (twitterWindow.focus) { 
            twitterWindow.focus(); 
        }
        
        return false;
    }

    shareOnFacebook(campaign) {
        let facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?quote=Check out the ' + campaign.name + ' campaign on Distribu&u=' + document.URL, 'facebook-popup', 'height=350,width=600');
        
        if (facebookWindow.focus) { 
            facebookWindow.focus(); 
        }

        return false;
    }

    shareOnGoogle(campaign) {
        let googleWindow = window.open('https://plus.google.com/share?text=Check out the ' + campaign.name + ' campaign on Distribu&url=' + document.URL, 'google-popup', 'height=350,width=600');
        
        if (googleWindow.focus) { 
            googleWindow.focus(); 
        }

        return false;
    }
}