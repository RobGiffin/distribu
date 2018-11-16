const BaseController = require("./base-controller");
const CampaignsService = require("../services/campaigns-service");

module.exports = class CampaignsController extends BaseController {
    async get(ctx) {
        let id = ctx.params.campaignId;
        let campaign = new CampaignsService().get(id);

        ctx.body = campaign;
    }
};