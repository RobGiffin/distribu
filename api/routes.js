const router = require("koa-router")();
const SetupController = require("./controllers/setup-controller");

router
    // root/get started
    .get("/", async ctx => {
        await ctx.render("aurelia");
    })
;

module.exports = router.routes();