const BaseController = require("./base-controller");
const CampaignsService = require("../services/campaigns-service");
const EmailService = require("../services/email-service");

module.exports = class CampaignsController extends BaseController {
    async get(ctx) {
        let id = ctx.params.campaignId;
        
        let campaignService = new CampaignsService();

        let campaign = await campaignService.get(id);

        ctx.body = campaign;
    }

    async emailConfirmation(ctx) {
        let emailService = new EmailService();
        let email = ctx.request.body.email;
        let campaign = ctx.request.body.campaign;

        emailService.sendCampaignConfirmation(email, campaign);

        ctx.body = campaign;
    }
};