const router = require("koa-router")();
const CampaignsController = require("./controllers/campaigns-controller");
const CampaignController = require("./controllers/campaign-controller");
const PatronController = require("./controllers/patron-controller");
const PostcodeController = require("./controllers/postcode-controller");

let campaignsController = new CampaignsController();
let campaignController = new CampaignController();
let patronController = new PatronController();
let postcodeController = new PostcodeController();

router
    // root/get started
    .get("/", async ctx => {
        await ctx.render("aurelia");
    })

    // campaigns
    .get("/api/campaigns", async ctx => campaignsController.get(ctx))

    // campaign
    .get("/api/campaign/:campaignId", async ctx => campaignController.get(ctx))

    // patron
    .post("/api/campaign/:campaignId/support/:patronId", async ctx => patronController.supportCampaign(ctx))

    // postcode
    .post("/api/postcode/search", async ctx => postcodeController.search(ctx))
    .post("/api/postcode/validate", async ctx => postcodeController.validate(ctx))
;

module.exports = router.routes();