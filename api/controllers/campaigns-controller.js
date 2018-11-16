const BaseController = require("./base-controller");
const CampaignsService = require("../services/campaigns-service");

module.exports = class CampaignsController extends BaseController {
    async get(ctx) {
        let campaigns = new CampaignsService().campaigns();

        ctx.body = campaigns;
    }
};