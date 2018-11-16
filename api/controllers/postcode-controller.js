const BaseController = require("./base-controller");
const rp = require("request-promise");
const CampaignsService = require("../services/campaigns-service");

module.exports = class PostcodeController extends BaseController {
    async search(ctx) {
        let postcode = ctx.request.body.postcode;
        let response = await rp(`https://api.postcodes.io/postcodes/${postcode}`);
        let result = JSON.parse(response).result;
        let campaigns = new CampaignsService().campaigns();

        let filteredCampaigns = campaigns.filter(campaign => {
            let location = campaign.location;

            if (!location) {
                return false;
            }

            return location.ccg === result.ccg 
                || location.admin_ward === result.admin_ward
                || location.admin_county === result.admin_county
                || location.parish === result.parish
                || location.admin_district === result.admin_district
                || location.parliamentary_constituency === result.parliamentary_constituency
                || location.region === result.region
                || location.primary_care_trust === result.primary_care_trust
                || location.nhs_ha === result.nhs_ha;
        });

        ctx.body = filteredCampaigns;
    }

    async validate(ctx) {
        let postcode = ctx.request.body.postcode;
        let response = await rp(`https://api.postcodes.io/postcodes/${postcode}/validate`);

        ctx.body = response;
    }
};