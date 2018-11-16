const BaseController = require("./base-controller");
const path = require("path");
const fs = require('fs');

module.exports = class CampaignsController extends BaseController {
    async get(ctx) {
        let file = path.join(__dirname, "../../data/campaigns.json");
        let data = fs.readFileSync(file, "utf8");

        ctx.body = data;
    }
};