const BaseController = require("./base-controller");
const rp = require("request-promise");

module.exports = class PostcodeController extends BaseController {
    async validate(ctx) {
        console.log(ctx.request.body);

        let postcode = ctx.request.body.postcode;
        let response = await rp(`https://api.postcodes.io/postcodes/${postcode}/validate`);

        ctx.body = response;
    }
};