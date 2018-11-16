define('resources/index',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources([]);
    }
});
define('resources/elements/router-progress-indicator/router-progress-indicator',["exports", "aurelia-framework", "aurelia-event-aggregator", "nprogress"], function (exports, _aureliaFramework, _aureliaEventAggregator, _nprogress) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RouterProgressIndicator = undefined;

    var nprogress = _interopRequireWildcard(_nprogress);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var RouterProgressIndicator = exports.RouterProgressIndicator = (_dec = (0, _aureliaFramework.customElement)("router-progress-indicator"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = function () {
        function RouterProgressIndicator(EventAggregator) {
            _classCallCheck(this, RouterProgressIndicator);

            this.ea = EventAggregator;
        }

        RouterProgressIndicator.prototype.attached = function attached() {
            this.processingSubscriber = this.ea.subscribe("router:navigation:processing", function () {
                nprogress.start();
            });

            this.completeSubscriber = this.ea.subscribe("router:navigation:complete", function () {
                nprogress.done();
            });
        };

        RouterProgressIndicator.prototype.detached = function detached() {
            this.processingSubscriber.dispose();
            this.completeSubscriber.dispose();
        };

        return RouterProgressIndicator;
    }()) || _class) || _class);
});
define('text!resources/elements/router-progress-indicator/router-progress-indicator.html', ['module'], function(module) { module.exports = "<template></template>"; });
define('resources/elements/request-indicator/request-indicator',["exports", "aurelia-framework", "aurelia-event-aggregator"], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RequestIndicator = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var RequestIndicator = exports.RequestIndicator = (_dec = (0, _aureliaFramework.customElement)("request-indicator"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = function () {
        function RequestIndicator(EventAggregator) {
            _classCallCheck(this, RequestIndicator);

            this.ea = EventAggregator;
            this.visible = false;
        }

        RequestIndicator.prototype.attached = function attached() {
            var _this = this;

            this.processingSubscriber = this.ea.subscribe("request:processing", function () {
                _this.visible = true;
            });

            this.completeSubscriber = this.ea.subscribe("request:complete", function () {
                _this.visible = false;
            });
        };

        RequestIndicator.prototype.detached = function detached() {
            this.processingSubscriber.dispose();
            this.completeSubscriber.dispose();
        };

        return RequestIndicator;
    }()) || _class) || _class);
});
define('text!resources/elements/request-indicator/request-indicator.html', ['module'], function(module) { module.exports = "<template>\n    <div id=\"nprogress\" if.bind=\"visible\">\n        <div class=\"spinner\" role=\"spinner\">\n            <div class=\"spinner-icon\"></div>\n        </div>\n    </div>\n</template>"; });
define('resources/elements/breadcrumbs/breadcrumbs',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-router"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Breadcrumbs = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var Breadcrumbs = exports.Breadcrumbs = (_dec = (0, _aureliaFramework.customElement)("breadcrumbs"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaRouter.Router), _dec(_class = _dec2(_class = function () {
        function Breadcrumbs(eventAggregator, router) {
            _classCallCheck(this, Breadcrumbs);

            this.ea = eventAggregator;
            this.router = router;
        }

        Breadcrumbs.prototype.attached = function attached() {
            var _this = this;

            this.navigationSubscriber = this.ea.subscribe("router:navigation:success", function () {
                _this.loadInstructions();
            });

            this.loadInstructions();
        };

        Breadcrumbs.prototype.detached = function detached() {
            if (this.navigationSubscriber) {
                this.navigationSubscriber.dispose();
            }
        };

        Breadcrumbs.prototype.loadInstructions = function loadInstructions() {
            var parentInstructions = this.getParentInstructions(this.router.currentInstruction);

            this.instructions = parentInstructions.slice(0, parentInstructions.length - 1).concat(this.router.currentInstruction.getAllInstructions()).filter(function (instruction) {
                return instruction.config.includeInBreadcrumbs && instruction.config.title;
            });
        };

        Breadcrumbs.prototype.navigateToRoute = function navigateToRoute(instruction) {
            this.router.navigateToRoute(instruction.config.name, instruction.params);
        };

        Breadcrumbs.prototype.getParentInstructions = function getParentInstructions(instruction) {
            var arr = [instruction];

            if (!instruction.config.previousInstruction) {
                return arr;
            }

            var routes = this.router.routes;
            var previousInstruction = routes.find(function (e) {
                return e.name === instruction.config.previousInstruction;
            });

            if (!previousInstruction) {
                return arr;
            }

            previousInstruction.config = previousInstruction;

            return this.getParentInstructions(previousInstruction).concat(arr);
        };

        return Breadcrumbs;
    }()) || _class) || _class);
});
define('text!resources/elements/breadcrumbs/breadcrumbs.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <ol class=\"breadcrumb\">\n                    <li class=\"breadcrumb-item\" repeat.for=\"instruction of instructions\">\n                        <a href=\"#\" \n                            click.delegate=\"navigateToRoute(instruction)\"\n                            if.bind=\"$index !== (instructions.length - 1)\">${instruction.config.title}</a>\n\n                        <span if.bind=\"$index === (instructions.length - 1)\">${instruction.config.title}</span>\n                    </li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</template>"; });
define('reports/reports',["exports", "aurelia-http-client"], function (exports, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Campaign = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Campaign = exports.Campaign = function () {
        function Campaign() {
            _classCallCheck(this, Campaign);
        }

        Campaign.prototype.activate = function activate(args) {
            console.log(args);
        };

        return Campaign;
    }();
});
define('text!reports/reports.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"reports\">\n        <div class=\"container\">\n            <div class=\"heading-text\">\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <h2>Successful campaigns</h2>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <h3>How you chose to spend</h3>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\" style=\"display: block; margin: 0 auto;\">\n                       <img src=\"/content/images/group-2@2x.png\" style=\"width:520px;margin-top:50px;\" />\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>\n"; });
define('main',["exports", "aurelia-pal", "./environment"], function (exports, _aureliaPal, _environment) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;

    var _environment2 = _interopRequireDefault(_environment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function configure(aurelia) {
        aurelia.use.standardConfiguration().plugin("aurelia-validation").plugin(_aureliaPal.PLATFORM.moduleName("aurelia-dialog"), function (config) {
            config.useDefaults();
            config.settings.lock = false;
            config.settings.centerHorizontalOnly = false;
            config.settings.startingZIndex = 5;
            config.settings.keyboard = true;
        }).feature("resources");

        if (_environment2.default.debug) {
            aurelia.use.developmentLogging();
        }

        if (_environment2.default.testing) {
            aurelia.use.plugin("aurelia-testing");
        }

        return aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
});
define('home/home',["exports", "aurelia-framework", "aurelia-router"], function (exports, _aureliaFramework, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Campaign = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Campaign = exports.Campaign = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Campaign(router) {
            _classCallCheck(this, Campaign);

            this.router = router;
        }

        Campaign.prototype.activate = function activate(args) {};

        Campaign.prototype.findACampaign = function findACampaign() {
            this.router.navigate("campaigns");
        };

        return Campaign;
    }()) || _class);
});
define('text!home/home.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"home\">\n        <div class=\"welcome\">\n            <div class=\"cut-away\"></div>\n\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h1>\n                            Make your £1 pledge\n                            <br>and decide how it’s spent\n                        </h1>\n\n                        <button type=\"button\" click.delegate=\"findACampaign()\">Find a campaign</button>\n                    </div>\n                </div>\n            </div>\n\n            <img class=\"figure\" src=\"/content/images/bitmap.png\">\n        </div>\n\n        <div class=\"how-it-works\">\n            <div class=\"container\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <a name=\"home-how-it-works\"></a>\n\n                        <h2>How it works</h2>\n\n                        <div class=\"step\">\n                            <img src=\"/content/images/step-no.png\">\n\n                            <h3>Find your cause...</h3>\n                            <p>Whether it’s the NHS, Houseing or something more local you want to start, there’s a campaign that will match your values. Search our national and local campaigns and find your tribe.</p>\n                        </div>\n                        \n                        <div class=\"step\">\n                            <img src=\"/content/images/step-no-copy.png\">\n\n                            <h3>Choose your pledge amount</h3>\n                            <p>From as little as £1 you can pledge your support for a cause. There are 4 tiers, £1 per year, £1 per month (£12), £1 per week (£52).</p>\n                        </div>\n                        \n                        <div class=\"step\">\n                            <img src=\"/content/images/step-no-copy-2.png\">\n\n                            <h3>Share your cause...</h3>\n                            <p>Now it’s time to spread your message far and wide among your networks, family and friends. Maybe you want to become an ambassador for the cause.</p>\n                        </div>\n                        \n                        <div class=\"step\">\n                            <img src=\"/content/images/step-no-copy-3.png\">\n\n                            <h3>Receive updates...</h3>\n                            <p>We’ll make it known how the campaigns are doing via email and social media. Publicity is key.</p>\n                        </div>\n\n                        <div class=\"step\">\n                            <img src=\"/content/images/step-no-copy-4.png\">\n\n                            <h3>Government takes the money...</h3>\n                            <p>This is where the magic happens. The government decisdes to pull the trigger and spend your money exactly as you want it. Boom, people power has prevailed.</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>"; });
define('header/header',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-router"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Header = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Header = exports.Header = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaRouter.Router), _dec(_class = function () {
        function Header(EventAggregator, router) {
            _classCallCheck(this, Header);

            this.ea = EventAggregator;
            this.router = router;
        }

        Header.prototype.attached = function attached() {
            this.showApiCallsButton = this.router.currentInstruction.config.auth;
        };

        Header.prototype.toggleAPICalls = function toggleAPICalls() {
            this.ea.publish("toggleAPICalls");
        };

        return Header;
    }()) || _class);
});
define('text!header/header.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"header\">\n        <nav class=\"distribu-nav navbar navbar-expand-lg navbar-light bg-light\">\n            <a class=\"navbar-brand\" href=\"#\"><img src=\"\\content\\images\\logo.png\" alt=\"Distribu\" /></a>\n            <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n                <span class=\"navbar-toggler-icon\"></span>\n            </button>\n            \n            <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n                <ul class=\"navbar-nav mr-auto\">\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"#home-how-it-works\">How it works</a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" href=\"#/campaigns/\">Find a Campaign</a>\n                </li>\n                <li class=\"nav-item\">\n                        <a class=\"nav-link\" href=\"#/reports/\">Successful Campaigns</a>\n                    </li>\n                </ul>\n                <button class=\"distribu-login-btn btn btn-outline-success my-2 my-sm-0\" type=\"submit\">Log out</button>\n            </div>\n        </nav>\n    </div>\n</template>"; });
define('footer/footer',["exports", "aurelia-framework", "aurelia-http-client", "aurelia-router"], function (exports, _aureliaFramework, _aureliaHttpClient, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Footer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Footer = exports.Footer = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = function () {
        function Footer(router) {
            _classCallCheck(this, Footer);

            this.router = router;
        }

        Footer.prototype.attached = function attached() {};

        return Footer;
    }()) || _class);
});
define('text!footer/footer.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"make-my-pledge\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12 text-center\">\n                    <button style=\"width:350px;\">Create a new Campaign</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>"; });
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('campaigns/share-modal',["exports", "aurelia-framework", "aurelia-dialog"], function (exports, _aureliaFramework, _aureliaDialog) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ShareModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ShareModal = exports.ShareModal = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function ShareModal(dialogController) {
            _classCallCheck(this, ShareModal);

            this.dialogController = dialogController;
        }

        ShareModal.prototype.activate = function activate(campaign) {
            this.campaign = campaign;
        };

        ShareModal.prototype.shareOnTwitter = function shareOnTwitter() {
            var twitterWindow = window.open('https://twitter.com/share?text=Check out the ' + this.campaign.name + ' campaign on Distribu&url=' + this.campaign.url, 'twitter-popup', 'height=350,width=600');

            if (twitterWindow.focus) {
                twitterWindow.focus();
            }

            return false;
        };

        ShareModal.prototype.shareOnFacebook = function shareOnFacebook() {
            var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?quote=Check out the ' + this.campaign.name + ' campaign on Distribu&u=' + this.campaign.url, 'facebook-popup', 'height=350,width=600');

            if (facebookWindow.focus) {
                facebookWindow.focus();
            }

            return false;
        };

        ShareModal.prototype.finish = function finish() {
            this.dialogController.ok();
        };

        return ShareModal;
    }()) || _class);
});
define('text!campaigns/share-modal.html', ['module'], function(module) { module.exports = "<template>\n        <ux-dialog>\n            <ux-dialog-header class=\"no-border\">\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <div class=\"wizard-steps\">\n                                <img src=\"/content/images/modal/1-unselected.png\">\n    \n                                <img src=\"/content/images/modal/2-unselected.png\">\n    \n                                <img src=\"/content/images/modal/3-selected.png\">\n                            </div>\n    \n                            <h5>Tell everybody about your pledge</h5>\n                        </div>\n                    </div>\n                </div>\n            </ux-dialog-header>\n            <ux-dialog-body>\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <img class=\"share\" src=\"/content/images/facebook_button.PNG\" click.delegate=\"shareOnFacebook()\">\n\n                            <img class=\"share\" src=\"/content/images/twitter_button.PNG\" click.delegate=\"shareOnTwitter()\">\n    \n                            <button type=\"button\" click.delegate=\"finish()\">Finish</button>\n                        </div>\n                    </div>\n                </div>\n            </ux-dialog-body>\n        </ux-dialog>\n    </template>"; });
define('campaigns/pledge-modal',["exports", "aurelia-framework", "aurelia-dialog"], function (exports, _aureliaFramework, _aureliaDialog) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PledgeModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PledgeModal = exports.PledgeModal = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function PledgeModal(dialogController) {
            _classCallCheck(this, PledgeModal);

            this.dialogController = dialogController;
            this.paymentSchedule = "yearly";
        }

        PledgeModal.prototype.activate = function activate(campaign) {
            this.campaign = campaign;
        };

        PledgeModal.prototype.switchPaymentSchedule = function switchPaymentSchedule(paymentSchedule) {
            this.paymentSchedule = paymentSchedule;
        };

        PledgeModal.prototype.continue = function _continue() {
            this.dialogController.ok({
                paymentSchedule: this.paymentSchedule
            });
        };

        return PledgeModal;
    }()) || _class);
});
define('text!campaigns/pledge-modal.html', ['module'], function(module) { module.exports = "<template>\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"wizard-steps\">\n                            <img src=\"/content/images/modal/1-selected.png\">\n\n                            <img src=\"/content/images/modal/2-unselected.png\">\n\n                            <img src=\"/content/images/modal/3-unselected.png\">\n                        </div>\n\n                        <h5>Select your pledge level</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"payment-schedule\" click.delegate=\"switchPaymentSchedule('yearly')\">\n                            <img src=\"/content/images/modal/selected-radial.png\" if.bind=\"paymentSchedule === 'yearly'\">\n                            <img src=\"/content/images/modal/radial.png\" if.bind=\"paymentSchedule !== 'yearly'\">\n\n                            £1 per yer\n                        </div>\n\n                        <div class=\"payment-schedule\" click.delegate=\"switchPaymentSchedule('monthly')\">\n                            <img src=\"/content/images/modal/selected-radial.png\" if.bind=\"paymentSchedule === 'monthly'\">\n                            <img src=\"/content/images/modal/radial.png\" if.bind=\"paymentSchedule !== 'monthly'\">\n\n                            £1 per month (£12)\n                        </div>\n\n                        <div class=\"payment-schedule\" click.delegate=\"switchPaymentSchedule('daily')\">\n                            <img src=\"/content/images/modal/selected-radial.png\" if.bind=\"paymentSchedule === 'daily'\">\n                            <img src=\"/content/images/modal/radial.png\" if.bind=\"paymentSchedule !== 'daily'\">\n\n                            £1 per week (£52)\n                        </div>                        \n\n                        <button click.delegate=\"continue()\">Continue</button>\n\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-body>\n    </ux-dialog>\n</template>"; });
define('campaigns/confirmation',["exports", "aurelia-http-client"], function (exports, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Campaign = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Campaign = exports.Campaign = function () {
        function Campaign() {
            _classCallCheck(this, Campaign);
        }

        Campaign.prototype.activate = function activate(args) {
            var _this = this;

            console.log(args);

            return new Promise(function (resolve) {
                var client = new _aureliaHttpClient.HttpClient();

                client.get("/api/campaign/" + args.id).then(function (data) {
                    _this.campaign = JSON.parse(data.response);

                    resolve();
                });
            });
        };

        Campaign.prototype.attached = function attached() {};

        return Campaign;
    }();
});
define('text!campaigns/confirmation.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"confirmation\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <h3>Thank you</h3>\n\n                    <p>${this.campaign.thanks}</p>\n\n                    <p>\n                        <a href=\"#\" click.delegate=\"shareOnTwitter()\">Share on twitter</a>\n                    </p>\n\n                    <p>\n                        <a href=\"#\" click.delegate=\"shareOnFacebook()\">Share on facebook</a>\n                    </p>\n\n                    <p>\n                        <a href=\"#\" click.delegate=\"shareOnGoogle()\">Share on google+</a>\n                    </p>\n\n                    <p>\n                        <a href=\"#\" click.delegate=\"shareByEmail()\">Share by email</a>\n                    </p>                    \n                </div>\n            </div>\n        </div>\n    </div>\n</template>"; });
define('campaigns/confirm-modal',["exports", "aurelia-framework", "aurelia-dialog"], function (exports, _aureliaFramework, _aureliaDialog) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ConfirmModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ConfirmModal = exports.ConfirmModal = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function ConfirmModal(dialogController) {
            _classCallCheck(this, ConfirmModal);

            this.dialogController = dialogController;
            this.agreedToTermsAndConditions = false;
        }

        ConfirmModal.prototype.activate = function activate(state) {
            this.state = state;
        };

        ConfirmModal.prototype.confirm = function confirm() {
            this.dialogController.ok();
        };

        return ConfirmModal;
    }()) || _class);
});
define('text!campaigns/confirm-modal.html', ['module'], function(module) { module.exports = "<template>\n        <ux-dialog>\n            <ux-dialog-header class=\"no-border\">\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <div class=\"wizard-steps\">\n                                <img src=\"/content/images/modal/1-unselected.png\">\n    \n                                <img src=\"/content/images/modal/2-selected.png\">\n    \n                                <img src=\"/content/images/modal/3-unselected.png\">\n                            </div>\n    \n                            <h5>Confirm your pledge</h5>\n                        </div>\n                    </div>\n                </div>\n            </ux-dialog-header>\n            <ux-dialog-body>\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <div class=\"form-check\">\n                                <input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"agreed-to-terms-and-conditions\" checked.bind=\"agreedToTermsAndConditions\">\n\n                                <label class=\"form-check-label\" for=\"agreed-to-terms-and-conditions\">\n                                    I have read and agree to the <a href=\"#/terms-and-conditions\" target=\"_blank\">terms and conditions</a>.\n                                </label>\n                            </div>                                      \n    \n    \n                            <button type=\"button\" click.delegate=\"confirm()\" disabled.bind=\"!agreedToTermsAndConditions\">Confirm</button>\n    \n                        </div>\n                    </div>\n                </div>\n            </ux-dialog-body>\n        </ux-dialog>\n    </template>"; });
define('campaigns/campaigns',["exports", "aurelia-http-client"], function (exports, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Campaigns = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Campaigns = exports.Campaigns = function () {
        function Campaigns() {
            _classCallCheck(this, Campaigns);
        }

        Campaigns.prototype.activate = function activate() {
            var _this = this;

            return new Promise(function (resolve) {
                var client = new _aureliaHttpClient.HttpClient();

                client.get("/api/campaigns").then(function (data) {
                    _this.campaigns = JSON.parse(data.response);

                    _this.setDefaultLocalCampaigns();
                    resolve();
                });
            });
        };

        Campaigns.prototype.deactivate = function deactivate() {};

        Campaigns.prototype.handlePostcodeKeydown = function handlePostcodeKeydown(e) {
            if (e.code !== "Enter") {
                return true;
            }

            this.searchByPostcode();
            return true;
        };

        Campaigns.prototype.searchByPostcode = function searchByPostcode() {
            var _this2 = this;

            if (!this.postcode) {
                this.setDefaultLocalCampaigns();
                return;
            }

            var data = {
                postcode: this.postcode
            };

            var client = new _aureliaHttpClient.HttpClient();

            client.post("/api/postcode/search", data).then(function (data) {
                _this2.localCampaigns = JSON.parse(data.response);
            });
        };

        Campaigns.prototype.setDefaultLocalCampaigns = function setDefaultLocalCampaigns() {
            this.localCampaigns = this.campaigns.filter(function (c) {
                return c.area === "local";
            });
        };

        Campaigns.prototype.shareOnTwitter = function shareOnTwitter(campaign) {
            var twitterWindow = window.open('https://twitter.com/share?url=' + document.URL, 'twitter-popup', 'height=350,width=600');

            if (twitterWindow.focus) {
                twitterWindow.focus();
            }

            return false;
        };

        Campaigns.prototype.shareOnFacebook = function shareOnFacebook(campaign) {
            var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + document.URL, 'facebook-popup', 'height=350,width=600');

            if (facebookWindow.focus) {
                facebookWindow.focus();
            }

            return false;
        };

        return Campaigns;
    }();
});
define('text!campaigns/campaigns.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"campaigns\">\n        <div class=\"container\">\n            <div class=\"heading-text\">\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <h2>Find a campaign</h2>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6\" style=\"display: block; margin: 0 auto;\">\n                        <ul class=\"nav nav-tabs nav-fill\" id=\"myTab\" role=\"tablist\">\n                            <li class=\"nav-item\">\n                                <a class=\"btn btn-outline-info header-button active show\" id=\"national-tab\" data-toggle=\"tab\" href=\"#national\"\n                                    role=\"tab\" aria-controls=\"national\" aria-selected=\"true\">National</a>\n                            </li>\n                            <li class=\"nav-item\">\n                                <a class=\"btn btn-outline-info header-button\" id=\"local-tab\" data-toggle=\"tab\" href=\"#local\"\n                                    role=\"tab\" aria-controls=\"local\" aria-selected=\"false\">Local</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"col-md-12 centered\">\n            <div class=\"tab-content\" id=\"myTabContent\">\n                <div class=\"tab-pane active\" id=\"national\" role=\"tabpanel\" aria-labelledby=\"national-tab\">\n                    <div class=\"row\">\n                        <div class=\"col-md-6\" repeat.for=\"campaign of campaigns\">\n                            <div class=\"campaign-box\" if.bind=\"campaign.area == 'national'\">\n                                <div class=\"campaign-box-text\">\n                                    <h3>${campaign.name}</h3>\n                                    <a class=\"btn btn-primary\" href=\"#/campaign/${campaign.id}\">View campaign</a>\n                                </div>\n                                <div class=\"campaign-box-image\">\n                                    <img src=\"${campaign.promoImage}\" />\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"tab-pane fade\" id=\"local\" role=\"tabpanel\" aria-labelledby=\"local-tab\">\n\n                    <div class=\"row\">\n                        <div class=\"col-md-12\">\n                            <div class=\"postcode-search\">\n                                <input type=\"text\" placeholder=\"Enter your postcode\" value.bind=\"postcode\" keydown.trigger=\"handlePostcodeKeydown($event)\"> \n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"row ${localCampaigns.length === 1 ? 'justify-content-center' : ''}\">\n                        <div class=\"col-md-6\" \n                            repeat.for=\"campaign of localCampaigns\" \n                            if.bind=\"localCampaigns.length > 0\">\n                            <div class=\"campaign-box\">\n                                <div class=\"campaign-box-text\">\n                                    <h3>${campaign.name}</h3>\n                                    <a class=\"btn btn-primary\" href=\"#/campaign/${campaign.id}\">View campaign</a>\n                                </div>\n                                <div class=\"campaign-box-image\">\n                                    <img src=\"${campaign.promoImage}\" />\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"col-md-12 no-local-campaigns\" if.bind=\"localCampaigns.length === 0\">\n                            <p>\n                                Sorry there are no campaigns local to you, why not create one now?\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix\"></div>\n            <div style=\"height:200px;\"></div>\n        </div>\n</template>"; });
define('campaigns/campaign',["exports", "aurelia-framework", "aurelia-http-client", "aurelia-router", "aurelia-dialog", "./pledge-modal", "./confirm-modal", "./share-modal"], function (exports, _aureliaFramework, _aureliaHttpClient, _aureliaRouter, _aureliaDialog, _pledgeModal, _confirmModal, _shareModal) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Campaign = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Campaign = exports.Campaign = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _aureliaRouter.Router), _dec(_class = function () {
        function Campaign(dialogService, router) {
            _classCallCheck(this, Campaign);

            this.dialogService = dialogService;
            this.router = router;
        }

        Campaign.prototype.activate = function activate(args) {
            var _this = this;

            console.log(args);

            return new Promise(function (resolve) {
                var client = new _aureliaHttpClient.HttpClient();

                client.get("/api/campaign/" + args.id).then(function (data) {
                    _this.campaign = JSON.parse(data.response);

                    console.log(_this.campaign);

                    resolve();
                });
            });
        };

        Campaign.prototype.attached = function attached() {
            if (this.campaign.location) {
                var mymap = L.map('mapid').setView([parseFloat(this.campaign.location.lat), parseFloat(this.campaign.location.lng)], 13);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoicm9iZXJ0LXdhZ2dvdHQiLCJhIjoiMmRlMmI0MTIzYjJkYWU4YTQ5MzRhOTFkMWNhZWY1ZWEifQ.5uVZ6P4XGNC4gnmbNS5OLQ', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox.streets',
                    accessToken: 'your.mapbox.access.token'
                }).addTo(mymap);

                L.marker([parseFloat(this.campaign.location.lat), parseFloat(this.campaign.location.lng)]).addTo(mymap);
            }
        };

        Campaign.prototype.deactivate = function deactivate() {};

        Campaign.prototype.joinCampaign = function joinCampaign(campaign) {
            var _this2 = this;

            var opts = {
                viewModel: _pledgeModal.PledgeModal,
                model: campaign
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (response.wasCancelled) {
                    return;
                }

                _this2.openConfirmModal(campaign, response.paymentSchedule);
            });
        };

        Campaign.prototype.openConfirmModal = function openConfirmModal(campaign, paymentSchedule) {
            var _this3 = this;

            var opts = {
                viewModel: _confirmModal.ConfirmModal,
                model: {
                    campaign: campaign,
                    paymentSchedule: paymentSchedule
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (response.wasCancelled) {
                    return;
                }

                _this3.openShareModal(campaign);
            });
        };

        Campaign.prototype.openShareModal = function openShareModal(campaign) {
            var opts = {
                viewModel: _shareModal.ShareModal,
                model: campaign
            };

            this.dialogService.open(opts);
        };

        Campaign.prototype.shareOnTwitter = function shareOnTwitter(campaign) {
            var twitterWindow = window.open('https://twitter.com/share?text=Check out the ' + campaign.name + ' campaign on Distribu&url=' + document.URL, 'twitter-popup', 'height=350,width=600');

            if (twitterWindow.focus) {
                twitterWindow.focus();
            }

            return false;
        };

        Campaign.prototype.shareOnFacebook = function shareOnFacebook(campaign) {
            var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?quote=Check out the ' + campaign.name + ' campaign on Distribu&u=' + document.URL, 'facebook-popup', 'height=350,width=600');

            if (facebookWindow.focus) {
                facebookWindow.focus();
            }

            return false;
        };

        Campaign.prototype.shareOnGoogle = function shareOnGoogle(campaign) {
            var googleWindow = window.open('https://plus.google.com/share?text=Check out the ' + campaign.name + ' campaign on Distribu&url=' + document.URL, 'google-popup', 'height=350,width=600');

            if (googleWindow.focus) {
                googleWindow.focus();
            }

            return false;
        };

        return Campaign;
    }()) || _class);
});
define('text!campaigns/campaign.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"campaign\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-md-7\">\n                    <h2>${campaign.name}</h2>\n\n                    <h3>Closing date: 1 June 2019</h3>\n\n                    <p>${campaign.description}</p>\n                \n                    <!-- <p style=\"background-color:orange;\"><em>${campaign.tags}</em></p>\n                \n                    <p style=\"background-color:greenyellow;\"><em>${campaign.jurisdiction}</em></p>\n                \n                    <p>\n                        ${campaign.createdBy.name}<br>\n                        <a href=\"mailto:${campaign.createdBy.email}?subject=${campaign.name}\">${campaign.createdBy.email}</a>\n                    </p> -->\n                </div>\n                <div class=\"col-md-5\">\n                    <div class=\"pledge\">\n                        <div if.bind=\"campaign.media && campaign.media.youtube\">\n                            <iframe width=\"100%\" height=\"256px\" src=\"https://www.youtube.com/embed/${campaign.media.youtube}\" frameBorder=\"0\"></iframe>\n                        </div>\n\n                        <div class=\"text-center\">\n                            <button type=\"button\" class=\"btn btn-primary\" click.delegate=\"joinCampaign(campaign)\">Pledge to this campaign</button>\n                        </div>\n\n                        <div class=\"people-pledged\">\n                            ${campaign.noPledges} people have pledged so far\n                        </div>\n\n                        <div class=\"text-center\">\n                            <span class=\"figure\">\n                                £${campaign.totalPledged}\n                            </span>\n                        </div>\n                    </div>\n\n                    <div if.bind=\"campaign.location\">\n                        <div id=\"mapid\" class=\"map\"></div>\n                    </div>\n\n                    <div class=\"row social-media\">\n                        <div class=\"col-md-4\">\n                            <a href=\"#\" click.delegate=\"shareOnTwitter(campaign)\" title=\"Share on twitter\">\n                                <i class=\"fab fa-twitter-square\"></i>\n                            </a>                            \n                        </div>\n\n                        <div class=\"col-md-4 text-center\">\n                            <a href=\"#\" click.delegate=\"shareOnFacebook(campaign)\" title=\"Share on facebook\">\n                                <i class=\"fab fa-facebook-square\"></i>\n                            </a>                            \n                        </div>\n\n                        <div class=\"col-md-4 text-right\">\n                            <a href=\"#\" click.delegate=\"shareOnGoogle(campaign)\" title=\"Share on google+\">\n                                <i class=\"fab fa-google-plus-square\"></i>\n                            </a>                            \n                        </div>                        \n                    </div>                     \n\n                    <!-- <form>\n                        <div class=\"form-group\">\n                            <input type=\"text\" class=\"form-control\" id=\"name\" aria-describedby=\"name-help\" placeholder=\"Name\">\n                            <small id=\"email-help\" class=\"form-text text-muted\">We'll never share your name with anyone else.</small>\n                        </div>\n                \n                        <div class=\"form-group\">\n                            <input type=\"email\" class=\"form-control\" id=\"email\" aria-describedby=\"email-help\" placeholder=\"Email address\">\n                            <small id=\"email-help\" class=\"form-text text-muted\">We'll never share your email with anyone else.</small>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input type=\"checkbox\" class=\"form-check-input\" id=\"keep-me-updated\">\n                            <label class=\"form-check-label\" for=\"keep-me-updated\">Keep updated with the campaign?</label>\n                        </div>\n\n                        <div class=\"form-group text-right\">\n                            <button type=\"submit\" class=\"btn btn-primary pull-right\">Join this campaign now</button>\n                        </div>\n                    </form> -->\n                </div>        \n            </div>\n        </div>\n    </div> \n    <div style=\"margin-top:100px;\"></div>\n</template>"; });
define('base-view-model',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var BaseViewModel = exports.BaseViewModel = function () {
        function BaseViewModel(router) {
            _classCallCheck(this, BaseViewModel);

            this.router = router;
        }

        BaseViewModel.prototype.setTitle = function setTitle(title) {
            this.router.currentInstruction.config.title = title;
        };

        BaseViewModel.prototype.setParams = function setParams(params) {
            this.router.currentInstruction.config.params = params;
        };

        return BaseViewModel;
    }();
});
define('app',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-dialog", "aurelia-pal", "aurelia-http-client", "aurelia-router"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaDialog, _aureliaPal, _aureliaHttpClient, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService), _dec(_class = function () {
        function App(eventAggregator, dialogService) {
            _classCallCheck(this, App);

            this.ea = eventAggregator;
            this.dialogService = dialogService;
        }

        App.prototype.activate = function activate() {
            this.ea.subscribe("app:view-job", function (job) {});
        };

        App.prototype.configureRouter = function configureRouter(config, router) {
            config.title = "Distribu";

            config.map([{
                name: "home",
                route: ["", "home", "home-how-it-works"],
                moduleId: _aureliaPal.PLATFORM.moduleName("home/home"),
                title: "Home",
                auth: false,
                includeInBreadcrumbs: true
            }, {
                name: "campaigns",
                route: "campaigns",
                moduleId: _aureliaPal.PLATFORM.moduleName("campaigns/campaigns"),
                title: "Campaigns",
                auth: false,
                includeInBreadcrumbs: true
            }, {
                name: "campaigns",
                route: "campaign/:id",
                moduleId: _aureliaPal.PLATFORM.moduleName("campaigns/campaign"),
                title: "Campaign",
                auth: false,
                includeInBreadcrumbs: true
            }, {
                name: "reports",
                route: "reports",
                moduleId: _aureliaPal.PLATFORM.moduleName("reports/reports"),
                title: "Reports",
                auth: false,
                includeInBreadcrumbs: true
            }]);

            config.addPipelineStep("authorize", AuthorizeStep);

            this.router = router;
        };

        return App;
    }()) || _class);

    var AuthorizeStep = function () {
        function AuthorizeStep() {
            _classCallCheck(this, AuthorizeStep);
        }

        AuthorizeStep.prototype.run = function run(navigationInstruction, next) {
            return new Promise(function (resolve) {
                var client = new _aureliaHttpClient.HttpClient();

                return resolve(next());
            });
        };

        return AuthorizeStep;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"./header/header\"></require>\t\n\t<require from=\"./footer/footer\"></require>\n\t<require from=\"./resources/elements/router-progress-indicator/router-progress-indicator\"></require>\n\t<require from=\"./resources/elements/breadcrumbs/breadcrumbs\"></require>\n\t<require from=\"./resources/elements/request-indicator/request-indicator\"></require>\n\n\t<router-progress-indicator></router-progress-indicator>\n\n\t<header></header>\n\n\t<router-view></router-view>\n\n\t<footer></footer> \n\n\t<request-indicator></request-indicator>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map