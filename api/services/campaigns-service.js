const path = require("path");
const fs = require("fs");

module.exports = class CampaignsService {
    campaigns() {
        let file = path.join(__dirname, "../../data/campaigns.json");
        let data = fs.readFileSync(file, "utf8");

        return JSON.parse(data);
    }

    get(id) {
        let campaigns = this.campaigns();

        return campaigns.find(x => x.id === id);
    }

    addPatron(id, patron) {

    }
};