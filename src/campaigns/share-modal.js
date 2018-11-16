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

    shareOnTwitter() {
        let twitterWindow = window.open('https://twitter.com/share?text=Check out the ' + campaign.name + ' campaign on Distribu&url=' + campaign.url, 'twitter-popup', 'height=350,width=600');
        
        if (twitterWindow.focus) { 
            twitterWindow.focus(); 
        }
        
        return false;
    }

    shareOnFacebook() {
        let facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?quote=Check out the ' + campaign.name + ' campaign on Distribu&u=' + campaign.url, 'facebook-popup', 'height=350,width=600');
        
        if (facebookWindow.focus) { 
            facebookWindow.focus(); 
        }

        return false;
    }

    finish() {
        this.dialogController.ok();        
    }
}