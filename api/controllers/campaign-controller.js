const BaseController = require("./base-controller");
const CampaignsService = require("../services/campaigns-service");

module.exports = class CampaignsController extends BaseController {
    async get(ctx) {
        let id = ctx.params.campaignId;
        
        let campaignService = new CampaignsService();

        let campaign = await campaignService.get(id);

        ctx.body = campaign;
    }
};