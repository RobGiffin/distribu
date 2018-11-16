const router = require("koa-router")();
const CampaignsController = require("./controllers/campaigns-controller");

let campaignsController = new CampaignsController();

router
    // root/get started
    .get("/", async ctx => {
        await ctx.render("aurelia");
    })

    // campaigns
    .get("/api/campaigns", async ctx => campaignsController.get(ctx))
;

module.exports = router.routes();