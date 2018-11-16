const BaseController = require("./base-controller");
const CampaignsService = require("../services/campaigns-service");

module.exports = class PatronController extends BaseController {
    async supportCampaign(ctx) {
        let campaignId = ctx.params.campaignId;
        let patronId = ctx.params.patronId;

        
    }
};