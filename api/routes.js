const router = require("koa-router")();
const CampaignsController = require("./controllers/campaigns-controller");
const PatronController = require("./controllers/patron-controller");

let campaignsController = new CampaignsController();
let patronController = new PatronController();

router
    // root/get started
    .get("/", async ctx => {
        await ctx.render("aurelia");
    })

    // campaigns
    .get("/api/campaigns", async ctx => campaignsController.get(ctx))

    // patron
    .post("/api/campaign/:campaignId/support", async ctx => patronController.supportCampaign(ctx))
;

module.exports = router.routes();