const path = require("path");
const fs = require("fs");
const ogs = require("open-graph-scraper");

module.exports = class CampaignsService {
    campaigns() {
        let file = path.join(__dirname, "../../data/campaigns.json");
        let data = fs.readFileSync(file, "utf8");

        let campaigns = JSON.parse(data);

        campaigns = campaigns.map(c => {
            if (!c.patrons) {
                return c;
            }

            let totalPledged = 0;

            for (let patron of c.patrons) {
                totalPledged += parseFloat(patron.pledged.amount);
            }

            c.totalPledged = totalPledged;
            c.totalPatrons = c.patrons.length;

            return c;
        });

        return campaigns;
    }

    async get(id) {
        let campaigns = this.campaigns();
        
        // let response = await ogs({
        //     url: 'https://www.thewestmorlandgazette.co.uk/news/15063431.support-growing-for-a-restored-pool-at-grange-over-sands-lido/'
        // });
        
        // console.log(response);

        return campaigns.find(x => x.id === id);
    }

    addPatron(id, patron) {

    }
};