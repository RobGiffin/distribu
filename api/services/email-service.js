const path = require("path");
const fs = require("fs");
const postmark = require("postmark");

module.exports = class EmailService {
    sendCampaignConfirmation(email, campaign) {
        let file = path.join(__dirname, "../../content/email-templates/campaign-subscription.html");
        let html = fs.readFileSync(file, "utf8");

        var client = new postmark.Client("8a89e236-8888-49f3-a9b8-a710efb61c6b");

        html = html.replace("{{campaign_name}}", campaign.name);

        client.sendEmail({
            "From": "support@earthware.co.uk",
            "To": email,
            "Subject": campaign.name + " campaign confirmation",
            "HtmlBody": html
        });
    }
};