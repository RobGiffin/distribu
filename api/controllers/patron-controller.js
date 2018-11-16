const BaseController = require("./base-controller");
const CampaignsService = require("../services/campaigns-service");

const keyPublishable = "pk_test_uP4xO5fMSTcUqez9MQ67b60X";
const keySecret = "sk_test_YrQjWTPsU80XFOK9cI4bUXM6";
const stripe = require("stripe")(keySecret);

module.exports = class PatronController extends BaseController {
    async supportCampaign(ctx) {
        let campaignId = ctx.params.campaignId;
        let campaign = new CampaignsService().get(campaignId);
        let patronId = ctx.params.patronId;
        let stripeToken = req.body.stripeToken;
        let amount = req.body.amount;

        stripe.charges.create({
            amount: amount,
            currency: "gbp",
            description: `Distribu - ${campaign.name}`,
            source: stripeToken,
        }, (err, charge) => {
            if (err) { 
                console.warn(err) 
            } 
            else {
                res.status(200).send(charge)
            }
        });              
    }
};