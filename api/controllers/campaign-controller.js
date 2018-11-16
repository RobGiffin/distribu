const BaseController = require("./base-controller");
const CampaignsService = require("../services/campaigns-service");

module.exports = class CampaignsController extends BaseController {
    async get(ctx) {
        let id = ctx.params.campaignId;
<<<<<<< HEAD
        
        let campaignService = new CampaignsService();

        let campaign = await campaignService.get(id);
=======
        let campaign = new CampaignsService().get(id);
>>>>>>> c4464030a7ad6192144e7946646cdb9a6f43cc43

        ctx.body = campaign;
    }
};