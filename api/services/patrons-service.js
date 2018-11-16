const path = require("path");
const fs = require("fs");

module.exports = class PatronsService {
    patrons() {
        let file = path.join(__dirname, "../../data/campaigns.json");
        let data = fs.readFileSync(file, "utf8");
        let campaigns = JSON.parse(data);
        let patrons = [];

        for (let campaign of campaigns) {
            if (!campaign.patrons) {
                continue;
            }

            for (let patron of campaign.patrons) {
                let id = patron.id;
                let p = patrons.find(x => x.id === id);
                let amount = parseFloat(patron.pledged.amount);

                if (p) {
                    p.numberOfCampaigns += 1;
                    p.pledged += amount;
                }
                else {
                    patrons.push({
                        id: id,
                        name: patron.name,
                        numberOfCampaigns: 1,
                        pledged: amount
                    });
                }
            }
        }

        return patrons;
    }

    get(id) {
        let campaigns = this.campaigns();

        return campaigns.find(x => x.id === id);
    }

    addPatron(id, patron) {

    }
};