define('welcome/welcome',["exports", "aurelia-http-client"], function (exports, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Welcome = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Welcome = exports.Welcome = function () {
        function Welcome() {
            _classCallCheck(this, Welcome);
        }

        Welcome.prototype.activate = function activate() {
            var _this = this;

            var client = new _aureliaHttpClient.HttpClient();

            client.get("/api/has-been-setup").then(function (data) {
                _this.state = JSON.parse(data.response);
            });
        };

        Welcome.prototype.deactivate = function deactivate() {};

        return Welcome;
    }();
});
define('text!welcome/welcome.html', ['module'], function(module) { module.exports = "<template>\n    <h1 class=\"display-4\">Demo-UI Project</h1>\n  \n    <p class=\"lead\">\n        A few things to note before getting started:\n        <ul>\n            <li>Please open a developer account at <a href=\"https://developer.payrun.io/Account/Register\" target=\"_blank\">https://developer.payrun.io/Account/Register</a> </li> and use the keys you are issued.\n            <li>This is demonstration software and is provided without support, warranty or liability.</li>\n            <li>This software is built against the latest browsers (Chrome, Firefox, Safari or MS Edge) and may not function as intended on older browsers.</li>\n            <li>Under no circumstances should you run this software as-is in a production environment. Fork it and make it your own!</li>\n            <li>The application is written in NodeJS and the <a href=\"https://github.com/X-API/PayRunIO.Demo.UI\" target=\"_blank\">source code is available on GitHub</a>.</li>\n            <li>This project has been open-sourced under <a href=\"https://github.com/X-API/PayRunIO.Demo.UI/blob/master/LICENSE\" target=\"_blank\">\"The Unlicense\"</a> license.</li>\n            <li>Finally, this project is <strong>WORK IN PROGRESS</strong>, there are areas of unfinished, missing or broken functionality. If you discover an issue then please either <a href=\"https://github.com/X-API/PayRunIO.Demo.UI/issues\" target=\"_blank\">log it as in issue in GitHub</a> or <a href=\"https://github.com/X-API/PayRunIO.Demo.UI/pulls\" target=\"_blank\">submit a Pull Request</a> with your proposed fix.</li>\n        </ul>\n\n        Get started by clicking on `Get started` below.\n    </p>\n\n    <p class=\"lead\">\n        <a class=\"btn btn-primary btn-lg\" href=\"#employers\" role=\"button\" if.bind=\"state.hasBeenSetup\">Get started</a>\n        <a class=\"btn btn-primary btn-lg\" href=\"#setup\" role=\"button\" if.bind=\"!state.hasBeenSetup\">Get started</a>\n    </p>\n</template>"; });
define('welcome/setup',["exports", "aurelia-framework", "aurelia-http-client", "aurelia-validation", "aurelia-router"], function (exports, _aureliaFramework, _aureliaHttpClient, _aureliaValidation, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Setup = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Setup = exports.Setup = (_dec = (0, _aureliaFramework.inject)(_aureliaValidation.ValidationControllerFactory, _aureliaRouter.Router), _dec(_class = function () {
        function Setup(controllerFactory, router) {
            _classCallCheck(this, Setup);

            this.controller = controllerFactory.createForCurrentScope();
            this.router = router;
            this.client = new _aureliaHttpClient.HttpClient();
        }

        Setup.prototype.activate = function activate() {
            var _this = this;

            this.client.get("/api/setup").then(function (data) {
                _this.state = JSON.parse(data.response);
                _this.environments = ["Test", "Production"];

                _this.setupValidationRules();
            });
        };

        Setup.prototype.setupValidationRules = function setupValidationRules() {
            _aureliaValidation.ValidationRules.ensure("ConsumerSecret").required().withMessage("Consumer Secret is required").ensure("ConsumerKey").required().withMessage("Consumer Key is required").ensure("Environment").required().withMessage("Environment is required").on(this.state);
        };

        Setup.prototype.save = function save() {
            var _this2 = this;

            var data = {
                Environment: this.state.Environment,
                ConsumerKey: this.state.ConsumerKey,
                ConsumerSecret: this.state.ConsumerSecret
            };

            this.controller.validate().then(function (result) {
                if (result.valid) {
                    _this2.client.post("/api/setup", data).then(function () {
                        _this2.router.navigate("employers");
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        return Setup;
    }()) || _class);
});
define('text!welcome/setup.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n\n    <div class=\"setup\">\n        <validation-errors errors.bind=\"controller.errors\"></validation-errors>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"jumbotron\">\n                    <h3>Setup</h3>\n    \n                    <p class=\"lead\">\n                        Before getting started with the API <a href=\"https://developer.payrun.io/Account/Register\" target=\"_blank\">register</a> to retrieve your consumer key and secret.\n                    </p>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <div class=\"form-group\">\n                    <label for=\"Environment\">Environment</label>\n\n                    <select \n                        class=\"form-control\" \n                        id=\"Environment\" \n                        name=\"Environment\" \n                        value.bind=\"state.Environment & validate\">\n                        <option model.bind=\"null\">Please Choose...</option>\n                        <option repeat.for=\"env of environments\" value.bind=\"env\">\n                            ${env}\n                        </option>\n                    </select>\n\n                    <span class=\"notes\">\n                        See <a href=\"https://developer.payrun.io/docs/getting-started/environments.html\" target=\"_blank\">Environments</a> for more information on the available environments. \n                    </span>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"ConsumerKey\">Consumer Key</label>\n                    <input id=\"ConsumerKey\" \n                        name=\"ConsumerKey\" \n                        type=\"text\" \n                        class=\"form-control\" \n                        value.bind=\"state.ConsumerKey & validate\">\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"ConsumerSecret\">Consumer Secret</label>\n                    <input id=\"ConsumerSecret\" \n                        name=\"ConsumerSecret\" \n                        type=\"text\" \n                        class=\"form-control\" \n                        value.bind=\"state.ConsumerSecret & validate\">\n                </div>            \n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12 text-right\">\n                <button type=\"submit\" class=\"btn btn-primary\" click.delegate=\"save()\">Setup and get started</button>\n            </div>\n        </div>\n    </div>    \n</template>"; });
define('rti-transaction/rti-transaction-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RtiTransactionModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var RtiTransactionModal = exports.RtiTransactionModal = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function RtiTransactionModal(dialogController) {
            _classCallCheck(this, RtiTransactionModal);

            this.dialogController = dialogController;
            this.client = new _aureliaHttpClient.HttpClient();
        }

        RtiTransactionModal.prototype.activate = function activate(state) {
            this.state = state;
            this.state.PayRun = state.payRuns[0];
            this.state.LateReason = "";
        };

        RtiTransactionModal.prototype.save = function save() {
            var _this = this;

            var data = {
                Generate: true,
                Transmit: true,
                PayScheduleId: this.state.PayRun.PayScheduleKey,
                PayRunId: this.state.PayRun.PayRunKey,
                HoldingDate: this.state.HoldingDate,
                LateReason: this.state.LateReason
            };

            this.client.post("/api/employer/" + this.state.employerId + "/rtiTransaction", data).then(function (res) {
                var parsedResponse = JSON.parse(res.response);

                _this.apiErrors = null;

                if (parsedResponse.errors) {
                    _this.apiErrors = parsedResponse.errors;
                    return;
                }

                _this.dialogController.ok(parsedResponse.status);
            });
        };

        RtiTransactionModal.prototype.onLateReasonSelected = function onLateReasonSelected(newValue) {
            this.state.LateReason = newValue;
        };

        return RtiTransactionModal;
    }()) || _class);
});
define('text!rti-transaction/rti-transaction-modal.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>FPS Submission</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <form>\n                <div class=\"container-fluid\">\n                    <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n                    <div class=\"row\">\n                        <div class=\"col-sm-12 col-md-12\">\n                            <div class=\"form-group\">\n                                <label for=\"PaySchedule\">Submission For:</label>\n                \n                                <select class=\"form-control\" \n                                    id=\"PayRun\" \n                                    name=\"PayRun\" \n                                    value.bind=\"state.PayRun\">\n                                        <option repeat.for=\"pr of state.payRuns\" model.bind=\"pr\">${pr.PaySchedule} > ${pr.PaymentDate}</option>\n                                </select>\n                            </div>\n                \n                            <div class=\"form-group\">\n                                <label for=\"HoldingDate\">Holding date</label>\n                                <input type=\"date\" \n                                    class=\"form-control\" \n                                    id=\"HoldingDate\" \n                                    name=\"HoldingDate\" \n                                    value.bind=\"state.HoldingDate\" \n                                    placeholder=\"Holding date\">\n                \n                                <span class=\"notes\">Optional date, used to defer execution of the job until a future point in time.</span>\n                            </div>\n                \n                            <div class=\"form-group\">\n                                <label for=\"LateReason\">Late reason</label>\n                                \n                                <select class=\"form-control\" id=\"LateReason\" name=\"LateReason\" change.delegate=\"onLateReasonSelected($event.target.value)\">\n                                    <option>N/A - Not Late</option>\n                                    <option value=\"A\">Notional payment: Payment to Expat by third party or overseas employer</option>\n                                    <option value=\"B\">Notional payment: Employment related security</option>\n                                    <option value=\"C\">Notional payment: Other</option>\n                                    <option value=\"D\">Payment subject to Class 1 NICs but P11D/P9D for tax</option>\n                                    <option value=\"F\">No requirement to maintain a Deductions Working Sheet or Impractical to report work done on the day</option>\n                                    <option value=\"G\">Reasonable excuse</option>\n                                    <option value=\"H\">Correction to earlier submission</option>\n                                </select>\n                \n                                <span class=\"notes\">If applicable, the reason given for a late submission.</span>\n                            </div>\n                        </div>        \n                    </div>\n                </div>\n            </form>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 text-left\">\n                        <button class=\"btn btn-secondary\" click.trigger=\"dialogController.cancel()\">Cancel</button>\n                    </div>\n                    <div class=\"col-sm-6 text-right\">\n                        <button class=\"btn btn-primary\" click.trigger=\"save()\">Start</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>\n</template>    "; });
define('resources/value-converters/short-date',["exports", "moment"], function (exports, moment) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ShortDateValueConverter = exports.ShortDateValueConverter = function () {
        function ShortDateValueConverter() {
            _classCallCheck(this, ShortDateValueConverter);
        }

        ShortDateValueConverter.prototype.toView = function toView(value) {
            if (value) {
                return moment(value).format("YYYY-MM-DD");
            }

            return "";
        };

        return ShortDateValueConverter;
    }();
});
define('resources/value-converters/long-date-time',["exports", "moment"], function (exports, moment) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var LongDateTimeValueConverter = exports.LongDateTimeValueConverter = function () {
        function LongDateTimeValueConverter() {
            _classCallCheck(this, LongDateTimeValueConverter);
        }

        LongDateTimeValueConverter.prototype.toView = function toView(value) {
            if (value) {
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
            }

            return "";
        };

        return LongDateTimeValueConverter;
    }();
});
define('resources/value-converters/format-salary',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var FormatSalaryValueConverter = exports.FormatSalaryValueConverter = function () {
        function FormatSalaryValueConverter() {
            _classCallCheck(this, FormatSalaryValueConverter);
        }

        FormatSalaryValueConverter.prototype.toView = function toView(obj) {
            if (obj) {
                return parseFloat(obj).toFixed(2);
            }

            return "";
        };

        return FormatSalaryValueConverter;
    }();
});
define('resources/value-converters/extract-id-from-link',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ExtractIdFromLinkValueConverter = exports.ExtractIdFromLinkValueConverter = function () {
        function ExtractIdFromLinkValueConverter() {
            _classCallCheck(this, ExtractIdFromLinkValueConverter);
        }

        ExtractIdFromLinkValueConverter.prototype.toView = function toView(obj) {
            var href = obj["@href"];
            var parts = href.split("/");

            return parts[parts.length - 1];
        };

        return ExtractIdFromLinkValueConverter;
    }();
});
define('resources/value-converters/extract-href',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ExtractHrefValueConverter = exports.ExtractHrefValueConverter = function () {
        function ExtractHrefValueConverter() {
            _classCallCheck(this, ExtractHrefValueConverter);
        }

        ExtractHrefValueConverter.prototype.toView = function toView(obj) {
            return obj["@href"];
        };

        return ExtractHrefValueConverter;
    }();
});
define('resources/value-converters/employee-name',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var EmployeeNameValueConverter = exports.EmployeeNameValueConverter = function () {
        function EmployeeNameValueConverter() {
            _classCallCheck(this, EmployeeNameValueConverter);
        }

        EmployeeNameValueConverter.prototype.toView = function toView(employee) {
            var firstname = employee.FirstName || employee.Initials;

            var parts = [employee.Title, firstname, employee.LastName].filter(function (part) {
                return part !== undefined && part !== null && part.trim().length > 0;
            });

            return parts.join(" ");
        };

        return EmployeeNameValueConverter;
    }();
});
define('resources/value-converters/bank-account',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var BankAccountValueConverter = exports.BankAccountValueConverter = function () {
        function BankAccountValueConverter() {
            _classCallCheck(this, BankAccountValueConverter);
        }

        BankAccountValueConverter.prototype.toView = function toView(account) {
            if (account) {
                var parts = [account.AccountName, account.AccountNumber, account.SortCode].filter(function (part) {
                    return part !== null && part !== undefined && part.trim().length > 0;
                });

                return parts.join("<br />");
            }

            return "";
        };

        return BankAccountValueConverter;
    }();
});
define('resources/value-converters/address',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var AddressValueConverter = exports.AddressValueConverter = function () {
        function AddressValueConverter() {
            _classCallCheck(this, AddressValueConverter);
        }

        AddressValueConverter.prototype.toView = function toView(address) {
            if (address) {
                var parts = [address.Address1, address.Address2, address.Address3, address.Address4, address.Country, address.Postcode].filter(function (part) {
                    return part !== null && part !== undefined && part.trim().length > 0;
                });

                return parts.join("<br />");
            }

            return "";
        };

        return AddressValueConverter;
    }();
});
define('resources/index',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.configure = configure;
    function configure(config) {
        config.globalResources(["./value-converters/address", "./value-converters/bank-account", "./value-converters/employee-name", "./value-converters/extract-href", "./value-converters/extract-id-from-link", "./value-converters/format-salary", "./value-converters/long-date-time", "./value-converters/short-date"]);
    }
});
define('resources/elements/validation-errors/validation-errors',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ValidationErrors = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var ValidationErrors = exports.ValidationErrors = (_dec = (0, _aureliaFramework.customElement)("validation-errors"), _dec(_class = (_class2 = function () {
        function ValidationErrors() {
            _classCallCheck(this, ValidationErrors);

            _initDefineProp(this, "errors", _descriptor, this);
        }

        ValidationErrors.prototype.errorsChanged = function errorsChanged() {
            if (this.errors && this.errors.length > 0) {
                $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                    scrollTop: 0
                }, 500);
            }
        };

        return ValidationErrors;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "errors", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('text!resources/elements/validation-errors/validation-errors.html', ['module'], function(module) { module.exports = "<template>\n    <div id=\"validation-errors-container\">\n        <div class=\"alert alert-danger\" role=\"alert\" if.bind=\"errors.length > 0\">\n            <p>\n                <strong>\n                    Please fix the below errors:\n                </strong>\n            </p>\n        \n            <ul>\n                <li repeat.for=\"error of errors\">\n                    ${error.message}\n                </li>\n            </ul>\n        </div>\n    </div>\n</template>"; });
define('resources/elements/status/status',["exports", "aurelia-framework", "aurelia-event-aggregator"], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Status = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var Status = exports.Status = (_dec = (0, _aureliaFramework.customElement)("status"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = (_class2 = function () {
        function Status(eventAggregator) {
            _classCallCheck(this, Status);

            _initDefineProp(this, "status", _descriptor, this);

            this.ea = eventAggregator;
        }

        Status.prototype.viewJob = function viewJob() {
            this.ea.publish("app:view-job", this.status.job);
        };

        Status.prototype.statusChanged = function statusChanged() {
            if (this.status) {
                $("#status").fadeIn();

                $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                    scrollTop: 0
                }, 500);
            }
        };

        return Status;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "status", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class);
});
define('text!resources/elements/status/status.html', ['module'], function(module) { module.exports = "<template>\n    <div id=\"status\">\n        <div class=\"status alert alert-${status.type} alert-dismissible fade show\" role=\"alert\" if.bind=\"status\">\n            <span>${status.message}</span>\n\n            <button type=\"button\" class=\"btn btn-sm btn-outline-secondary\" if.bind=\"status.job\" click.delegate=\"viewJob()\">View job</button>\n        \n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n        </div>\n    </div>\n</template>"; });
define('resources/elements/rule-exclusions/rule-exclusions',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RuleExclusions = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var RuleExclusions = exports.RuleExclusions = (_dec = (0, _aureliaFramework.customElement)("rule-exclusions"), _dec(_class = (_class2 = function RuleExclusions() {
        _classCallCheck(this, RuleExclusions);

        _initDefineProp(this, "ruleexclusions", _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ruleexclusions", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('text!resources/elements/rule-exclusions/rule-exclusions.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"form-group\">\n        <label for=\"RuleExclusions\">Rule Exclusions</label>\n    \n        <select class=\"form-control\" \n            id=\"RuleExclusions\" \n            name=\"RuleExclusions\" \n            multiple \n            value.bind=\"ruleexclusions\" \n            style=\"height:180px;\">\n            <option value=\"NiMissingPayInstructionRule\">NiMissingPayInstructionRule</option>\n            <option value=\"TaxMissingPayInstructionRule\">TaxMissingPayInstructionRule</option>\n            <option value=\"TaxCodeUpliftRule\">TaxCodeUpliftRule</option>\n            <option value=\"NiSetExpectedLetterRule\">NiSetExpectedLetterRule</option>\n            <option value=\"NiDateOfBirthChangeRetrospectiveCRule\">NiDateOfBirthChangeRetrospectiveCRule</option>\n            <option value=\"NiDefermentStatusChangeRule\">NiDefermentStatusChangeRule</option>\n            <option value=\"NiEndContractedOutTransferRule\">NiEndContractedOutTransferRule</option>\n            <option value=\"PaymentAfterLeavingRule\">PaymentAfterLeavingRule</option>\n            <option value=\"LeaverEndInstructionsRule\">LeaverEndInstructionsRule</option>\n            <option value=\"P45StudentLoanInstructionRule\">P45StudentLoanInstructionRule</option>\n            <option value=\"P45TaxInstructionRule\">P45TaxInstructionRule</option>\n            <option value=\"P45YtdTaxRule\">P45YtdTaxRule</option>\n            <option value=\"YtdInstructionRule\">YtdInstructionRule</option>\n            <option value=\"TaxCodeRegionChangeRule\">TaxCodeRegionChangeRule</option>\n        </select>\n    \n        <span class=\"notes\">\n            The list of pre-claculation rules to exclude by default for all employees. \n            See <a href=\"http://developer.payrun.io/docs/key-concepts/pre-calculation-rules.html\" target=\"_blank\">Pre-calculation rules</a> for more information on how they work.\n        </span>\n    </div>    \n</template>"; });
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
define('resources/elements/pay-schedule-dropdown/pay-schedule-dropdown',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PayScheduleDropdown = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var PayScheduleDropdown = exports.PayScheduleDropdown = (_dec = (0, _aureliaFramework.customElement)("pay-schedule-dropdown"), _dec(_class = (_class2 = function PayScheduleDropdown() {
        _classCallCheck(this, PayScheduleDropdown);

        _initDefineProp(this, "payschedule", _descriptor, this);

        _initDefineProp(this, "payschedules", _descriptor2, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "payschedule", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "payschedules", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('text!resources/elements/pay-schedule-dropdown/pay-schedule-dropdown.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"form-group\">\n        <label for=\"PaySchedule\">Pay Schedule</label>\n    \n        <select class=\"form-control\" id=\"PaySchedule\" name=\"PaySchedule\" value.bind=\"payschedule\">\n            <option value=\"\">Not set</option>\n            <option repeat.for=\"ps of payschedules\" value.bind=\"ps.Key\">\n                ${ps.Name}\n            </option>\n        </select>\n    </div>    \n</template>"; });
define('resources/elements/coming-soon/coming-soon',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ComingSoon = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ComingSoon = exports.ComingSoon = (_dec = (0, _aureliaFramework.customElement)("coming-soon"), _dec(_class = function ComingSoon() {
    _classCallCheck(this, ComingSoon);
  }) || _class);
});
define('text!resources/elements/coming-soon/coming-soon.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"coming-soon\">\n        <h4>Coming soon!</h4>\n    \n        <p>Check soon to see this functionality wired up with the API</p>\n    </div>\n</template>"; });
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
define('resources/elements/bank-account-form/bank-account-form',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BankAccountForm = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var BankAccountForm = exports.BankAccountForm = (_dec = (0, _aureliaFramework.customElement)("bank-account-form"), _dec(_class = (_class2 = function BankAccountForm() {
        _classCallCheck(this, BankAccountForm);

        _initDefineProp(this, "bankaccount", _descriptor, this);
    }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bankaccount", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('text!resources/elements/bank-account-form/bank-account-form.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"form-group\">\n        <label for=\"AccountName\">Account name</label>\n\n        <input type=\"text\" \n            class=\"form-control\" \n            id=\"AccountName\" \n            name=\"BankAccount[AccountName]\" \n            value.bind=\"bankaccount.AccountName\"\n            placeholder=\"Bank account name\" \n            maxlength=\"18\">\n    </div>\n\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-8\">\n            <div class=\"form-group\">\n                <label for=\"AccountNumber\">Account number</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AccountNumber\" \n                    name=\"BankAccount[AccountNumber]\" \n                    value.bind=\"bankaccount.AccountNumber\"\n                    placeholder=\"Bank account number\" \n                    step=\"1\" \n                    maxlength=\"8\" \n                    minlength=\"7\">\n            </div>\n        </div>\n        <div class=\"col-sm-12 col-md-4\">\n            <div class=\"form-group\">\n                <label for=\"SortCode\">Sort code</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"SortCode\" \n                    name=\"BankAccount[SortCode]\" \n                    value.bind=\"bankaccount.SortCode\"\n                    placeholder=\"Bank sort code\" \n                    maxlength=\"8\">\n            </div>\n        </div>\n    </div>\n</template>"; });
define('resources/elements/api-errors/api-errors',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ApiErrors = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var ApiErrors = exports.ApiErrors = (_dec = (0, _aureliaFramework.customElement)("api-errors"), _dec(_class = (_class2 = function () {
        function ApiErrors() {
            _classCallCheck(this, ApiErrors);

            _initDefineProp(this, "errors", _descriptor, this);
        }

        ApiErrors.prototype.errorsChanged = function errorsChanged() {
            if (this.errors) {
                $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                    scrollTop: 0
                }, 500);
            }
        };

        return ApiErrors;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "errors", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('text!resources/elements/api-errors/api-errors.html', ['module'], function(module) { module.exports = "<template>\n    <div id=\"api-errors\">\n        <div class=\"alert alert-warning\" role=\"alert\" if.bind=\"errors.length > 0\">\n            <p>\n                <strong>\n                    The PayRun api has returned the following errors:\n                </strong>\n            </p>\n        \n            <ul>\n                <li repeat.for=\"error of errors\">\n                    ${error}\n                </li>\n            </ul>\n        </div>\n    </div>\n</template>"; });
define('resources/elements/address-form/address-form',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AddressForm = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var AddressForm = exports.AddressForm = (_dec = (0, _aureliaFramework.customElement)("address-form"), _dec(_class = (_class2 = function () {
        function AddressForm() {
            _classCallCheck(this, AddressForm);

            _initDefineProp(this, "address", _descriptor, this);
        }

        AddressForm.prototype.addressChanged = function addressChanged() {
            if (!this.address) {
                this.address = {};
            }

            if (!this.address.Country) {
                this.address.Country = "United Kingdom";
            }
        };

        return AddressForm;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "address", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('text!resources/elements/address-form/address-form.html', ['module'], function(module) { module.exports = "<template>\n    <h4>Address</h4>\n\n    <div class=\"form-group\">\n        <label for=\"Address1\">Address 1</label>\n    \n        <input type=\"text\" \n            class=\"form-control\" \n            id=\"Address1\" \n            name=\"Address[Address1]\" \n            value.bind=\"address.Address1\" \n            placeholder=\"First line of the address\" \n            required \n            data-required-message=\"Address 1 is required\">\n    </div>\n    \n    <div class=\"form-group\">\n        <label for=\"Address2\">Address 2</label>\n    \n        <input type=\"text\" \n            class=\"form-control\" \n            id=\"Address2\" \n            name=\"Address[Address2]\"\n            value.bind=\"address.Address2\" \n            placeholder=\"Second line of the address\" \n            required \n            data-required-message=\"Address 2 is required\">\n    </div> \n    \n    <div class=\"form-group\">\n        <label for=\"Address3\">Address 3</label>\n    \n        <input type=\"text\" \n            class=\"form-control\" \n            id=\"Address3\" \n            name=\"Address[Address3]\" \n            value.bind=\"address.Address3\" \n            placeholder=\"Third line of the address\">\n    </div>\n    \n    <div class=\"form-group\">\n        <label for=\"Address4\">Address 4</label>\n    \n        <input type=\"text\" \n            class=\"form-control\" \n            id=\"Address4\" \n            name=\"Address[Address4]\" \n            value.bind=\"address.Address4\" \n            placeholder=\"Fourth line of the address\">\n    </div>\n    \n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-4\">\n            <div class=\"form-group\">\n                <label for=\"Postcode\">Postcode</label>\n    \n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Postcode\" \n                    name=\"Address[Postcode]\" \n                    value.bind=\"address.Postcode\" \n                    placeholder=\"Postcode\">\n            </div>\n        </div>\n        <div class=\"col-sm-12 col-md-8\">\n            <div class=\"form-group\">\n                <label for=\"Country\">Country</label>\n    \n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Country\" \n                    name=\"Address[Country]\" \n                    value.bind=\"address.Country\" \n                    placeholder=\"Country\">\n            </div>\n        </div>\n    </div>        \n</template>"; });
define('pension/pension-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-validation", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaValidation, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PensionModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PensionModal = exports.PensionModal = (_dec = (0, _aureliaFramework.inject)(_aureliaValidation.ValidationControllerFactory, _aureliaDialog.DialogController), _dec(_class = function () {
        function PensionModal(controllerFactory, dialogController) {
            _classCallCheck(this, PensionModal);

            this.dialogController = dialogController;
            this.validationController = controllerFactory.createForCurrentScope();
            this.client = new _aureliaHttpClient.HttpClient();
        }

        PensionModal.prototype.activate = function activate(state) {
            this.state = state;

            this.proRataMethods = [{ value: "NotSet", text: "Not set" }, { value: "Annual260Days", text: "Annual 260 days" }, { value: "Annual365Days", text: "Annual 365 days" }, { value: "AnnualQualifyingDays", text: "Annual qualifying days" }, { value: "DaysPerCalenderMonth", text: "Days per calender month" }, { value: "DaysPerTaxPeriod", text: "Days per tax period" }];

            this.taxationMethods = [{ value: "NotSet", text: "Not set" }, { value: "NetBased", text: "Net based" }, { value: "ReliefAtSource", text: "Relief at source" }];

            this.setupValidationRules();
        };

        PensionModal.prototype.setupValidationRules = function setupValidationRules() {
            _aureliaValidation.ValidationRules.ensure("SchemeName").required().withMessage("Scheme name is required").ensure("ProviderName").required().withMessage("Provider name is required").ensure("ProviderEmployerRef").required().withMessage("Provider employer ref is required").ensure("EffectiveDate").required().withMessage("Effective date is required").on(this.state);
        };

        PensionModal.prototype.save = function save() {
            var _this = this;

            this.validationController.validate().then(function (result) {
                if (result.valid) {
                    _this.client.post("/api/employer/" + _this.state.employerId + "/pension", _this.state).then(function (res) {
                        var parsedResponse = JSON.parse(res.response);

                        _this.apiErrors = null;

                        if (parsedResponse.errors) {
                            _this.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this.dialogController.ok(parsedResponse.status);
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        return PensionModal;
    }()) || _class);
});
define('text!pension/pension-modal.html', ['module'], function(module) { module.exports = "<template>\n        <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n        <require from=\"../resources/elements/api-errors/api-errors\"></require>\n    \n        <ux-dialog>\n            <ux-dialog-header>\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <h5>Pension</h5>\n                        </div>\n                    </div>\n                </div>\n            </ux-dialog-header>\n            <ux-dialog-body>\n                <div class=\"pension-modal-container\">\n                    <div class=\"container-fluid\">\n                        <form>\n                            <validation-errors errors.bind=\"validationController.errors\"></validation-errors>\n            \n                            <api-errors errors.bind=\"apiErrors\"></api-errors>\n            \n                            <ul class=\"nav nav-pills nav-fill\" id=\"subTab\" role=\"tablist\">\n                                <li class=\"nav-item\">\n                                    <a class=\"nav-link active\" id=\"details-tab\" data-toggle=\"tab\" href=\"#details\" role=\"tab\" aria-controls=\"details\" aria-selected=\"true\">Details</a>\n                                </li>\n                                <li class=\"nav-item\">\n                                    <a class=\"nav-link\" id=\"advanced-tab\" data-toggle=\"tab\" href=\"#advanced\" role=\"tab\" aria-controls=\"advanced\" aria-selected=\"false\">Advanced</a>\n                                </li>\n                            </ul>\n\n                            <div class=\"tab-content\" id=\"mySubTabContent\">\n                                <div class=\"tab-pane fade show active\" id=\"details\" role=\"tabpanel\" aria-labelledby=\"details-tab\">\n                                    <div class=\"row\">\n                                        <div class=\"col-sm-12 col-md-6\">\n                                            <div class=\"form-group\">\n                                                <label for=\"Code\">Code</label>\n                                                <input type=\"text\" \n                                                    class=\"form-control\" \n                                                    id=\"Code\" \n                                                    name=\"Code\" \n                                                    value.bind=\"state.Code\" \n                                                    placeholder=\"Code\"\n                                                    maxlength=\"35\">\n                    \n                                                <span class=\"notes\">Allows an override of the default pay code used by the pension scheme.</span>\n                                            </div>\n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"SchemeName\">Scheme Name</label>\n                                                <input type=\"text\" \n                                                    class=\"form-control\" \n                                                    id=\"SchemeName\" \n                                                    name=\"SchemeName\" \n                                                    value.bind=\"state.SchemeName & validate\" \n                                                    placeholder=\"Scheme name\"\n                                                    maxlength=\"250\">\n                                            </div>\n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"ProviderName\">Provider name</label>\n                                                <input type=\"text\" \n                                                    class=\"form-control\" \n                                                    id=\"ProviderName\" \n                                                    name=\"ProviderName\" \n                                                    value.bind=\"state.ProviderName & validate\" \n                                                    placeholder=\"Provider name\"\n                                                    maxlength=\"250\">\n                                            </div>\n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"ProviderEmployerRef\">Provider employer ref</label>\n                                                <input type=\"text\" \n                                                    class=\"form-control\" \n                                                    id=\"ProviderEmployerRef\" \n                                                    name=\"ProviderEmployerRef\" \n                                                    value.bind=\"state.ProviderEmployerRef & validate\" \n                                                    placeholder=\"Reference issued by the pension provider\"\n                                                    maxlength=\"100\">\n                                            </div>  \n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"Group\">Group</label>\n                                                <input type=\"text\" \n                                                    class=\"form-control\" \n                                                    id=\"Group\" \n                                                    name=\"Group\" \n                                                    value.bind=\"state.Group\" \n                                                    placeholder=\"Group name within the pension scheme\"\n                                                    maxlength=\"100\">\n                                            </div>\n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"SubGroup\">Sub group</label>\n                                                <input type=\"text\" \n                                                    class=\"form-control\" \n                                                    id=\"SubGroup\" \n                                                    name=\"SubGroup\" \n                                                    value.bind=\"state.SubGroup\" \n                                                    placeholder=\"Sub-group name within the pension scheme\"\n                                                    maxlength=\"100\">\n                                            </div>   \n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"EmployeeContributionCash\">Employee contribution cash</label>\n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"EmployeeContributionCash\" \n                                                    name=\"EmployeeContributionCash\" \n                                                    value.bind=\"state.EmployeeContributionCash\" \n                                                    placeholder=\"Employee's gross cash contribution\"\n                                                    step=\"0.01\">\n                                            </div>  \n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"EmployeeContributionCash\">Employer contribution cash</label>\n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"EmployerContributionCash\" \n                                                    name=\"EmployerContributionCash\" \n                                                    value.bind=\"state.EmployerContributionCash\" \n                                                    placeholder=\"Employer's gross cash contribution\"\n                                                    step=\"0.01\">\n                                            </div>  \n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"EmployeeContributionPercent\">Employee contribution %</label>\n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"EmployeeContributionPercent\" \n                                                    name=\"EmployeeContributionPercent\" \n                                                    value.bind=\"state.EmployeeContributionPercent\" \n                                                    placeholder=\"Employee's percentage contribution from their pensionable pay\"\n                                                    step=\"0.01\" \n                                                    min=\"0\" \n                                                    max=\"1\">\n                    \n                                                <span class=\"notes\">A decimal fraction between 0 and 1. Represents a percentage as a fraction of the number 1.</span>\n                                            </div> \n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"EmployerContributionPercent\">Employer contribution %</label>\n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"EmployerContributionPercent\" \n                                                    name=\"EmployerContributionPercent\" \n                                                    value.bind=\"state.EmployerContributionPercent\" \n                                                    placeholder=\"Employer's percentage contribution from their pensionable pay\"\n                                                    step=\"0.01\" \n                                                    min=\"0\" \n                                                    max=\"1\">\n                    \n                                                <span class=\"notes\">A decimal fraction between 0 and 1. Represents a percentage as a fraction of the number 1.</span>\n                                            </div>                                                                                                                                                                                       \n                                        </div>\n                    \n                                        <div class=\"col-sm-12 col-md-6\">\n                                            <div class=\"form-group\">\n                                                <label for=\"LowerThreshold\">Lower threshold</label>\n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"LowerThreshold\" \n                                                    name=\"LowerThreshold\" \n                                                    value.bind=\"state.LowerThreshold\" \n                                                    placeholder=\"Lower threshold\"\n                                                    step=\"0.01\">\n                    \n                                                <span class=\"notes\">\n                                                    The lower earning threshold; only pensionable pay above this value will be included for calculating contributions. \n                                                    Thresholds are predominantly used for triggering Auto Enrolment contributions; see <a href=\"http://developer.payrun.io/docs/payroll-help/auto-enrolment.html\" target=\"_blank\">Auto Enrolment</a> for more information.\n                                                </span>\n                                            </div> \n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"UpperThreshold\">Upper threshold</label>\n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"UpperThreshold\" \n                                                    name=\"UpperThreshold\" \n                                                    value.bind=\"state.UpperThreshold\" \n                                                    placeholder=\"Upper threshold\"\n                                                    step=\"0.01\">\n                    \n                                                <span class=\"notes\">\n                                                    The upper earning threshold; only pensionable pay above this value will be included for calculating contributions. \n                                                    Thresholds are predominantly used for triggering Auto Enrolment contributions; see <a href=\"http://developer.payrun.io/docs/payroll-help/auto-enrolment.html\" target=\"_blank\">Auto Enrolment</a> for more information.\n                                                </span>\n                                            </div> \n                    \n                                            <div class=\"form-group\">\n                                                <label for=\"TaxationMethod\">Taxation method</label>\n                    \n                                                <select class=\"form-control\" \n                                                    id=\"TaxationMethod\" \n                                                    name=\"TaxationMethod\"\n                                                    value.bind=\"state.TaxationMethod & validate\">\n                                                    <option repeat.for=\"method of taxationMethods\" value.bind=\"method.value\">\n                                                        ${method.text}\n                                                    </option>\n                                                </select>\n                    \n                                                <span class=\"notes\">\n                                                    The taxation method to use when calculating pension contributions; this should be mandated by your pension provider.\n                                                </span>\n                                            </div>  \n                        \n                                            <div class=\"form-group\">\n                                                <label for=\"ContributionDeductionDay\">Contribution deduction day</label>\n                    \n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"ContributionDeductionDay\" \n                                                    name=\"ContributionDeductionDay\" \n                                                    value.bind=\"state.ContributionDeductionDay\" \n                                                    placeholder=\"The normal day of the month when contributions will be deducted\" \n                                                    min=\"1\" \n                                                    max=\"31\">\n                                            </div>\n                    \n                                            <div class=\"form-check\">\n                                                <input class=\"form-check-input\" type=\"checkbox\" id=\"SalarySacrifice\" name=\"SalarySacrifice\" checked.bind=\"state.SalarySacrifice\">\n                    \n                                                <label class=\"form-check-label\" for=\"SalarySacrifice\">\n                                                    Salary sacrifice?\n                                                </label>\n                    \n                                                <span class=\"notes\">\n                                                    The salary sacrifice option. Used to indicate if the pension scheme employee contributions should make use of salary sacrifice.\n                                                </span>\n                                            </div>\n                                            \n                                            <div class=\"form-group\">\n                                                <label for=\"ProRataMethod\">Pro-Rata method</label>\n                    \n                                                <select class=\"form-control\" \n                                                    id=\"ProRataMethod\" \n                                                    name=\"ProRataMethod\" \n                                                    value.bind=\"state.ProRataMethod & validate\">\n                                                    <option repeat.for=\"method of proRataMethods\" value.bind=\"method.value\">\n                                                        ${method.text}\n                                                    </option>\n                                                </select>\n                    \n                                                <span class=\"notes\">\n                                                    The pro-rata method option to be used; the default is not set. \n                                                    See <a href=\"http://developer.payrun.io/docs/payroll-help/prorata-calculation-methods.html\" target=\"_blank\">Pro-rata Calculation Methods</a> for more information.\n                                                </span>\n                                            </div> \n                    \n                                            <div class=\"form-check\">\n                                                <input class=\"form-check-input\" \n                                                    type=\"checkbox\" \n                                                    id=\"AECompatible\" \n                                                    name=\"AECompatible\" \n                                                    checked.bind=\"state.AECompatible\">\n                    \n                                                <label class=\"form-check-label\" for=\"AECompatible\">\n                                                    AE compatible?\n                                                </label>\n                    \n                                                <span class=\"notes\">\n                                                    The Auto Enrolment compatibility indicator. Used to indicate if this pension scheme is compatible with auto enrolment requirements.\n                                                </span>\n                                            </div>\n                    \n                                            <div class=\"form-check\">\n                                                <input class=\"form-check-input\" \n                                                    type=\"checkbox\" \n                                                    id=\"UseAEThresholds\" \n                                                    name=\"UseAEThresholds\" \n                                                    checked.bind=\"state.UseAEThresholds\">\n                    \n                                                <label class=\"form-check-label\" for=\"UseAEThresholds\">\n                                                    Use AE thresholds?\n                                                </label>\n                    \n                                                <span class=\"notes\">\n                                                    The Use Auto Enrolment Thresholds indicator. Used to indicate if this pension scheme uses the auto enrolment thresholds.\n                                                </span>\n                                            </div>                                                                      \n                                        </div>\n                                    </div>\n                    \n                                </div>\n                    \n                                <div class=\"tab-pane fade\" id=\"advanced\" role=\"tabpanel\" aria-labelledby=\"advanced-tab\">\n                                    <div class=\"row\">\n                                        <div class=\"col-sm-12 col-md-6\">\n                                            <div class=\"form-group\">\n                                                <label for=\"Revision\">Revision</label>\n                                                <input type=\"number\" \n                                                    class=\"form-control\" \n                                                    id=\"Revision\" \n                                                    name=\"Revision\" \n                                                    value.bind=\"state.Revision\" \n                                                    placeholder=\"Revision number\"\n                                                    readonly \n                                                    step=\"1\" \n                                                    min=\"0\">\n                                            </div>\n                                        </div>\n                    \n                                        <div class=\"col-sm-12 col-md-6\">\n                                            <div class=\"form-group\">\n                                                <label for=\"EffectiveDate\">Effective date</label>\n                                                <input type=\"date\" \n                                                    class=\"form-control\" \n                                                    id=\"EffectiveDate\" \n                                                    name=\"EffectiveDate\" \n                                                    value.bind=\"state.EffectiveDate & validate\"\n                                                    placeholder=\"Date the revision will come into effect\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </ux-dialog-body>\n    \n            <ux-dialog-footer>\n                <div class=\"container-fluid\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-6 text-left\">\n                            <button class=\"btn btn-secondary\" click.trigger=\"dialogController.cancel()\">Cancel</button>\n                        </div>\n                        <div class=\"col-sm-6 text-right\">\n                            <button class=\"btn btn-primary\" click.trigger=\"save()\">Save</button>\n                        </div>\n                    </div>\n                </div>\n            </ux-dialog-footer>\n        </ux-dialog>\n    </template>"; });
define('pay-schedule/pay-schedule-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-validation", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaValidation, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PayScheduleModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PayScheduleModal = exports.PayScheduleModal = (_dec = (0, _aureliaFramework.inject)(_aureliaValidation.ValidationControllerFactory, _aureliaDialog.DialogController), _dec(_class = function () {
        function PayScheduleModal(controllerFactory, dialogController) {
            _classCallCheck(this, PayScheduleModal);

            this.dialogController = dialogController;
            this.validationController = controllerFactory.createForCurrentScope();
            this.client = new _aureliaHttpClient.HttpClient();
        }

        PayScheduleModal.prototype.activate = function activate(state) {
            this.state = state;
            this.frequencies = [{ text: "Weekly", value: "Weekly" }, { text: "Monthly", value: "Monthly" }, { text: "Two weekly", value: "TwoWeekly" }, { text: "Four weekly", value: "FourWeekly" }];

            this.setupValidationRules();
        };

        PayScheduleModal.prototype.setupValidationRules = function setupValidationRules() {
            _aureliaValidation.ValidationRules.ensure("Name").required().withMessage("Name is required").ensure("PayFrequency").required().withMessage("Pay Frequency is required").on(this.state);
        };

        PayScheduleModal.prototype.save = function save() {
            var _this = this;

            var data = {
                Id: this.state.Key,
                Name: this.state.Name,
                PayFrequency: this.state.PayFrequency
            };

            this.validationController.validate().then(function (result) {
                if (result.valid) {
                    _this.client.post("/api/employer/" + _this.state.employerId + "/paySchedule", data).then(function (res) {
                        var parsedResponse = JSON.parse(res.response);

                        _this.apiErrors = null;

                        if (parsedResponse.errors) {
                            _this.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this.dialogController.ok(parsedResponse.status);
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        return PayScheduleModal;
    }()) || _class);
});
define('text!pay-schedule/pay-schedule-modal.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>Pay schedule</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <div class=\"container-fluid\">\n                <validation-errors errors.bind=\"validationController.errors\"></validation-errors>\n\n                <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"form-group\">\n                            <label for=\"Name\">Name</label>\n                            <input type=\"text\" \n                                class=\"form-control form-control-lg\" \n                                id=\"Name\" \n                                name=\"Name\" \n                                value.bind=\"state.Name & validate\" \n                                placeholder=\"Name of the pay schedule that unique identifies it\" \n                                maxlength=\"35\">\n                        </div>\n                    \n                        <div class=\"form-group\">\n                            <label for=\"PayFrequency\">Pay Frequency</label>\n                    \n                            <select id=\"PayFrequency\" \n                                name=\"PayFrequency\" \n                                class=\"form-control form-control-lg\" \n                                value.bind=\"state.PayFrequency & validate\">\n                                <option model.bind=\"null\">Please Choose...</option>\n                                <option repeat.for=\"freq of frequencies\" value.bind=\"freq.value\">\n                                    ${freq.text}\n                                </option>\n                            </select>\n                        </div>                        \n                    </div>\n                </div>\n            </div>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 text-left\">\n                        <button class=\"btn btn-secondary\" click.trigger=\"dialogController.cancel()\">Cancel</button>\n                    </div>\n                    <div class=\"col-sm-6 text-right\">\n                        <button class=\"btn btn-primary\" click.trigger=\"save()\">Save</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>\n</template>    "; });
define('pay-run/new-pay-run-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-validation", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaValidation, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NewPayRunModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var NewPayRunModal = exports.NewPayRunModal = (_dec = (0, _aureliaFramework.inject)(_aureliaValidation.ValidationControllerFactory, _aureliaDialog.DialogController), _dec(_class = function () {
        function NewPayRunModal(controllerFactory, dialogController) {
            _classCallCheck(this, NewPayRunModal);

            this.dialogController = dialogController;
            this.validationController = controllerFactory.createForCurrentScope();
            this.client = new _aureliaHttpClient.HttpClient();
        }

        NewPayRunModal.prototype.activate = function activate(state) {
            this.state = state;

            this.setupValidationRules();
        };

        NewPayRunModal.prototype.setupValidationRules = function setupValidationRules() {
            _aureliaValidation.ValidationRules.ensure("PayScheduleId").required().withMessage("Pay Schedule is required").ensure("PaymentDate").required().withMessage("Payment Date is required").ensure("StartDate").required().withMessage("Pay Period Start is required").ensure("EndDate").required().withMessage("Pay Period End is required").on(this.state);
        };

        NewPayRunModal.prototype.save = function save() {
            var _this = this;

            var data = {
                PayScheduleId: this.state.PayScheduleId,
                PaymentDate: this.state.PaymentDate,
                StartDate: this.state.StartDate,
                EndDate: this.state.EndDate
            };

            this.validationController.validate().then(function (result) {
                if (result.valid) {
                    _this.client.post("/api/employer/" + _this.state.EmployerId + "/payRun", data).then(function (res) {
                        var parsedResponse = JSON.parse(res.response);

                        _this.apiErrors = null;

                        if (parsedResponse.errors) {
                            _this.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this.dialogController.ok(parsedResponse.status);
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        return NewPayRunModal;
    }()) || _class);
});
define('text!pay-run/new-pay-run-modal.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>${state.Title}</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <div class=\"container-fluid\">\n                <form>\n                    <validation-errors errors.bind=\"validationController.errors\"></validation-errors>\n    \n                    <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n                    <div class=\"row\" if.bind=\"state.Instruction\">\n                        <div class=\"col-sm-12\">\n                            <p>${state.Instruction}</p>\n                        </div>\n                    </div> \n\n                    <div class=\"row\">\n                        <div class=\"col-sm-12 col-md-12\">        \n                            <div class=\"form-group\" if.bind=\"!state.PayScheduleId\">\n                                <label for=\"PayScheduleId\">Pay Schedule</label>\n                                <select class=\"form-control\" id=\"PayScheduleId\" name=\"PayScheduleId\">\n                                    <option repeat.for=\"paySchedule of state.PaySchedules\" value.bind=\"paySchedule.Id\">\n                                        ${paySchedule.Name}\n                                    </option>\n                                </select>\n                            </div>\n                \n                            <div class=\"form-group\">\n                                <label for=\"PaymentDate\">Payment Date</label>\n                                <input type=\"date\" \n                                    class=\"form-control form-control-lg\" \n                                    id=\"PaymentDate\" \n                                    name=\"PaymentDate\" \n                                    value.bind=\"state.PaymentDate & validate\" \n                                    placeholder=\"The date the employees were paid in the pay run\">\n                \n                                <span class=\"notes\">The date you wish to appear on the employee's payslip (aka pay day).</span>\n                            </div>\n                \n                            <div class=\"row\">\n                                <div class=\"col-sm-12 col-md-6\">    \n                                    <div class=\"form-group\">\n                                        <label for=\"StartDate\">Pay Period Start</label>\n                                        <input type=\"date\" \n                                            class=\"form-control\" \n                                            id=\"StartDate\" \n                                            name=\"StartDate\" \n                                            value.bind=\"state.StartDate & validate\" \n                                            placeholder=\"The pay period start date\">\n                                    </div>\n                                </div>\n                                <div class=\"col-sm-12 col-md-6\"> \n                                    <div class=\"form-group\">\n                                        <label for=\"EndDate\">Pay Period End</label>\n                                        <input type=\"date\" \n                                            class=\"form-control\" \n                                            id=\"EndDate\" \n                                            name=\"EndDate\" \n                                            value.bind=\"state.EndDate & validate\" \n                                            placeholder=\"The pay period end date\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>                    \n                </form>\n            </div>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 text-left\">\n                        <button class=\"btn btn-secondary\" click.trigger=\"dialogController.cancel()\">Cancel</button>\n                    </div>\n                    <div class=\"col-sm-6 text-right\">\n                        <button class=\"btn btn-primary\" click.trigger=\"save()\">Start</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>\n</template>"; });
define('pay-run/info-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-router"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaRouter) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.InfoModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var InfoModal = exports.InfoModal = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController, _aureliaRouter.Router), _dec(_class = function () {
        function InfoModal(dialogController, router) {
            _classCallCheck(this, InfoModal);

            this.dialogController = dialogController;
            this.router = router;
        }

        InfoModal.prototype.activate = function activate(state) {
            this.state = state;
        };

        InfoModal.prototype.viewEmployee = function viewEmployee(employerId, employeeId) {
            this.router.navigateToRoute("employee", {
                employerId: employerId,
                employeeId: employeeId
            });

            this.dialogController.ok();
        };

        return InfoModal;
    }()) || _class);
});
define('text!pay-run/info-modal.html', ['module'], function(module) { module.exports = "<template>\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>Pay run</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <div class=\"container-fluid\">\n                <div class=\"pay-run-info\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12 col-md-4\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Pay Schedule</strong>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    ${state.PaySchedule}\n                                </div>\n                            </div>\n\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Pay Frequency</strong>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    ${state.PayFrequency}\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"col-sm-12 col-md-4\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Payment Date</strong>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    ${state.PaymentDate}\n                                </div>\n                            </div>\n\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Tax Year / Period</strong>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    ${state.TaxYear}/${state.TaxPeriod}\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"col-sm-12 col-md-4\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Period start</strong>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    ${state.PeriodStart}\n                                </div>\n                            </div>\n\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Period end</strong>\n                                </div>\n\n                                <div class=\"col-sm-12\">\n                                    ${state.PeriodEnd}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"row\">\n                        <div class=\"col-sm-12\" if.bind=\"state.Employees.length > 0\">\n                            <p><strong>Employees</strong></p>\n\n                            <table class=\"table\">\n                                <thead>\n                                    <tr>\n                                        <th scope=\"col\">Name</th>\n                                        <th scope=\"col\">Payments</th>\n                                        <th scope=\"col\">Tax</th>\n                                        <th scope=\"col\">EE NI</th>\n                                        <th scope=\"col\">ER NI</th>\n                                        <th scope=\"col\">Other Deducs</th>\n                                        <th scope=\"col\">Net Pay</th>\n                                        <th width=\"210px\"></th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr repeat.for=\"employee of state.Employees\">\n                                        <td>\n                                            <a href=\"#\" click.delegate=\"viewEmployee(state.EmployerId, employee.Key)\">${employee.Name}</a>\n                                        </td>\n                                        <td>${employee.PAYMENTS}</td>\n                                        <td>${employee.TAX}</td>\n                                        <td>${employee.EE_NI}</td>\n                                        <td>${employee.ER_NI}</td>\n                                        <td>${employee.OTHERDEDNS}</td>\n                                        <td>${employee.NETPAY}</td>\n                                        <td class=\"text-right\">\n                                            <div class=\"dropdown\">\n                                                <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                                    Actions\n                                                </button>\n                                                <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n                                                    <a class=\"dropdown-item\" href=\"/api/Employer/${state.EmployerId}/Employee/${employee.Key}/PaySlipData/${employee.Code}/${state.TaxPeriod}/${state.TaxYear}\" target=\"_blank\">View payslip data</a>\n                                                    <a class=\"dropdown-item\" href=\"/api/Employer/${state.EmployerId}/Employee/${employee.Key}/PaySlipPdf/${employee.Code}/${state.TaxPeriod}/${state.TaxYear}\" target=\"_blank\">View payslip pdf</a>\n                                                    <a class=\"dropdown-item\" href=\"/api${employee.Commentary | extractHref}\" target=\"_blank\" if.bind=\"employee.Commentary\">View Commentary</a>\n                                                </div>\n                                            </div>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n\n                        <div class=\"col-sm-12\" if.bind=\"state.Employees.length === 0\">\n                            <p><strong>No employees</strong></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <button class=\"btn btn-primary\" click.trigger=\"dialogController.ok()\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/TaxYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Taxable Pay</th>\n                <th>Tax Code</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Tax YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.TaxablePay | formatSalary}\n                </td>\n                <td>\n                    ${item.TaxCode}\n                </td>            \n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/StudentLoanYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Calculation Method</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Student Loan YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.StudentLoanCalculationMethod}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                         \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/SspYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Absence Start</th>\n                <th>Absence End</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Statutory Sick Pay YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.AbsenceStart}\n                </td>\n                <td>\n                    ${item.AbsenceEnd}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                         \n            </tr>                   \n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/SppYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Absence Start</th>\n                <th>Absence End</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Statutory Paternity Pay YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.AbsenceStart}\n                </td>\n                <td>\n                    ${item.AbsenceEnd}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/SmpYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Absence Start</th>\n                <th>Absence End</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Statutory Maternity Pay YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.AbsenceStart}\n                </td>\n                <td>\n                    ${item.AbsenceEnd}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/ShppYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Absence Start</th>\n                <th>Absence End</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Shared Parental Pay YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.AbsenceStart}\n                </td>\n                <td>\n                    ${item.AbsenceEnd}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/SapYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Absence Start</th>\n                <th>Absence End</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Statutory Adoption Pay YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.AbsenceStart}\n                </td>\n                <td>\n                    ${item.AbsenceEnd}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/PrimitiveYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Primitive YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/PensionYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Pensionable Pay</th>\n                <th>Employer Contribution</th>\n                <th>Code</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Pension YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.PensionablePay | formatSalary}\n                </td>\n                <td>\n                    ${item.EmployerContribution | formatSalary}\n                </td>\n                <td>\n                    ${item.Code}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                         \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/lists/NiYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Value</th>\n                <th>Employer NI</th>\n                <th>Niable Pay</th>\n                <th>NI Letter</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"National Insurance YTD\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>\n                <td>\n                    ${item.EmployerNI | formatSalary}\n                </td>\n                <td>\n                    ${item.NiablePay | formatSalary}\n                </td>\n                <td>\n                    ${item.NiLetter}\n                </td>            \n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                         \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/ytd-pay-instruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"pay-instruction\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <hr>\n            </div>\n        </div>\n                        \n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <p><strong>Pay instruction</strong></p>\n\n                <p>\n                    See <a href=\"https://developer.payrun.io/docs/key-concepts/understanding-pay-instructions.html\" target=\"_blank\">Understanding Pay Instructions</a> for more information on how pay instructions can be used.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n                <div class=\"form-group\">\n                    <label for=\"StartDate\">Start date</label>\n        \n                    <input type=\"date\" \n                        class=\"form-control\" \n                        id=\"StartDate\" \n                        name=\"StartDate\" \n                        value.bind=\"pi.StartDate\" \n                        placeholder=\"The date the instruction will come into effect.\" \n                        required \n                        data-required-message=\"Start date is required\">\n        \n                    <span class=\"notes\">\n                        The date the instruction will come into effect.\n                    </span>\n                </div>\n        \n                <div class=\"form-group\">\n                    <label for=\"EndDate\">End date</label>\n        \n                    <input type=\"date\" \n                        class=\"form-control\" \n                        id=\"EndDate\" \n                        name=\"EndDate\" \n                        value.bind=\"pi.EndDate\" \n                        placeholder=\"The date the instruction will end, open ended instructions will run forever.\">\n        \n                    <span class=\"notes\">\n                        The date the instruction will end, open ended instructions will run forever.\n                    </span>\n                </div>\n            </div>\n\n            <div class=\"col-sm-12 col-md-6\">\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" \n                        type=\"checkbox\" \n                        id=\"IsAdjustment\" \n                        name=\"IsAdjustment\" \n                        checked.bind=\"pi.IsAdjustment\">\n        \n                    <label class=\"form-check-label\" for=\"IsAdjustment\">\n                        Is Adjustment?\n                    </label>\n        \n                    <span class=\"notes\">\n                        Indicates if the instruction is an adjustment. Pay lines \n                        generated from adjustment YTD instructions appear on the employee pay slip.\n                    </span>\n                </div>\n                                    \n                <div class=\"form-group\">\n                    <label for=\"Description\">Description</label>\n        \n                    <input type=\"text\" \n                        class=\"form-control\" \n                        id=\"Description\" \n                        name=\"Description\" \n                        value.bind=\"pi.Description\" \n                        placeholder=\"The pay line descripton override\" \n                        maxlength=\"200\">\n        \n                    <span class=\"notes\">\n                        This description will override the default description from the pay code. \n                        See <a href=\"http://developer.payrun.io/docs/key-concepts/customising-the-payslip.html\" target=\"_blank\">Customising the Payslip</a> for more information on customising the payslip output and using runtime variables.\n                    </span>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"PayLineTag\">Pay Line Tag</label>\n        \n                    <input type=\"text\" \n                        class=\"form-control\" \n                        id=\"PayLineTag\" \n                        name=\"PayLineTag\" \n                        value.bind=\"pi.PayLineTag\" \n                        maxlength=\"100\">\n        \n                    <span class=\"notes\">\n                        If specified, the PayLineTag value is used to decorate all child pay lines generated by the instruction.\n                    </span>\n                </div>                \n            </div>\n        </div>\n    </div>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/TaxYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"TaxablePay\">Taxable Pay</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"TaxablePay\" \n                    name=\"TaxablePay\" \n                    value.bind=\"pi.TaxablePay\" \n                    step=\"0.01\" \n                    placeholder=\"Taxable Pay\" \n                    required \n                    data-required-message=\"Taxable Pay is required\">\n            </div>\n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"TaxCode\">Tax code</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"TaxCode\" \n                    name=\"TaxCode\" \n                    value.bind=\"pi.TaxCode\" \n                    placeholder=\"Tax code\" \n                    required \n                    data-required-message=\"Tax code is required\" \n                    minlength=\"2\" \n                    maxlength=\"7\" \n                    pattern=\"^(SD1|SD2|D1|BR|SBR|SD0|D0|NT)$|^[S]?((K{1}[0-9]{1,6})|([0-9]{1,6}[LMNPTYV]{1})$)\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"TaxBasis\">Tax basis</label>\n\n                <select id=\"TaxBasis\" \n                    name=\"TaxBasis\" \n                    class=\"form-control\" \n                    required \n                    data-required-message=\"Tax basis is required\" \n                    value.bind=\"pi.TaxBasis\">\n                    <option value=\"\"></option>\n                    <option value=\"Cumulative\">Cumulative</option>\n                    <option value=\"Week1Month1\">Week1Month1</option>\n                </select>\n            </div>             \n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/StudentLoanYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"StudentLoanCalculationMethod\">Student loan calculation method</label>\n\n                <select id=\"StudentLoanCalculationMethod\" \n                    name=\"StudentLoanCalculationMethod\" \n                    class=\"form-control\" \n                    required \n                    data-required-message=\"Student loan calculation method is required\" \n                    value.bind=\"pi.StudentLoanCalculationMethod\">\n                    <option value=\"\"></option>\n                    <option value=\"Off\">Off</option>\n                    <option value=\"Plan1\">Plan1</option>\n                    <option value=\"Plan2\">Plan2</option>\n                </select>\n            </div> \n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/SspYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AbsenceStart\">Absence start</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceStart\" \n                    name=\"AbsenceStart\" \n                    value.bind=\"pi.AbsenceStart\" \n                    placeholder=\"Absence start\" \n                    required \n                    data-required-message=\"Absence start is required\">\n            </div>        \n\n            <div class=\"form-group\">\n                <label for=\"AbsenceEnd\">Absence end</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceEnd\" \n                    name=\"AbsenceEnd\" \n                    value.bind=\"pi.AbsenceEnd\" \n                    placeholder=\"Absence end\" \n                    required \n                    data-required-message=\"Absence end is required\">\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>              \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">        \n            <div class=\"form-group\">\n                <label for=\"AverageWeeklyEarnings\">Average weekly earnings</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AverageWeeklyEarnings\" \n                    name=\"AverageWeeklyEarnings\" \n                    value.bind=\"pi.AverageWeeklyEarnings\" \n                    step=\"0.01\" \n                    placeholder=\"Average weekly earnings\" \n                    required \n                    data-required-message=\"Average weekly earnings is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"WeeksUsed\">Weeks used</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"WeeksUsed\" \n                    name=\"WeeksUsed\" \n                    value.bind=\"pi.WeeksUsed\" \n                    step=\"0.01\" \n                    min=\"0\" \n                    placeholder=\"Weeks used\" \n                    required \n                    data-required-message=\"Weeks used is required\">\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"WaitingDaysServed\">Waiting days served</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"WaitingDaysServed\" \n                    name=\"WaitingDaysServed\" \n                    value.bind=\"pi.WaitingDaysServed\" \n                    step=\"1\" \n                    min=\"0\" \n                    placeholder=\"Waiting days served\" \n                    required \n                    data-required-message=\"Waiting days served is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"QualifyingDays\">Qualifying days</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"QualifyingDays\" \n                    name=\"QualifyingDays\" \n                    value.bind=\"pi.QualifyingDays\" \n                    step=\"1\" \n                    min=\"0\" \n                    placeholder=\"Qualifying days\">\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/SppYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AbsenceStart\">Absence start</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceStart\" \n                    name=\"AbsenceStart\" \n                    value.bind=\"pi.AbsenceStart\" \n                    placeholder=\"Absence start\" \n                    required \n                    data-required-message=\"Absence start is required\">\n            </div>        \n\n            <div class=\"form-group\">\n                <label for=\"AbsenceEnd\">Absence end</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceEnd\" \n                    name=\"AbsenceEnd\" \n                    value.bind=\"pi.AbsenceEnd\" \n                    placeholder=\"Absence end\" \n                    required \n                    data-required-message=\"Absence end is required\">\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>              \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">        \n            <div class=\"form-group\">\n                <label for=\"AverageWeeklyEarnings\">Average weekly earnings</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AverageWeeklyEarnings\" \n                    name=\"AverageWeeklyEarnings\" \n                    value.bind=\"pi.AverageWeeklyEarnings\" \n                    step=\"0.01\" \n                    placeholder=\"Average weekly earnings\" \n                    required \n                    data-required-message=\"Average weekly earnings is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"WeeksUsed\">Weeks used</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"WeeksUsed\" \n                    name=\"WeeksUsed\" \n                    value.bind=\"pi.WeeksUsed\" \n                    step=\"0.01\" \n                    min=\"0\" \n                    placeholder=\"Weeks used\" \n                    required \n                    data-required-message=\"Weeks used is required\">\n            </div>             \n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/SmpYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AbsenceStart\">Absence start</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceStart\" \n                    name=\"AbsenceStart\" \n                    value.bind=\"pi.AbsenceStart\" \n                    placeholder=\"Absence start\" \n                    required \n                    data-required-message=\"Absence start is required\">\n            </div>        \n\n            <div class=\"form-group\">\n                <label for=\"AbsenceEnd\">Absence end</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceEnd\" \n                    name=\"AbsenceEnd\" \n                    value.bind=\"pi.AbsenceEnd\" \n                    placeholder=\"Absence end\" \n                    required \n                    data-required-message=\"Absence end is required\">\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>              \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">        \n            <div class=\"form-group\">\n                <label for=\"AverageWeeklyEarnings\">Average weekly earnings</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AverageWeeklyEarnings\" \n                    name=\"AverageWeeklyEarnings\" \n                    value.bind=\"pi.AverageWeeklyEarnings\" \n                    step=\"0.01\" \n                    placeholder=\"Average weekly earnings\" \n                    required \n                    data-required-message=\"Average weekly earnings is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"WeeksUsed\">Weeks used</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"WeeksUsed\" \n                    name=\"WeeksUsed\" \n                    value.bind=\"pi.WeeksUsed\" \n                    step=\"0.01\" \n                    min=\"0\" \n                    placeholder=\"Weeks used\" \n                    required \n                    data-required-message=\"Weeks used is required\">\n            </div>             \n        </div>\n    </div>\n\n    <!--<div class=\"row keep-in-touch-days\">\n        <div class=\"col-sm-6\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <label>Keep in touch days</label>\n                </div>\n            </div>\n\n            <div id=\"keep-in-touch-days-container\"></div>\n\n            <div class=\"row\">\n                <div class=\"col-sm-12 add-keep-in-touch-day-container\">\n                    <button id=\"add-keep-in-touch-day\" class=\"btn btn-secondary btn-sm\" type=\"button\">Add a keep in touch day</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <input id=\"KeepInTouchDays\" type=\"hidden\" name=\"KeepInTouchDays\" value=\"{{CoalescedKeepInTouchDays}}\">\n\n    <script src=\"/js/keep-in-touch-days.js\"></script>-->\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/ShppYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AbsenceStart\">Absence start</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceStart\" \n                    name=\"AbsenceStart\" \n                    value.bind=\"pi.AbsenceStart\" \n                    placeholder=\"Absence start\" \n                    required \n                    data-required-message=\"Absence start is required\">\n            </div>        \n\n            <div class=\"form-group\">\n                <label for=\"AbsenceEnd\">Absence end</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceEnd\" \n                    name=\"AbsenceEnd\" \n                    value.bind=\"pi.AbsenceEnd\" \n                    placeholder=\"Absence end\" \n                    required \n                    data-required-message=\"Absence end is required\">\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>              \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">        \n            <div class=\"form-group\">\n                <label for=\"AverageWeeklyEarnings\">Average weekly earnings</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AverageWeeklyEarnings\" \n                    name=\"AverageWeeklyEarnings\" \n                    value.bind=\"pi.AverageWeeklyEarnings\" \n                    step=\"0.01\" \n                    placeholder=\"Average weekly earnings\" \n                    required \n                    data-required-message=\"Average weekly earnings is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"WeeksUsed\">Weeks used</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"WeeksUsed\" \n                    name=\"WeeksUsed\" \n                    value.bind=\"pi.WeeksUsed\" \n                    step=\"0.01\" \n                    min=\"0\" \n                    placeholder=\"Weeks used\" \n                    required \n                    data-required-message=\"Weeks used is required\">\n            </div>             \n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/SapYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AbsenceStart\">Absence start</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceStart\" \n                    name=\"AbsenceStart\" \n                    value.bind=\"pi.AbsenceStart\" \n                    placeholder=\"Absence start\" \n                    required \n                    data-required-message=\"Absence start is required\">\n            </div>        \n\n            <div class=\"form-group\">\n                <label for=\"AbsenceEnd\">Absence end</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceEnd\" \n                    name=\"AbsenceEnd\" \n                    value.bind=\"pi.AbsenceEnd\" \n                    placeholder=\"Absence end\" \n                    required \n                    data-required-message=\"Absence end is required\">\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>              \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">        \n            <div class=\"form-group\">\n                <label for=\"AverageWeeklyEarnings\">Average weekly earnings</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AverageWeeklyEarnings\" \n                    name=\"AverageWeeklyEarnings\" \n                    value.bind=\"pi.AverageWeeklyEarnings\" \n                    step=\"0.01\" \n                    placeholder=\"Average weekly earnings\" \n                    required \n                    data-required-message=\"Average weekly earnings is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"WeeksUsed\">Weeks used</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"WeeksUsed\" \n                    name=\"WeeksUsed\" \n                    value.bind=\"pi.WeeksUsed\" \n                    step=\"0.01\" \n                    min=\"0\" \n                    placeholder=\"Weeks used\" \n                    required \n                    data-required-message=\"Weeks used is required\">\n            </div>            \n        </div>\n    </div>\n\n    <!--<div class=\"row keep-in-touch-days\">\n        <div class=\"col-sm-6\">\n            <div class=\"row\">\n                <div class=\"col-sm-12\">\n                    <label>Keep in touch days</label>\n                </div>\n            </div>\n\n            <div id=\"keep-in-touch-days-container\"></div>\n\n            <div class=\"row\">\n                <div class=\"col-sm-12 add-keep-in-touch-day-container\">\n                    <button id=\"add-keep-in-touch-day\" class=\"btn btn-secondary btn-sm\" type=\"button\">Add a keep in touch day</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <input id=\"KeepInTouchDays\" type=\"hidden\" name=\"KeepInTouchDays\" value=\"{{CoalescedKeepInTouchDays}}\">\n\n    <script src=\"/js/keep-in-touch-days.js\"></script>-->\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/PrimitiveYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group\">\n                <label for=\"Code\">Code</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Code\" \n                    name=\"Code\" \n                    value.bind=\"pi.Code\" \n                    placeholder=\"Code\" \n                    pattern=\"[A-Za-z0-9]*\" \n                    minlength=\"2\" \n                    maxlength=\"35\"\n                    required \n                    data-required-message=\"Code is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>            \n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/PensionYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"PensionablePay\">Pensionable pay</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"PensionablePay\" \n                    name=\"PensionablePay\" \n                    value.bind=\"pi.PensionablePay\" \n                    step=\"0.01\" \n                    placeholder=\"Pensionable pay\" \n                    required \n                    data-required-message=\"Pensionable pay is required\">\n\n                <span class=\"notes\">The total amount of pensionable pay.</span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n\n                <span class=\"notes\">\n                    The employee contribution amount.\n                </span>\n            </div>\n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"EmployerContribution\">Employer contribution</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"EmployerContribution\" \n                    name=\"EmployerContribution\" \n                    value.bind=\"pi.EmployerContribution\" \n                    step=\"0.01\" \n                    placeholder=\"EmployerContribution\" \n                    required \n                    data-required-message=\"Employer contribution is required\">\n\n                <span class=\"notes\">\n                    The employer contribution amount.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"Code\">Code</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Code\" \n                    name=\"Code\" \n                    value.bind=\"pi.Code\" \n                    placeholder=\"Code\" \n                    minlength=\"2\" \n                    maxlength=\"35\" \n                    pattern=\"[A-Za-z0-9]*\" \n                    required \n                    data-required-message=\"Code is required\">\n\n                <span class=\"notes\">\n                    The code that represents the pension payment code.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"Pension\">Pension</label>\n\n                <select class=\"form-control\" \n                    id=\"Pension\" \n                    name=\"Pension\" \n                    required \n                    data-required-message=\"Pension is required\" \n                    value.bind=\"pi.Pension\">\n                    <option value=\"\"></option>\n                    <option repeat.for=\"pension of pi.Pensions\" value.bind=\"pension.Id\">${pension.Name}</option>\n                </select>\n\n                <span class=\"notes\">\n                    The related pension scheme.\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/ytd-pay-instructions/forms/NiYtdPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value=\"{{Value}}\" \n                    step=\"0.01\" \n                    placeholder=\"Value\" \n                    required \n                    data-required-message=\"Value is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"EmployerNI\">Employer NI</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"EmployerNI\" \n                    name=\"EmployerNI\" \n                    value=\"{{EmployerNI}}\" \n                    step=\"0.01\" \n                    placeholder=\"Employer NI\" \n                    required \n                    data-required-message=\"Employer NI is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"NiablePay\">Niable Pay</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"NiablePay\" \n                    name=\"NiablePay\" \n                    value=\"{{NiablePay}}\" \n                    step=\"0.01\" \n                    placeholder=\"Niable Pay\" \n                    required \n                    data-required-message=\"Niable Pay is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"NiLetter\">NI Letter</label>\n\n                {{#select NiLetter}}\n                <select id=\"NiLetter\" \n                    name=\"NiLetter\" \n                    class=\"form-control\" \n                    required \n                    data-required-message=\"NI Letter is required\">\n                    <option value=\"A\">A</option>\n                    <option value=\"B\">B</option>\n                    <option value=\"C\">C</option>\n                    <option value=\"D\">D</option>\n                    <option value=\"E\">E</option>\n                    <option value=\"I\">I</option>\n                    <option value=\"J\">J</option>\n                    <option value=\"H\">H</option>\n                    <option value=\"K\">K</option>\n                    <option value=\"L\">L</option>\n                    <option value=\"M\">M</option>\n                    <option value=\"X\">X</option>\n                    <option value=\"Z\">Z</option>\n                </select>\n                {{/select}}\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"LEL\">LEL</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"LEL\" \n                    name=\"LEL\" \n                    value=\"{{LEL}}\" \n                    step=\"0.01\" \n                    placeholder=\"LEL\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"LELtoPT\">LEL to PT</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"LELtoPT\" \n                    name=\"LELtoPT\" \n                    value=\"{{LELtoPT}}\" \n                    step=\"0.01\" \n                    placeholder=\"LEL to PT\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"PTtoST\">PT to ST</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"PTtoST\" \n                    name=\"PTtoST\" \n                    value=\"{{PTtoST}}\" \n                    step=\"0.01\" \n                    placeholder=\"PT to ST\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"STtoUAP\">ST to UAP</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"STtoUAP\" \n                    name=\"STtoUAP\" \n                    value=\"{{STtoUAP}}\" \n                    step=\"0.01\" \n                    placeholder=\"ST to UAP\">\n            </div>\n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"STtoUEL\">ST to UEL</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"STtoUEL\" \n                    name=\"STtoUEL\" \n                    value=\"{{STtoUEL}}\" \n                    step=\"0.01\" \n                    placeholder=\"ST to UEL\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"UAPtoUEL\">UAP to UEL</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"UAPtoUEL\" \n                    name=\"UAPtoUEL\" \n                    value=\"{{UAPtoUEL}}\" \n                    step=\"0.01\" \n                    placeholder=\"UAP to UEL\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"UELtoUST\">UEL to UST</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"UELtoUST\" \n                    name=\"UELtoUST\" \n                    value=\"{{UELtoUST}}\" \n                    step=\"0.01\" \n                    placeholder=\"UEL to UST\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"UELtoAUST\">UEL to AUST</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"UELtoAUST\" \n                    name=\"UELtoAUST\" \n                    value=\"{{UELtoAUST}}\" \n                    step=\"0.01\" \n                    placeholder=\"UEL to AUST\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"AboveUST\">Above UST</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AboveUST\" \n                    name=\"AboveUST\" \n                    value=\"{{AboveUST}}\" \n                    step=\"0.01\" \n                    placeholder=\"Above UST\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"AboveAUST\">Above AUST</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AboveAUST\" \n                    name=\"AboveAUST\" \n                    value=\"{{AboveAUST}}\" \n                    step=\"0.01\" \n                    placeholder=\"Above AUST\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"RebateEE\">Rebate EE</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"RebateEE\" \n                    name=\"RebateEE\" \n                    value=\"{{RebateEE}}\" \n                    step=\"0.01\" \n                    placeholder=\"Rebate EE\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"RebateER\">Rebate ER</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"RebateER\" \n                    name=\"RebateER\" \n                    value=\"{{RebateER}}\" \n                    step=\"0.01\" \n                    placeholder=\"Rebate ER\">\n            </div>\n            \n            <div class=\"form-group\">\n                <label for=\"DirCalculationMethod\">Dir Calculation Method</label>\n\n                {{#select DirCalculationMethod}}\n                <select id=\"DirCalculationMethod\" \n                    name=\"DirCalculationMethod\" \n                    class=\"form-control\" \n                    required \n                    data-required-message=\"Calculation Method is required\">\n                    <option value=\"Off\">Off</option>\n                    <option value=\"AnnualBasis\">Annual Basis</option>\n                    <option value=\"AlternativeBasis\">Alternative Basis</option>\n                </select>\n                {{/select}}\n            </div>            \n        </div>\n    </div>\n\n    <compose view=\"./ytd-pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/TaxPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Tax code</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-size=\"modal-lg\" data-modal-title=\"Tax Instruction\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.TaxCode}\n                </td>            \n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                         \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/StudentLoanPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Calculation Method</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Student Loan\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.StudentLoanCalculationMethod}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/SspPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Absence Start</th>\n                <th>Absence End</th>\n                <th>Statutory Offset?</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"SSP Instruction\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.AbsenceStart}\n                </td>\n                <td>\n                    ${item.AbsenceEnd}\n                </td>\n                <td>\n                    ${item.StatutoryOffset}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/ShppPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Due Date</th>\n                <th>Born Date</th>\n                <th>Absence Start</th>\n                <th>Absence End</th>\n                <th>Statutory Offset?</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"ShPP Instruction\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.BabyDueDate}\n                </td>\n                <td>\n                    ${item.BabyBornDate}\n                </td>                        \n                <td>\n                    ${item.AbsenceStart}\n                </td>\n                <td>\n                    ${item.AbsenceEnd}\n                </td>\n                <td>\n                    ${item.StatutoryOffset}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                          \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/SalaryPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Salary</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Salary Instruction\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.AnnualSalary | formatSalary}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/RatePayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Rate</th>\n                <th>Units</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Rate Instruction\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Rate | formatSalary}\n                </td>\n                <td>\n                    ${item.Units | formatSalary}\n                </td>                        \n                <td>\n                    ${item.StartDate | formatSalary}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/PrimitivePayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Code</th>\n                <th>Value</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Primitive Instruction\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Code}\n                </td>\n                <td>\n                    ${item.Value | formatSalary}\n                </td>            \n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                          \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/PensionPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Pension</th>\n                <th>Employee Contribution</th>\n                <th>Employer Contribution</th>\n                <th>Salary Sacrifice?</th>\n                <th>Taxation Method</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" \n                        data-modal-size=\"modal-lg\" \n                        data-modal-title=\"Pension\" \n                        href=\"#\" \n                        click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Pension | extractIdFromLink}\n                </td>\n                <td>\n                    ${getPensionContribution(item.EmployeeContributionCash, item.EmployeeContributionPercent)}\n                </td>\n                <td>\n                    ${getPensionContribution(item.EmployerContributionCash, item.EmployerContributionPercent)}\n                </td>            \n                <td>\n                    <input type=\"checkbox\" disabled readonly checked.bind=\"item.SalarySacrifice\">\n                </td>\n                <td>\n                    ${item.TaxationMethod}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                          \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/NiPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>NI Table</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"National Insurance\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.NiLetter}\n                </td>            \n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                          \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/NiAdjustmentPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Periods</th>\n                <th>NI Letter</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"NI Adjustment\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Periods}\n                </td>\n                <td>\n                    ${item.NiLetter}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                         \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/BenefitPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Code</th>\n                <th>Total Cost</th>\n                <th>Employee Contribution</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Benefit Instruction\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.Code}\n                </td>\n                <td>\n                    ${item.TotalCost | formatSalary}\n                </td>\n                <td>\n                    ${item.EmployeeContribution | formatSalary}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                          \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/lists/AoePayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <table class=\"table table-sm\">\n        <thead>\n            <tr>\n                <th>Id</th>\n                <th>Case Number</th>\n                <th>Type</th>\n                <th>Start Date</th>\n                <th>End Date</th>\n                <th>Description</th>\n                <th width=\"50px\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"item of pi.Instructions\">\n                <th scope=\"row\">\n                    <a class=\"launch-modal\" data-modal-size=\"modal-lg\" data-modal-title=\"Attachment of Earnings\" href=\"#\" click.delegate=\"openEditPayInstructionModal(item)\">\n                        ${item.Id}\n                    </a>\n                </th>\n                <td>\n                    ${item.CaseNumber}\n                </td>     \n                <td>\n                    {item.Code}\n                </td>\n                <td>\n                    ${item.StartDate}\n                </td>\n                <td>\n                    ${item.EndDate}\n                </td>\n                <td>\n                    ${item.Description}\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm btn-delete-instruction\" \n                        click.delegate=\"deleteInstruction(item)\">\n                        Delete\n                    </button>                \n                </td>                                                          \n            </tr>\n        </tbody>\n    </table>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/pay-instruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"pay-instruction\">\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <hr>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12\">\n                <p><strong>Pay instruction</strong></p>\n\n                <p>\n                    See <a href=\"https://developer.payrun.io/docs/key-concepts/understanding-pay-instructions.html\" target=\"_blank\">Understanding Pay Instructions</a> for more information on how pay instructions can be used.\n                </p>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-sm-12 col-md-6\">\n                <div class=\"form-group\">\n                    <label for=\"StartDate\">Start date</label>\n        \n                    <input type=\"date\" \n                        class=\"form-control\" \n                        id=\"StartDate\" \n                        name=\"StartDate\" \n                        value.bind=\"pi.StartDate\" \n                        placeholder=\"The date the instruction will come into effect.\" \n                        required \n                        data-required-message=\"Start date is required\">\n        \n                    <span class=\"notes\">\n                        The date the instruction will come into effect.\n                    </span>\n                </div>\n        \n                <div class=\"form-group\">\n                    <label for=\"EndDate\">End date</label>\n        \n                    <input type=\"date\" \n                        class=\"form-control\" \n                        id=\"EndDate\" \n                        name=\"EndDate\" \n                        value.bind=\"pi.EndDate\" \n                        placeholder=\"The date the instruction will end, open ended instructions will run forever.\">\n        \n                    <span class=\"notes\">\n                        The date the instruction will end, open ended instructions will run forever.\n                    </span>\n                </div>\n            </div>\n\n            <div class=\"col-sm-12 col-md-6\">\n                <div class=\"form-group\">\n                    <label for=\"Description\">Description</label>\n        \n                    <input type=\"text\" \n                        class=\"form-control\" \n                        id=\"Description\" \n                        name=\"Description\" \n                        value.bind=\"pi.Description\" \n                        placeholder=\"The pay line descripton override\" \n                        maxlength=\"200\">\n        \n                    <span class=\"notes\">\n                        This description will override the default description from the pay code. \n                        See <a href=\"http://developer.payrun.io/docs/key-concepts/customising-the-payslip.html\" target=\"_blank\">Customising the Payslip</a> for more information on customising the payslip output and using runtime variables.\n                    </span>\n                </div> \n                \n                <div class=\"form-group\">\n                    <label for=\"PayLineTag\">Pay Line Tag</label>\n        \n                    <input type=\"text\" \n                        class=\"form-control\" \n                        id=\"PayLineTag\" \n                        name=\"PayLineTag\" \n                        value.bind=\"pi.PayLineTag\" \n                        maxlength=\"100\">\n        \n                    <span class=\"notes\">\n                        If specified, the PayLineTag value is used to decorate all child pay lines generated by the instruction.\n                    </span>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/TaxPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">          \n            <div class=\"form-group\">\n                <label for=\"TaxBasis\">Tax basis</label>\n\n                <select id=\"TaxBasis\" name=\"TaxBasis\" class=\"form-control\" required value.bind=\"pi.TaxBasis\">\n                    <option value=\"\"></option>\n                    <option value=\"Cumulative\">Cumulative</option>\n                    <option value=\"Week1Month1\">Week1Month1</option>\n                </select>\n\n                <span class=\"notes\">\n                    The tax basis to be used for the employee's tax calculations.\n                </span>\n            </div>                                 \n\n            <div class=\"form-group\">\n                <label for=\"TaxCode\">Tax code</label>\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"TaxCode\" \n                    name=\"TaxCode\" \n                    value.bind=\"pi.TaxCode\" \n                    placeholder=\"Tax code to be used for the employee's tax calculations\" \n                    required \n                    data-required-message=\"Tax code is required\" \n                    minlength=\"2\" \n                    maxlength=\"7\" \n                    pattern=\"^(SD1|SD2|D1|BR|SBR|SD0|D0|NT)$|^[S]?((K{1}[0-9]{1,6})|([0-9]{1,6}[LMNPTYV]{1})$)\">\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/StudentLoanPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group\">\n                <label for=\"StudentLoanCalculationMethod\">Student loan calculation method</label>\n\n                <select id=\"StudentLoanCalculationMethod\" \n                    name=\"StudentLoanCalculationMethod\" \n                    class=\"form-control\" \n                    value.bind=\"pi.StudentLoanCalculationMethod\" \n                    required \n                    data-required-message=\"Student loan calculation method is required\">\n                    <option value=\"\"></option>\n                    <option value=\"Off\">Off</option>\n                    <option value=\"Plan1\">Plan1</option>\n                    <option value=\"Plan2\">Plan2</option>\n                </select>\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/SspPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AverageWeeklyEarningOverride\">Average weekly earning override</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AverageWeeklyEarningOverride\" \n                    name=\"AverageWeeklyEarningOverride\" \n                    value.bind=\"pi.AverageWeeklyEarningOverride\">\n\n                <span class=\"notes\">\n                    Optional override value to the Average Weekly Earnings calculation. \n                    If this value is set then the calculated value is ignored.\n                </span>                \n            </div>                    \n                        \n            <div class=\"form-group\">\n                <label for=\"AbsenceStart\">Absence Start</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceStart\" \n                    name=\"AbsenceStart\" \n                    value.bind=\"pi.AbsenceStart\"  \n                    required \n                    data-required-message=\"Absence start is required\">\n\n                <span class=\"notes\">\n                    The start date of the employee absence.\n                </span>                \n            </div>             \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AbsenceEnd\">Absence End</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceEnd\" \n                    name=\"AbsenceEnd\" \n                    value.bind=\"pi.AbsenceEnd\">\n\n                <span class=\"notes\">\n                    The end date of the employee absence, leave blank if the absence is long-term and the end date is not known.\n                </span>                \n            </div> \n\n            <div class=\"form-check\">\n                <input class=\"form-check-input\" \n                    type=\"checkbox\" \n                    id=\"StatutoryOffset\" \n                    name=\"StatutoryOffset\" \n                    checked.bind=\"pi.StatutoryOffset\">\n\n                <label class=\"form-check-label\" for=\"StatutoryOffset\">\n                    Statutory offset?\n                </label>\n\n                <span class=\"notes\">\n                    Flag to indicate if the statutory payment should be offset.\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/SmpPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"coming-soon\">\n                <h4>Coming soon!</h4>\n\n                <p>Check soon to see this functionality wired up with the API</p>\n            </div>        \n        </div>\n    </div>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/ShppPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AverageWeeklyEarningOverride\">Average weekly earning override</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AverageWeeklyEarningOverride\" \n                    name=\"AverageWeeklyEarningOverride\" \n                    value.bind=\"pi.AverageWeeklyEarningOverride\">\n\n                <span class=\"notes\">\n                    Optional override value to the Average Weekly Earnings calculation. \n                    If this value is set then the calculated value is ignored.\n                </span>                \n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"AbsenceStart\">Absence Start</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceStart\" \n                    name=\"AbsenceStart\" \n                    value.bind=\"pi.AbsenceStart\"  \n                    required \n                    data-required-message=\"Absence start is required\">\n\n                <span class=\"notes\">\n                    The start date of the employee absence.\n                </span>                \n            </div>\n                    \n            <div class=\"form-group\">\n                <label for=\"AbsenceEnd\">Absence End</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"AbsenceEnd\" \n                    name=\"AbsenceEnd\" \n                    value.bind=\"pi.AbsenceEnd\">\n\n                <span class=\"notes\">\n                    The end date of the employee absence, leave blank if the absence is long-term and the end date is not known.\n                </span>                \n            </div>        \n\n            <div class=\"form-check\">\n                <input class=\"form-check-input\" \n                    type=\"checkbox\" \n                    id=\"StatutoryOffset\" \n                    name=\"StatutoryOffset\" \n                    checked.bind=\"pi.StatutoryOffset\">\n\n                <label class=\"form-check-label\" for=\"StatutoryOffset\">\n                    Statutory offset?\n                </label>\n\n                <span class=\"notes\">\n                    Flag to indicate if the statutory payment should be offset.\n                </span>\n            </div>                     \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"BabyDueDate\">Due date</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"BabyDueDate\" \n                    name=\"BabyDueDate\" \n                    value.bind=\"pi.BabyDueDate\"                 \n                    required \n                    data-required-message=\"Due date is required\">                \n            </div>                          \n\n            <div class=\"form-group\">\n                <label for=\"BabyBornDate\">Birth date</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"BabyBornDate\" \n                    name=\"BabyBornDate\" \n                    value.bind=\"pi.BabyBornDate\"                 \n                    required \n                    data-required-message=\"Birth date is required\">                \n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"SmpSapWeeksTaken\">Weeks taken</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"SmpSapWeeksTaken\" \n                    name=\"SmpSapWeeksTaken\" \n                    value.bind=\"pi.SmpSapWeeksTaken\"                 \n                    required \n                    data-required-message=\"Weeks taken is required\" \n                    step=\"1\">                \n            </div> \n                    \n            <div class=\"form-group\">\n                <label for=\"SplStartDate\">Leave start date</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"SplStartDate\" \n                    name=\"SplStartDate\" \n                    value.bind=\"pi.SplStartDate\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"SplEndDate\">Leave end date</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"SplEndDate\" \n                    name=\"SplEndDate\" \n                    value.bind=\"pi.SplEndDate\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"MothersDateOfDeath\">Date of the mother's death</label>\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"MothersDateOfDeath\" \n                    name=\"MothersDateOfDeath\" \n                    value.bind=\"pi.MothersDateOfDeath\">\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/SalaryPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">   \n            <div class=\"form-group\">\n                <label for=\"AnnualSalary\">Annual salary</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AnnualSalary\" \n                    name=\"AnnualSalary\" \n                    value.bind=\"pi.AnnualSalary\" \n                    placeholder=\"The employee's gross annual salary\" \n                    required \n                    data-required-message=\"Annual salary is required\" \n                    step=\"0.01\" \n                    min=\"0\">\n            </div>             \n\n            <div class=\"form-group\">\n                <label for=\"ProRataMethod\">Pro rata method</label>\n\n                <select id=\"ProRataMethod\" name=\"ProRataMethod\" class=\"form-control\" required value.bind=\"pi.ProRataMethod\">\n                    <option value=\"NotSet\">Not set</option>\n                    <option value=\"Annual260Days\">Annual 260 days</option>\n                    <option value=\"Annual365Days\">Annual 365 days</option>\n                    <option value=\"AnnualQualifyingDays\">Annual qualifying days</option>\n                    <option value=\"DaysPerCalenderMonth\">Days per calender month</option>\n                    <option value=\"DaysPerTaxPeriod\">Days per tax period</option>\n                </select>\n\n                <span class=\"notes\">\n                    The pro-rata method option to be used; the default is not set. \n                    See <a href=\"http://developer.payrun.io/docs/payroll-help/prorata-calculation-methods.html\" target=\"_blank\">Pro-rata Calculation Methods</a> for more information.\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/RatePayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">           \n            <div class=\"form-group\">\n                <label for=\"Rate\">Rate</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Rate\" \n                    name=\"Rate\" \n                    value.bind=\"pi.Rate\" \n                    step=\"0.01\" \n                    min=\"0\"\n                    placeholder=\"The monetary rate to be used\" \n                    required \n                    data-required-message=\"Rate is required\">\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"Code\">Code</label>\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Code\" \n                    name=\"Code\" \n                    value.bind=\"pi.Code\" \n                    placeholder=\"Code\" \n                    maxlength=\"35\" \n                    pattern=\"[A-Za-z0-9]*\">\n\n                <span class=\"notes\">\n                    The payment code override. If omitted; the BASIC payment code is used.\n                </span>                \n            </div>                    \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"RateUoM\">Unit of measure</label>\n\n                <select id=\"RateUoM\" name=\"RateUoM\" class=\"form-control\" value.bind=\"pi.RateUoM\">\n                    <option value=\"NotSet\">Not set</option>\n                    <option value=\"Minute\">Minute</option>\n                    <option value=\"Hour\">Hour</option>\n                    <option value=\"Day\">Day</option>\n                    <option value=\"Week\">Week</option>\n                    <option value=\"Month\">Month</option>\n                    <option value=\"Year\">Year</option>\n                </select>\n            </div>  \n\n            <div class=\"form-group\">\n                <label for=\"Units\">Units</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Units\" \n                    name=\"Units\" \n                    value.bind=\"pi.Units\" \n                    placeholder=\"The number of units to be used.\" \n                    required \n                    data-required-message=\"Units is required\" \n                    step=\"0.01\" \n                    min=\"0\">\n            </div>             \n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/PrimitivePayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group\">\n                <label for=\"Code\">Code</label>\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Code\" \n                    name=\"Code\" \n                    value.bind=\"pi.Code\" \n                    placeholder=\"Code\" \n                    minlength=\"2\" \n                    maxlength=\"35\" \n                    pattern=\"[A-Za-z0-9]*\" \n                    required \n                    data-required-message=\"Code is required\">\n\n                <span class=\"notes\">\n                    The code that represents the benefit type and it's treatment.\n                </span>                \n            </div>                              \n\n            <div class=\"form-group\">\n                <label for=\"Value\">Value</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"Value\" \n                    name=\"Value\" \n                    value.bind=\"pi.Value\" \n                    placeholder=\"Monetary value of the payment or deduction.\" \n                    required \n                    data-required-message=\"Value is required\" \n                    step=\"0.01\">\n            </div>             \n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/PensionPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"Code\">Code</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Code\" \n                    name=\"Code\" \n                    value.bind=\"pi.Code\" \n                    maxlength=\"35\" \n                    pattern=\"[A-Za-z0-9]*\">\n\n                <span class=\"notes\">\n                    The payment code override. If omitted; use value defined in pension scheme.\n                </span>\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"Pension\">Pension</label>\n\n                <select class=\"form-control\" \n                    id=\"Pension\" \n                    name=\"Pension\" \n                    required \n                    data-required-message=\"Pension is required\" \n                    value.bind=\"pi.Pension\">\n                    <option value=\"\"></option>\n                    <option repeat.for=\"pension of pi.Pensions\" value.bind=\"pension.Id\">${pension.Name}</option>\n                </select>\n\n                <span class=\"notes\">\n                    A link to the related pension scheme.\n                </span>\n            </div>         \n\n            <div class=\"form-group\">\n                <label for=\"EmployeeContributionCash\">Employee contribution cash</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"EmployeeContributionCash\" \n                    name=\"EmployeeContributionCash\" \n                    value.bind=\"pi.EmployeeContributionCash\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The employee cash contribution amount override. If omitted; use value defined in pension scheme.\n                </span>\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"EmployerContributionCash\">Employer contribution cash</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"EmployerContributionCash\" \n                    name=\"EmployerContributionCash\" \n                    value.bind=\"pi.EmployerContributionCash\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The employer cash contribution amount override. If omitted; use value defined in pension scheme.\n                </span>\n            </div>  \n\n            <div class=\"form-group\">\n                <label for=\"EmployeeContributionPercent\">Employee contribution %</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"EmployeeContributionPercent\" \n                    name=\"EmployeeContributionPercent\" \n                    value.bind=\"pi.EmployeeContributionPercent\" \n                    step=\"0.01\" \n                    max=\"1\" \n                    min=\"0\">\n\n                <span class=\"notes\">\n                    The employee contribution percentage override. If omitted; use value defined in pension scheme.\n                </span>\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"EmployerContributionPercent\">Employer contribution %</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"EmployerContributionPercent\" \n                    name=\"EmployerContributionPercent\" \n                    value.bind=\"pi.EmployerContributionPercent\" \n                    step=\"0.01\" \n                    max=\"1\" \n                    min=\"0\">\n\n                <span class=\"notes\">\n                    The employer contribution percentage override. If omitted; use value defined in pension scheme.\n                </span>\n            </div> \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"AdditionalVoluntaryContributionCash\">Employee additional voluntary cash contribution</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AdditionalVoluntaryContributionCash\" \n                    name=\"AdditionalVoluntaryContributionCash\" \n                    value.bind=\"pi.AdditionalVoluntaryContributionCash\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The employee additional voluntary cash contribution amount.\n                </span>\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"AdditionalVoluntaryContributionPercent\">Employee additional voluntary % contribution</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"AdditionalVoluntaryContributionPercent\" \n                    name=\"AdditionalVoluntaryContributionPercent\" \n                    value.bind=\"pi.AdditionalVoluntaryContributionPercent\" \n                    step=\"0.01\" \n                    max=\"1\" \n                    min=\"0\">\n\n                <span class=\"notes\">\n                    The employee additional voluntary contribution percentage amount.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"LowerThreshold\">Lower threshold</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"LowerThreshold\" \n                    name=\"LowerThreshold\" \n                    value.bind=\"pi.LowerThreshold\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The lower contribution cut off threshold. If specified; contributions will \n                    only be calculated on pensionable pay exceeding the thresh hold. If omitted; \n                    use value defined in pension scheme.\n                </span>\n            </div>  \n\n            <div class=\"form-group\">\n                <label for=\"UpperThreshold\">Upper threshold</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"UpperThreshold\" \n                    name=\"UpperThreshold\" \n                    value.bind=\"pi.UpperThreshold\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The upper contribution cut off threshold. If specified; contributions will only \n                    be calculated on pensionable pay below the thresh hold. If omitted; use value \n                    defined in pension scheme.\n                </span>\n            </div>\n\n            <div class=\"form-check\">\n                <input class=\"form-check-input\" \n                    type=\"checkbox\" \n                    id=\"SalarySacrifice\" \n                    name=\"SalarySacrifice\" \n                    checked.bind=\"pi.SalarySacrifice\">\n\n                <label class=\"form-check-label\" for=\"SalarySacrifice\">\n                    Salary sacrifice?\n                </label>\n\n                <span class=\"notes\">\n                    Determines if the contributions are calculated using the salary sacrifice method. If omitted; use value defined in pension scheme.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"TaxationMethod\">Taxation method</label>\n\n                <select class=\"form-control\" id=\"TaxationMethod\" name=\"TaxationMethod\" value.bind=\"pi.TaxationMethod\">\n                    <option value=\"\"></option>\n                    <option value=\"NotSet\">Not set</option>\n                    <option value=\"NetBased\">Net based</option>\n                    <option value=\"ReliefAtSource\">Relief at source</option>\n                </select>\n\n                <span class=\"notes\">\n                    The pension calculation taxation method override. If omitted; use value defined in pension scheme.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"ProRataMethod\">Pro-Rata method</label>\n\n                <select class=\"form-control\" id=\"ProRataMethod\" name=\"ProRataMethod\" required value.bind=\"pi.ProRataMethod\">\n                    <option value=\"\"></option>\n                    <option value=\"NotSet\">Not set</option>\n                    <option value=\"Annual260Days\">Annual 260 days</option>\n                    <option value=\"Annual365Days\">Annual 365 days</option>\n                    <option value=\"AnnualQualifyingDays\">Annual qualifying days</option>\n                    <option value=\"DaysPerCalenderMonth\">Days per calender month</option>\n                    <option value=\"DaysPerTaxPeriod\">Days per tax period</option>\n                </select>\n\n                <span class=\"notes\">\n                    The pro-rata method option to be used. If omitted; use the value defined in the pension scheme. \n                    See <a href=\"http://developer.payrun.io/docs/payroll-help/prorata-calculation-methods.html\" target=\"_blank\">Pro-rata Calculation Methods</a> for more information.\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/NiPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"form-group\">\n                <label for=\"DirCalculationMethod\">Director calculation method</label>\n\n                <select id=\"DirCalculationMethod\" name=\"DirCalculationMethod\" class=\"form-control\" value.bind=\"pi.DirCalculationMethod\">\n                    <option value=\"Off\">Off</option>\n                    <option value=\"AnnualBasis\">Annual Basis</option>\n                    <option value=\"AlternativeBasis\">Alternative Basis</option>\n                </select>\n\n                <span class=\"notes\">\n                    The calculation method to be used when treating and employee as a director. \n                    See <a href=\"https://developer.payrun.io/docs/payroll-help/employees-as-directors.html\" target=\"_blank\">employees as directors</a> for more information.\n                </span>                \n            </div>                              \n\n            <div class=\"form-group\">\n                <label for=\"NiLetter\">Ni Letter</label>\n\n                <select id=\"NiLetter\" name=\"NiLetter\" class=\"form-control\" value.bind=\"pi.NiLetter\">\n                    <option value=\"A\">A</option>\n                    <option value=\"B\">B</option>\n                    <option value=\"C\">C</option>\n                    <option value=\"D\">D</option>\n                    <option value=\"E\">E</option>\n                    <option value=\"I\">I</option>\n                    <option value=\"J\">J</option>\n                    <option value=\"H\">H</option>\n                    <option value=\"K\">K</option>\n                    <option value=\"L\">L</option>\n                    <option value=\"M\">M</option>\n                    <option value=\"X\">X</option>\n                    <option value=\"Z\">Z</option>\n                </select>\n\n                <span class=\"notes\">\n                    The employee's NI letter category. \n                    See <a href=\"https://developer.payrun.io/docs/payroll-help/using-the-correct-ni-letter.html\" target=\"_blank\">using the correct NI letter</a> for more information.\n                </span>                \n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/NiAdjustmentPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"DirCalculationMethod\">Director calculation method</label>\n\n                <select id=\"DirCalculationMethod\" name=\"DirCalculationMethod\" class=\"form-control\" value.bind=\"pi.DirCalculationMethod\">\n                    <option value=\"Off\">Off</option>\n                    <option value=\"AnnualBasis\">Annual Basis</option>\n                    <option value=\"AlternativeBasis\">Alternative Basis</option>\n                </select>\n\n                <span class=\"notes\">\n                    The calculation method to be used when treating and employee as a director. \n                    See <a href=\"https://developer.payrun.io/docs/payroll-help/employees-as-directors.html\" target=\"_blank\">employees as directors</a> for more information.\n                </span>                \n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"NiLetter\">Ni Letter</label>\n\n                <select id=\"NiLetter\" name=\"NiLetter\" class=\"form-control\" value.bind=\"pi.NiLetter\">\n                    <option value=\"A\">A</option>\n                    <option value=\"B\">B</option>\n                    <option value=\"C\">C</option>\n                    <option value=\"D\">D</option>\n                    <option value=\"E\">E</option>\n                    <option value=\"I\">I</option>\n                    <option value=\"J\">J</option>\n                    <option value=\"H\">H</option>\n                    <option value=\"K\">K</option>\n                    <option value=\"L\">L</option>\n                    <option value=\"M\">M</option>\n                    <option value=\"X\">X</option>\n                    <option value=\"Z\">Z</option>\n                </select>\n\n                <span class=\"notes\">\n                    The employee's NI letter category. \n                    See <a href=\"https://developer.payrun.io/docs/payroll-help/using-the-correct-ni-letter.html\" target=\"_blank\">using the correct NI letter</a> for more information.\n                </span>                \n            </div>                                   \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"Periods\">Periods</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Periods\" \n                    name=\"Periods\" \n                    value.bind=\"pi.Periods\" \n                    placeholder=\"Affected periods\" \n                    required \n                    data-required-message=\"Periods is required\"                \n                    pattern=\"(\\d+)(,*\\d+)*\">\n\n                <span class=\"notes\">\n                    The affected periods the adjustment applies to as a comma separated list.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"TaxYear\">Tax year</label>\n\n                <select id=\"TaxYear\" name=\"TaxYear\" class=\"form-control\" value.bind=\"pi.TaxYear\">\n                    <option value=\"2015\">2015</option>\n                    <option value=\"2016\">2016</option>\n                    <option value=\"2017\">2017</option>\n                    <option value=\"2018\">2018</option>\n                </select>\n            </div>  \n                    \n            <div class=\"form-group\">\n                <label for=\"Reason\">Reason</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Reason\" \n                    name=\"Reason\" \n                    value.bind=\"pi.Reason\" \n                    placeholder=\"Reasons why the adjustment was made\" \n                    maxlength=\"500\">\n\n                <span class=\"notes\">\n                    An optional description for reasons why the adjustment was made.\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/BenefitPayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"Code\">Code</label>\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"Code\" \n                    name=\"Code\" \n                    value.bind=\"pi.Code\" \n                    placeholder=\"Code\" \n                    minlength=\"2\" \n                    maxlength=\"35\" \n                    pattern=\"[A-Za-z0-9]*\" \n                    required \n                    data-required-message=\"Code is required\">\n\n                <span class=\"notes\">\n                    The code that represents the benefit type and it's treatment.\n                </span>                \n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"TotalCost\">Total cost</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"TotalCost\" \n                    name=\"TotalCost\" \n                    value.bind=\"pi.TotalCost\" \n                    placeholder=\"Total cost\" \n                    required \n                    data-required-message=\"Total cost is required\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The total cost (or value) of the benefit for the remainder of the financial year.\n                </span>\n            </div>                                      \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"EmployeeContribution\">Employee contribution</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"EmployeeContribution\" \n                    name=\"EmployeeContribution\" \n                    value.bind=\"pi.EmployeeContribution\" \n                    placeholder=\"Employee contribution\" \n                    required \n                    data-required-message=\"Employee contribution is required\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The amount the employee contributes towards the benefit for the rest of the financial year.\n                </span>\n            </div>\n                    \n            <div class=\"form-group\">\n                <label for=\"CashEquivalent\">Cash equivalent</label>\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"CashEquivalent\" \n                    name=\"CashEquivalent\" \n                    value.bind=\"pi.CashEquivalent\" \n                    placeholder=\"Cash equivalent\" \n                    step=\"0.01\">\n\n                <span class=\"notes\">\n                    The per period cash equivalent value of the benefit.<br>\n                    [Optional] used to override the calculated cash equivilent value.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"AccountingMethod\">Accounting method</label>\n\n                <select class=\"form-control\" \n                    id=\"AccountingMethod\" \n                    name=\"AccountingMethod\" \n                    required \n                    data-required-message=\"Accounting method is required\" \n                    value.bind=\"pi.AccountingMethod\">\n                    <option value=\"\"></option>\n                    <option value=\"P11D\">P11D</option>\n                    <option value=\"PAYE\">PAYE</option>\n                </select>\n\n                <span class=\"notes\">\n                    The accounting method used to report the benefit to HMRC.\n                </span>\n            </div>             \n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('text!pay-instruction/pay-instructions/forms/AoePayInstruction.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"CaseNumber\">Case number</label>\n\n                <input type=\"text\" \n                    class=\"form-control\" \n                    id=\"CaseNumber\" \n                    name=\"CaseNumber\" \n                    value.bind=\"pi.CaseNumber\" \n                    placeholder=\"Attachment of earnings case number\" \n                    required \n                    data-required-message=\"Case number is required\">\n\n                <span class=\"notes\">\n                    The attachment of earnings case number. Used to uniquely identify the attachment order.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"AoeType\">Type</label>\n\n                <select id=\"AoeType\" name=\"AoeType\" class=\"form-control\" value.bind=\"pi.AoeType\">\n                    <option value=\"\"></option>\n                    <option value=\"AEO\">AEO</option>\n                    <option value=\"AEOP\">AEOP</option>\n                    <option value=\"AEONP\">AEONP</option>\n                    <option value=\"CSA\">CSA</option>\n                    <option value=\"CSA2012\">CSA2012</option>\n                    <option value=\"DEO\">DEO</option>\n                    <option value=\"CCPRE92\">CCPRE92</option>\n                    <option value=\"CCPOST92\">CCPOST92</option>\n                    <option value=\"CTAEO\">CTAEO</option>\n                    <option value=\"MCAEO\">MCAEO</option>\n                    <option value=\"EA\">EA</option>\n                    <option value=\"CMA\">CMA</option>\n                    <option value=\"CAO\">CAO</option>\n                    <option value=\"ISD\">ISD</option>\n                    <option value=\"EA2006\">EA2006</option>\n                    <option value=\"CAPS\">CAPS</option>\n                    <option value=\"DEA\">DEA</option>\n                    <option value=\"DEAHIGHER\">DEAHIGHER</option>\n                    <option value=\"DEAFIXED\">DEAFIXED</option>\n                </select>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"IssueDate\">Issue date</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"IssueDate\" \n                    name=\"IssueDate\" \n                    value.bind=\"pi.IssueDate\" \n                    required \n                    data-required-message=\"Issue date is required\">\n\n                <span class=\"notes\">\n                    The issue date. The date when the attachment comes into affect.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"StopDate\">Stop date</label>\n\n                <input type=\"date\" \n                    class=\"form-control\" \n                    id=\"StopDate\" \n                    name=\"StopDate\" \n                    value.bind=\"pi.StopDate\">\n\n                <span class=\"notes\">\n                    The stop date. The optional date when the attachment ends.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"TotalToPay\">Total amount to be paid</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"TotalToPay\" \n                    name=\"TotalToPay\" \n                    value.bind=\"pi.TotalToPay\" \n                    step=\"0.01\" \n                    placeholder=\"Amount to be paid\">\n            </div>   \n\n            <div class=\"form-group\">\n                <label for=\"PreviousPayments\">Previous payments</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"PreviousPayments\" \n                    name=\"PreviousPayments\" \n                    value.bind=\"pi.PreviousPayments\" \n                    step=\"0.01\" \n                    placeholder=\"Previous payments\">\n\n                <span class=\"notes\">\n                    The starting amount already paid. Used when the instruction \n                    started partway through the attachment. For example: when an employee \n                    starts a new job part way through the attachment period and \n                    has already made historic payments.\n                </span>                \n            </div>                                         \n        </div>\n\n        <div class=\"col-sm-12 col-md-6\">\n            <div class=\"form-group\">\n                <label for=\"PreviousArrears\">Previous arrears</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"PreviousArrears\" \n                    name=\"PreviousArrears\" \n                    value.bind=\"pi.PreviousArrears\" \n                    step=\"0.01\" \n                    placeholder=\"Previous arrears\">\n\n                <span class=\"notes\">\n                    The starting amount owed in arrears. Used when the \n                    instruction started partway through the attachment. For example: \n                    when an employee starts a new job part way through the attachment \n                    period and has arrears to be settled.\n                </span>\n            </div> \n\n            <div class=\"form-check\">\n                <input class=\"form-check-input\" \n                    type=\"checkbox\" \n                    id=\"ClaimAdminFee\" \n                    name=\"ClaimAdminFee\" \n                    checked.bind=\"pi.ClaimAdminFee\">\n\n                <label class=\"form-check-label\" for=\"ClaimAdminFee\">\n                    Should the admin fee be collected?\n                </label>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"ProtectedEarningsAmount\">Protected earnings amount</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"ProtectedEarningsAmount\" \n                    name=\"ProtectedEarningsAmount\" \n                    value.bind=\"pi.ProtectedEarningsAmount\" \n                    step=\"0.01\" \n                    placeholder=\"Protected earnings amount\">\n\n                <span class=\"notes\">\n                    The protected earnings amount. Indicates the amount of earnings \n                    that cannot be collected in repayment of the attachment.\n                </span>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"DeductionAmount\">Deduction amount</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"DeductionAmount\" \n                    name=\"DeductionAmount\" \n                    value.bind=\"pi.DeductionAmount\" \n                    step=\"0.01\" \n                    placeholder=\"Deduction amount\">\n\n                <span class=\"notes\">\n                    The deduction amount. Indicates the fixed amount to be collected in repayment of attachment.\n                </span>\n            </div> \n\n            <div class=\"form-group\">\n                <label for=\"ProtectedEarningsPercentage\">Protected earnings %</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"ProtectedEarningsPercentage\" \n                    name=\"ProtectedEarningsPercentage\" \n                    value.bind=\"pi.ProtectedEarningsPercentage\" \n                    step=\"0.01\" \n                    placeholder=\"Protected earnings %\">\n\n                <span class=\"notes\">\n                    The protected earnings percentage. Indicates the percentage of \n                    earnings that cannot be collected in repayment of attachment.\n                </span>\n            </div>                                                                \n\n            <div class=\"form-group\">\n                <label for=\"DeductionPercentage\">Deduction %</label>\n\n                <input type=\"number\" \n                    class=\"form-control\" \n                    id=\"DeductionPercentage\" \n                    name=\"DeductionPercentage\" \n                    value.bind=\"pi.DeductionPercentage\" \n                    step=\"0.01\" \n                    placeholder=\"Deduction %\">\n\n                <span class=\"notes\">\n                    The deduction percentage. Indicates the percentage amount to be collected in repayment of the attachment.\n                </span>\n            </div>             \n        </div>\n    </div>\n\n    <compose view=\"./pay-instruction.html\"></compose>\n</template>"; });
define('pay-instruction/pay-instruction-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PayInstructionModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PayInstructionModal = exports.PayInstructionModal = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function PayInstructionModal(dialogController) {
            _classCallCheck(this, PayInstructionModal);

            this.dialogController = dialogController;
            this.client = new _aureliaHttpClient.HttpClient();
        }

        PayInstructionModal.prototype.activate = function activate(state) {
            var _this = this;

            this.state = state;

            return new Promise(function (resolve) {
                var apiUrl = void 0;

                if (state.id) {
                    apiUrl = "/api/employer/" + state.employerId + "/employee/" + state.employeeId + "/payInstruction/" + state.id;
                } else {
                    apiUrl = "/api/employer/" + state.employerId + "/employee/" + state.employeeId + "/" + state.type;
                }

                _this.client.get(apiUrl).then(function (res) {
                    _this.pi = JSON.parse(res.response);

                    resolve();
                });
            });
        };

        PayInstructionModal.prototype.save = function save() {
            var _this2 = this;

            var data = this.pi;
            var url = "/api/employer/" + this.state.employerId + "/employee/" + this.state.employeeId + "/payInstruction";

            this.client.post(url, data).then(function (res) {
                var parsedResponse = JSON.parse(res.response);

                _this2.apiErrors = null;

                if (parsedResponse.errors) {
                    _this2.apiErrors = parsedResponse.errors;
                    return;
                }

                _this2.dialogController.ok(parsedResponse.status);
            });
        };

        PayInstructionModal.prototype.getPayInstructionPartial = function getPayInstructionPartial(pi) {
            if (pi.InstructionType.trim().toLowerCase().indexOf("ytd") != -1) {
                return "./ytd-pay-instructions/forms/" + pi.InstructionType + ".html";
            }

            return "./pay-instructions/forms/" + pi.InstructionType + ".html";
        };

        return PayInstructionModal;
    }()) || _class);
});
define('text!pay-instruction/pay-instruction-modal.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>${pi.Name}</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <form>\n                <div class=\"pay-instruction-modal-container\">\n                    <div class=\"container-fluid\">\n                        <!-- <validation-errors errors.bind=\"validationController.errors\"></validation-errors> -->\n\n                        <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n                        <compose view=\"${getPayInstructionPartial(pi)}\"></compose>\n                    </div>\n                </div>\n            </form>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 text-left\">\n                        <button class=\"btn btn-secondary\" click.trigger=\"dialogController.cancel()\">Cancel</button>\n                    </div>\n                    <div class=\"col-sm-6 text-right\">\n                        <button class=\"btn btn-primary\" click.trigger=\"save()\">Save</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>\n</template>    "; });
define('pay-code/pay-code-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-validation", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaValidation, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PayCodeModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var PayCodeModal = exports.PayCodeModal = (_dec = (0, _aureliaFramework.inject)(_aureliaValidation.ValidationControllerFactory, _aureliaDialog.DialogController), _dec(_class = function () {
        function PayCodeModal(controllerFactory, dialogController) {
            _classCallCheck(this, PayCodeModal);

            this.dialogController = dialogController;
            this.validationController = controllerFactory.createForCurrentScope();
            this.client = new _aureliaHttpClient.HttpClient();
        }

        PayCodeModal.prototype.activate = function activate(state) {
            this.state = state;

            this.setupValidationRules();
        };

        PayCodeModal.prototype.setupValidationRules = function setupValidationRules() {};

        PayCodeModal.prototype.save = function save() {
            var _this = this;

            this.validationController.validate().then(function (result) {
                if (result.valid) {
                    _this.client.post("/api/employer/" + _this.state.employerId + "/payCode", _this.state).then(function (res) {
                        var parsedResponse = JSON.parse(res.response);

                        _this.apiErrors = null;

                        if (parsedResponse.errors) {
                            _this.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this.dialogController.ok(parsedResponse.status);
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        return PayCodeModal;
    }()) || _class);
});
define('text!pay-code/pay-code-modal.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n    \n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>Pay code</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <div class=\"pay-code-modal-container\">\n                <div class=\"container-fluid\">\n                    <form>\n                        <validation-errors errors.bind=\"validationController.errors\"></validation-errors>\n        \n                        <api-errors errors.bind=\"apiErrors\"></api-errors>\n        \n                        <ul class=\"nav nav-pills nav-fill\" id=\"subTab\" role=\"tablist\">\n                            <li class=\"nav-item\">\n                                <a class=\"nav-link active\" id=\"details-tab\" data-toggle=\"tab\" href=\"#details\" role=\"tab\" aria-controls=\"details\" aria-selected=\"true\">Details</a>\n                            </li>\n                            <li class=\"nav-item\">\n                                <a class=\"nav-link\" id=\"advanced-tab\" data-toggle=\"tab\" href=\"#advanced\" role=\"tab\" aria-controls=\"advanced\" aria-selected=\"false\">Advanced</a>\n                            </li>\n                        </ul>\n\n                        <div class=\"tab-content\" id=\"mySubTabContent\">\n                            <div class=\"tab-pane fade show active\" id=\"details\" role=\"tabpanel\" aria-labelledby=\"details-tab\">\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12 col-md-6\">\n\n                                    </div>\n\n                                    <div class=\"col-sm-12 col-md-6\">\n                                        \n                                    </div>                                    \n                                </div>\n                            </div>\n                \n                            <div class=\"tab-pane fade\" id=\"advanced\" role=\"tabpanel\" aria-labelledby=\"advanced-tab\">\n                                <div class=\"row\">\n                                    <div class=\"col-sm-12 col-md-6\">\n                                        <div class=\"form-group\">\n                                            <label for=\"Revision\">Revision</label>\n                                            <input type=\"number\" \n                                                class=\"form-control\" \n                                                id=\"Revision\" \n                                                name=\"Revision\" \n                                                value.bind=\"state.Revision\" \n                                                placeholder=\"Revision number\"\n                                                readonly \n                                                step=\"1\" \n                                                min=\"0\">\n                                        </div>\n                                    </div>\n                \n                                    <div class=\"col-sm-12 col-md-6\">\n                                        <div class=\"form-group\">\n                                            <label for=\"EffectiveDate\">Effective date</label>\n                                            <input type=\"date\" \n                                                class=\"form-control\" \n                                                id=\"EffectiveDate\" \n                                                name=\"EffectiveDate\" \n                                                value.bind=\"state.EffectiveDate & validate\"\n                                                placeholder=\"Date the revision will come into effect\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 text-left\">\n                        <button class=\"btn btn-secondary\" click.trigger=\"dialogController.cancel()\">Cancel</button>\n                    </div>\n                    <div class=\"col-sm-6 text-right\">\n                        <button class=\"btn btn-primary\" click.trigger=\"save()\">Save</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>    \n</template>"; });
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
            config.settings.centerHorizontalOnly = true;
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
define('job/job-details-modal',["exports", "aurelia-framework", "aurelia-dialog", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaDialog, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.JobDetailsModal = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var JobDetailsModal = exports.JobDetailsModal = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function JobDetailsModal(dialogController) {
            _classCallCheck(this, JobDetailsModal);

            this.dialogController = dialogController;
            this.client = new _aureliaHttpClient.HttpClient();
        }

        JobDetailsModal.prototype.activate = function activate(job) {
            this.job = job;

            return this.getJobInfo();
        };

        JobDetailsModal.prototype.getJobInfo = function getJobInfo() {
            var _this = this;

            return new Promise(function (resolve) {
                var url = "/api/job/" + _this.job.id + "/" + _this.job.type;

                _this.client.get(url).then(function (data) {
                    _this.state = JSON.parse(data.response);

                    window.setTimeout(function () {
                        return _this.getJobInfo();
                    }, 500);

                    resolve();
                });
            });
        };

        return JobDetailsModal;
    }()) || _class);
});
define('text!job/job-details-modal.html', ['module'], function(module) { module.exports = "<template>\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>${state.Title}</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <div class=\"container-fluid\">\n                <div class=\"job-info\">\n                    <div class=\"row\" if.bind=\"state.Errors.length > 0\">\n                        <div class=\"col-sm-12\">\n                            <div class=\"alert alert-danger\" role=\"alert\">\n                                <p>\n                                    <strong>This job contains the following errors:</strong>\n                                </p>\n            \n                                <ul>\n                                    <li repeat.for=\"error of state.Errors\">${error}</li>\n                                </ul>\n                            </div>            \n                        </div>\n                    </div>\n                \n                    <div class=\"row\">\n                        <div class=\"col-sm-12\">\n                            <strong>Progress</strong>\n                        </div>\n                \n                        <div class=\"col-sm-12\">\n                            <div class=\"progress\">\n                                <div class=\"progress-bar progress-bar-striped progress-bar-animated\" \n                                    role=\"progressbar\"\n                                    style=\"width: ${state.Progress}%\"></div>\n                            </div>        \n                        </div>\n                    </div>\n                \n                    <div class=\"row\">\n                        <div class=\"col-sm-12 col-md-6\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Status</strong>\n                                </div>\n                \n                                <div class=\"col-sm-12\">\n                                    ${state.JobStatus}\n                                </div>            \n                            </div>\n                \n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Job Id</strong>\n                                </div>\n                \n                                <div class=\"col-sm-12\">\n                                    ${state.JobId}\n                                </div>            \n                            </div>        \n                        </div>\n                \n                        <div class=\"col-sm-12 col-md-6\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Last updated on</strong>\n                                </div>\n                \n                                <div class=\"col-sm-12\">\n                                    ${state.LastUpdated | longDateTime}\n                                </div>            \n                            </div>\n                \n                            <div class=\"row\">\n                                <div class=\"col-sm-12\">\n                                    <strong>Created on</strong>\n                                </div>\n                \n                                <div class=\"col-sm-12\">\n                                    ${state.Created | longDateTime}\n                                </div>            \n                            </div>\n                        </div>    \n                    </div>\n                </div>\n            </div>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <button class=\"btn btn-primary\" click.trigger=\"dialogController.ok()\">Close</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>        \n</template>"; });
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
define('text!header/header.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container\">\n        <nav class=\"navbar\">\n            <a class=\"navbar-brand\" href=\"/#employers\">\n                <img src=\"https://www.payrun.io/images/logo-white-bg.png\">\n            </a>\n\n            <div class=\"justify-content-end\" id=\"navbarCollapse\" if.bind=\"showApiCallsButton\">\n                <ul class=\"navbar-nav\">\n                    <li class=\"nav-item d-none d-md-block\">\n                        <a class=\"nav-link view-api-calls\" href=\"#\" click.delegate=\"toggleAPICalls()\">View API calls</a>\n                    </li>\n                </ul>\n            </div>\n        </nav>\n    </div>    \n</template>"; });
define('footer/footer',["exports", "aurelia-framework", "aurelia-http-client", "aurelia-router", "github-buttons"], function (exports, _aureliaFramework, _aureliaHttpClient, _aureliaRouter, GitHubButtons) {
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

        Footer.prototype.attached = function attached() {
            var _this = this;

            this.showVersionInfo = this.router.currentInstruction.config.auth;

            GitHubButtons.render();

            return new Promise(function (resolve) {
                var client = new _aureliaHttpClient.HttpClient();

                client.get("/api/version").then(function (data) {
                    _this.state = JSON.parse(data.response);

                    resolve();
                });
            });
        };

        return Footer;
    }()) || _class);
});
define('text!footer/footer.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container footer\">\n        <div class=\"row\">\n            <div class=\"col-sm-6\">\n                <!-- Buttons from https://buttons.github.io/ -->\n                <a class=\"github-button\" href=\"https://github.com/X-API/PayRunIO.Demo.UI/fork\" data-size=\"large\" aria-label=\"Fork X-API/PayRunIO.Demo.UI on GitHub\">Fork</a>\n                <a class=\"github-button\" href=\"https://github.com/X-API/PayRunIO.Demo.UI/subscription\" data-size=\"large\" aria-label=\"Watch X-API/PayRunIO.Demo.UI on GitHub\">Watch</a>\n                <a class=\"github-button\" href=\"https://github.com/X-API/PayRunIO.Demo.UI/issues\" data-size=\"large\" aria-label=\"Issue X-API/PayRunIO.Demo.UI on GitHub\">Issues</a>\n                <a class=\"github-button\" href=\"https://github.com/X-API/PayRunIO.Demo.UI/archive/master.zip\" data-size=\"large\" aria-label=\"Download X-API/PayRunIO.Demo.UI on GitHub\">Download</a>\n            </div>\n            <div class=\"col-sm-6\" if.bind=\"showVersionInfo\">\n                <p>Demo Version: ${state.version}</p>\n                <p>API Version: ${state.apiVersion}</p>\n            </div>\n        </div>\n    </div>\n</template>"; });
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
define('employer/list',["exports", "aurelia-framework", "aurelia-http-client", "aurelia-dialog", "aurelia-event-aggregator", "../dialogs/confirm"], function (exports, _aureliaFramework, _aureliaHttpClient, _aureliaDialog, _aureliaEventAggregator, _confirm) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.List = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function List(dialogService, eventAggregator) {
            _classCallCheck(this, List);

            this.dialogService = dialogService;
            this.ea = eventAggregator;
            this.client = new _aureliaHttpClient.HttpClient();
        }

        List.prototype.activate = function activate() {
            return this.getEmployers();
        };

        List.prototype.getEmployers = function getEmployers() {
            var _this = this;

            return new Promise(function (resolve) {
                _this.ea.publish("request:processing");

                _this.client.get("/api/employers").then(function (data) {
                    _this.ea.publish("request:complete");

                    _this.employers = JSON.parse(data.response);

                    resolve();
                });
            });
        };

        List.prototype.deleteEmployer = function deleteEmployer(id) {
            var _this2 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this employer?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this2.ea.publish("request:processing");

                    _this2.client.delete("/api/employer/" + id).then(function (res) {
                        _this2.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this2.apiErrors = null;
                        _this2.status = null;

                        if (parsedResponse.errors) {
                            _this2.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this2.status = parsedResponse.status;
                        _this2.getEmployers();
                    });
                }
            });
        };

        return List;
    }()) || _class);
});
define('text!employer/list.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/status/status\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n\n    <status status.bind=\"status\"></status>\n    <api-errors errors.bind=\"apiErrors\"></api-errors>    \n\n    <div class=\"row actions\">\n        <div class=\"col-sm-12\">\n            <a class=\"btn btn-primary btn-lg\" href=\"#employer/\" role=\"button\">Add a new employer</a>\n        </div>\n    </div>\n\n    <table class=\"table\" if.bind=\"employers.length > 0\">\n        <thead>\n            <tr>\n                <th scope=\"col\">Name</th>\n                <th scope=\"col\">PAYE Ref</th>\n                <th scope=\"col\">Pay Schedules\n                    <div class=\"row th-subheader\">\n                        <div class=\"col-sm-12 col-md-12\">\n                            <div class=\"row\">\n                                <div class=\"col-sm-4\">\n                                    Name\n                                </div>      \n                                <div class=\"col-sm-2\">\n                                    Pay Frequency\n                                </div>   \n                                <div class=\"col-sm-2\">\n                                    Employees\n                                </div>   \n                                <div class=\"col-sm-2\">\n                                    Last Pay Date\n                                </div>   \n                                <div class=\"col-sm-2\">\n                                    Next Pay Date\n                                </div>   \n                            </div>\n                        </div>\n                    </div>\n                </th>\n                <th scope=\"col\" style=\"width:50px;\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"employer of employers\">\n                <th scope=\"row\">\n                    <a href=\"#employer/${employer.Key}\">\n                        ${employer.Name}\n                    </a>\n                </th>\n                <td>${employer.TaxOfficeNumber}/${employer.TaxOfficeReference}</td>\n                <td>\n                    <div class=\"row\" if.bind=\"employer.PaySchedule.length > 0\">\n                        <div class=\"col-sm-12 col-md-12\">\n                            <div class=\"row\" repeat.for=\"paySchedule of employer.PaySchedule\">\n                                <div class=\"col-sm-4\">\n                                    ${paySchedule.Name}\n                                </div>      \n                                <div class=\"col-sm-2\">\n                                    ${paySchedule.PayFrequency}\n                                </div>   \n                                <div class=\"col-sm-2\">\n                                    ${paySchedule.EmployeeCount}\n                                </div> \n                                <div class=\"col-sm-2\">\n                                    <span if.bind=\"paySchedule.LastPayDay\">${paySchedule.LastPayDay}</span>\n                                    <span if.bind=\"!paySchedule.LastPayDay\">\n                                        <em>Never</em>\n                                    </span>\n                                </div>\n                                <div class=\"col-sm-2\">\n                                    <span if.bind=\"paySchedule.NextPayDay\">${paySchedule.NextPayDay}</span>\n                                    <span if.bind=\"!paySchedule.NextPayDay\">-</span>\n                                </div>     \n                            </div>\n                        </div>\n                    </div>\n\n                    <a if.bind=\"employer.PaySchedule.length === 0\"\n                        class=\"btn btn-sm btn-default launch-modal\" \n                        data-modal-title=\"Add Pay Schedule\"\n                        href=\"#employer/${employer.Key}/paySchedule/new\" \n                        role=\"button\">Add a Pay Schedule</a>\n                </td>\n                <td>\n                    <button type=\"button\" \n                        class=\"btn btn-danger btn-sm\" \n                        click.delegate=\"deleteEmployer(employer.Key)\">\n                        Delete\n                    </button>                      \n                </td>\n            </tr>\n      </tbody>\n    </table>\n</template>"; });
define('employer/employer',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-http-client", "aurelia-dialog", "aurelia-router", "../pay-schedule/pay-schedule-modal", "../pension/pension-modal", "../pay-run/info-modal", "../pay-run/new-pay-run-modal", "../rti-transaction/rti-transaction-modal", "../dialogs/confirm", "../base-view-model"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaHttpClient, _aureliaDialog, _aureliaRouter, _payScheduleModal, _pensionModal, _infoModal, _newPayRunModal, _rtiTransactionModal, _confirm, _baseViewModel) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Employer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Employer = exports.Employer = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService, _aureliaRouter.Router), _dec(_class = function (_BaseViewModel) {
        _inherits(Employer, _BaseViewModel);

        function Employer(eventAggregator, dialogService, router) {
            _classCallCheck(this, Employer);

            var _this = _possibleConstructorReturn(this, _BaseViewModel.call(this, router));

            _this.employer = null;
            _this.ea = eventAggregator;
            _this.dialogService = dialogService;
            _this.client = new _aureliaHttpClient.HttpClient();
            return _this;
        }

        Employer.prototype.activate = function activate(params) {
            var _this2 = this;

            this.params = params;

            this.reloadEmployerSubscriber = this.ea.subscribe("employer:reload", function (state) {
                _this2.getEmployerDetails(state.employerId);
            });

            $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                scrollTop: 0
            }, 100);

            if (params && params.id) {
                return this.getEmployerDetails(params.id);
            }
        };

        Employer.prototype.attached = function attached() {
            _BaseViewModel.prototype.setParams.call(this, this.params);

            if (this.employer) {
                _BaseViewModel.prototype.setTitle.call(this, this.employer.Name);
            } else {
                _BaseViewModel.prototype.setTitle.call(this, "New Employer");
            }
        };

        Employer.prototype.deactivate = function deactivate() {
            if (this.reloadEmployerSubscriber) {
                this.reloadEmployerSubscriber.dispose();
            }

            if (this.getPaySchedulesTimeout) {
                window.clearTimeout(this.getPaySchedulesTimeout);
            }

            if (this.getRtiSubmissionsTimeout) {
                window.clearTimeout(this.getRtiSubmissionsTimeout);
            }
        };

        Employer.prototype.getEmployerDetails = function getEmployerDetails(employerId) {
            var _this3 = this;

            return new Promise(function (resolve) {
                _this3.ea.publish("request:processing");

                _this3.client.get("/api/employer/" + employerId).then(function (data) {
                    _this3.ea.publish("request:complete");

                    _this3.employer = JSON.parse(data.response);

                    _this3.createPaySchedulesTimer();
                    _this3.createRtiSubmissionsTimer();

                    resolve();
                });
            });
        };

        Employer.prototype.getPaySchedules = function getPaySchedules() {
            var _this4 = this;

            this.ea.publish("request:processing");

            this.client.get("/api/employer/" + this.employer.Id + "/pay-schedules").then(function (data) {
                _this4.ea.publish("request:complete");

                _this4.employer.PaySchedules = JSON.parse(data.response);

                _this4.createPaySchedulesTimer();
            });
        };

        Employer.prototype.createPaySchedulesTimer = function createPaySchedulesTimer() {
            var _this5 = this;

            this.getPaySchedulesTimeout = window.setTimeout(function () {
                return _this5.getPaySchedules();
            }, 15000);
        };

        Employer.prototype.getRtiSubmissions = function getRtiSubmissions() {
            var _this6 = this;

            this.ea.publish("request:processing");

            this.client.get("/api/employer/" + this.employer.Id + "/rti-submissions").then(function (data) {
                _this6.ea.publish("request:complete");

                _this6.employer.RTITransactions = JSON.parse(data.response);

                _this6.createRtiSubmissionsTimer();
            });
        };

        Employer.prototype.createRtiSubmissionsTimer = function createRtiSubmissionsTimer() {
            var _this7 = this;

            this.getRtiSubmissionsTimeout = window.setTimeout(function () {
                return _this7.getRtiSubmissions();
            }, 15000);
        };

        Employer.prototype.canAddPayRun = function canAddPayRun(context) {
            return context.Employees.length > 0 && context.PaySchedules && context.PaySchedules.length > 0;
        };

        Employer.prototype.addAPaySchedule = function addAPaySchedule() {
            this.openPayScheduleModal({});
        };

        Employer.prototype.editPaySchedule = function editPaySchedule(schedule) {
            this.openPayScheduleModal(schedule);
        };

        Employer.prototype.deletePaySchedule = function deletePaySchedule(schedule) {
            var _this8 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this pay schedule?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this8.ea.publish("request:processing");

                    _this8.client.post("/api/employer/" + _this8.employer.Id + "/paySchedule/" + schedule.Key + "/delete/").then(function (res) {
                        _this8.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this8.apiErrors = null;
                        _this8.status = null;

                        if (parsedResponse.errors) {
                            _this8.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this8.status = parsedResponse.status;
                        _this8.getEmployerDetails(_this8.employer.Id);
                    });
                }
            });
        };

        Employer.prototype.openPayScheduleModal = function openPayScheduleModal(schedule) {
            var _this9 = this;

            schedule.employerId = this.employer.Id;

            var opts = {
                viewModel: _payScheduleModal.PayScheduleModal,
                model: JSON.parse(JSON.stringify(schedule))
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this9.status = response.output;

                    _this9.getEmployerDetails(_this9.employer.Id);
                }
            });
        };

        Employer.prototype.addAPayCode = function addAPayCode() {
            this.openPayCodeModal({});
        };

        Employer.prototype.editPayCode = function editPayCode(payCode) {
            this.openPayCodeModal(payCode);
        };

        Employer.prototype.deletePayCode = function deletePayCode(employerId, payCodeId) {
            var _this10 = this;

            this.ea.publish("request:processing");

            this.client.delete("/api/employer/" + employerId + "/payCode/" + payCodeId).then(function (res) {
                _this10.ea.publish("request:complete");

                var parsedResponse = JSON.parse(res.response);

                _this10.apiErrors = null;
                _this10.status = null;

                if (parsedResponse.errors) {
                    _this10.apiErrors = parsedResponse.errors;
                    return;
                }

                _this10.status = parsedResponse.status;
                _this10.getEmployerDetails(employerId);
            });
        };

        Employer.prototype.openPayCodeModal = function openPayCodeModal(payCode) {
            var _this11 = this;

            pension.employerId = this.employer.Id;

            var opts = {
                viewModel: _pensionModal.PayCodeModal,
                model: JSON.parse(JSON.stringify(payCode))
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this11.status = response.output;

                    _this11.getEmployerDetails(_this11.employer.Id);
                }
            });
        };

        Employer.prototype.addAPension = function addAPension() {
            this.openPensionModal({});
        };

        Employer.prototype.editPension = function editPension(pension) {
            this.openPensionModal(pension);
        };

        Employer.prototype.defaultPensionForAE = function defaultPensionForAE(employerId, pensionId) {
            var _this12 = this;

            this.ea.publish("request:processing");

            this.client.patch("/api/employer/" + employerId + "/pension/" + pensionId).then(function (res) {
                _this12.ea.publish("request:complete");

                var parsedResponse = JSON.parse(res.response);

                _this12.apiErrors = null;
                _this12.status = null;

                if (parsedResponse.errors) {
                    _this12.apiErrors = parsedResponse.errors;
                    return;
                }

                _this12.status = parsedResponse.status;
                _this12.getEmployerDetails(employerId);
            });
        };

        Employer.prototype.deletePension = function deletePension(employerId, pensionId) {
            var _this13 = this;

            this.ea.publish("request:processing");

            this.client.delete("/api/employer/" + employerId + "/pension/" + pensionId).then(function (res) {
                _this13.ea.publish("request:complete");

                var parsedResponse = JSON.parse(res.response);

                _this13.apiErrors = null;
                _this13.status = null;

                if (parsedResponse.errors) {
                    _this13.apiErrors = parsedResponse.errors;
                    return;
                }

                _this13.status = parsedResponse.status;
                _this13.getEmployerDetails(employerId);
            });
        };

        Employer.prototype.openPensionModal = function openPensionModal(pension) {
            var _this14 = this;

            pension.employerId = this.employer.Id;

            var opts = {
                viewModel: _pensionModal.PensionModal,
                model: JSON.parse(JSON.stringify(pension))
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this14.status = response.output;

                    _this14.getEmployerDetails(_this14.employer.Id);
                }
            });
        };

        Employer.prototype.openPayRunInfoModal = function openPayRunInfoModal(employerId, payScheduleId, payRunId) {
            var _this15 = this;

            var url = "api/employer/" + employerId + "/paySchedule/" + payScheduleId + "/payRun/" + payRunId;

            this.ea.publish("request:processing");

            this.client.get(url).then(function (res) {
                _this15.ea.publish("request:complete");

                var payRun = JSON.parse(res.response);

                payRun.EmployerId = _this15.employer.Id;

                var opts = {
                    viewModel: _infoModal.InfoModal,
                    model: payRun
                };

                _this15.dialogService.open(opts);
            });
        };

        Employer.prototype.openAddPayRunModal = function openAddPayRunModal(employerId, payScheduleId) {
            var _this16 = this;

            var url = "/api/employer/" + employerId + "/paySchedule/" + payScheduleId + "/next-pay-run";

            this.ea.publish("request:processing");

            this.client.get(url).then(function (res) {
                _this16.ea.publish("request:complete");

                var nextPayRun = JSON.parse(res.response);

                var state = {
                    Title: "Create PayRun",
                    EmployerId: employerId,
                    PayScheduleId: payScheduleId,
                    PaymentDate: nextPayRun.paymentDate,
                    StartDate: nextPayRun.periodStart,
                    EndDate: nextPayRun.periodEnd,
                    PaySchedules: []
                };

                var opts = {
                    viewModel: _newPayRunModal.NewPayRunModal,
                    model: state
                };

                _this16.dialogService.open(opts).whenClosed(function (response) {
                    if (!response.wasCancelled) {
                        _this16.status = response.output;

                        _this16.getEmployerDetails(_this16.employer.Id);
                    }
                });
            });
        };

        Employer.prototype.openRerunPayRunModal = function openRerunPayRunModal(employerId, payScheduleId, payRun) {
            var _this17 = this;

            var state = {
                Title: "Rerun PayRun",
                Instruction: "Re-running will delete the previous run.",
                EmployerId: employerId,
                PayScheduleId: payScheduleId,
                PaymentDate: payRun.PaymentDate,
                StartDate: payRun.PeriodStart,
                EndDate: payRun.PeriodEnd,
                PaySchedules: []
            };

            var opts = {
                viewModel: _newPayRunModal.NewPayRunModal,
                model: state
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this17.status = response.output;

                    _this17.getEmployerDetails(_this17.employer.Id);
                }
            });
        };

        Employer.prototype.deletePayRun = function deletePayRun(employerId, payScheduleId, payRunId) {
            var _this18 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this pay run?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this18.ea.publish("request:processing");

                    _this18.client.delete("/api/employer/" + employerId + "/paySchedule/" + payScheduleId + "/payRun/" + payRunId).then(function (res) {
                        _this18.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this18.apiErrors = null;
                        _this18.status = null;

                        if (parsedResponse.errors) {
                            _this18.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this18.status = parsedResponse.status;
                        _this18.getEmployerDetails(employerId);
                    });
                }
            });
        };

        Employer.prototype.openAddRtiSubmissionModal = function openAddRtiSubmissionModal(employerId) {
            var _this19 = this;

            this.ea.publish("request:processing");

            this.client.get("/api/employer/" + employerId + "/payRuns").then(function (res) {
                _this19.ea.publish("request:complete");

                var payRuns = JSON.parse(res.response);

                var opts = {
                    viewModel: _rtiTransactionModal.RtiTransactionModal,
                    model: {
                        employerId: employerId,
                        payRuns: payRuns
                    }
                };

                _this19.dialogService.open(opts).whenClosed(function (response) {
                    if (!response.wasCancelled) {
                        _this19.status = response.output;

                        _this19.getEmployerDetails(_this19.employer.Id);
                    }
                });
            });
        };

        Employer.prototype.deleteEmployee = function deleteEmployee(employerId, employeeId) {
            var _this20 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this employee?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this20.ea.publish("request:processing");

                    _this20.client.delete("/api/employer/" + employerId + "/employee/" + employeeId).then(function (res) {
                        _this20.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this20.apiErrors = null;
                        _this20.status = null;

                        if (parsedResponse.errors) {
                            _this20.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this20.status = parsedResponse.status;
                        _this20.getEmployerDetails(employerId);
                    });
                }
            });
        };

        return Employer;
    }(_baseViewModel.BaseViewModel)) || _class);
});
define('text!employer/employer.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./employer-form\"></require>\n    <require from=\"../resources/elements/status/status\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n\n    <status status.bind=\"status\"></status>\n    \n    <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n    <div if.bind=\"employer\">\n        <ul class=\"nav nav-tabs nav-fill\" id=\"myTab\" role=\"tablist\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link active\" id=\"home-tab\" data-toggle=\"tab\" href=\"#home\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">Employer</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"schedules-tab\" data-toggle=\"tab\" href=\"#schedules\" role=\"tab\" aria-controls=\"schedules\" aria-selected=\"false\">Pay Schedules</a>\n            </li>        \n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"employees-tab\" data-toggle=\"tab\" href=\"#employees\" role=\"tab\" aria-controls=\"employees\" aria-selected=\"false\">Employees</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"pensions-tab\" data-toggle=\"tab\" href=\"#pensions\" role=\"tab\" aria-controls=\"pensions\" aria-selected=\"false\">Pensions</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"pay-codes-tab\" data-toggle=\"tab\" href=\"#pay-codes\" role=\"tab\" aria-controls=\"pay-codes\" aria-selected=\"false\">Pay codes</a>\n            </li>            \n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"runs-tab\" data-toggle=\"tab\" href=\"#runs\" role=\"tab\" aria-controls=\"runs\" aria-selected=\"false\">Pay Runs</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"rti-submissions-tab\" data-toggle=\"tab\" href=\"#rti-submissions\" role=\"tab\" aria-controls=\"rti-submissions\" aria-selected=\"false\">RTI Submissions</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"reports-tab\" data-toggle=\"tab\" href=\"#reports\" role=\"tab\" aria-controls=\"reports\" aria-selected=\"false\">Reports</a>\n            </li>       \n        </ul>\n    \n        <div class=\"tab-content\" id=\"myTabContent\">\n            <div class=\"tab-pane fade show active\" id=\"home\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\n                <employer-form employer.bind=\"employer\"></employer-form>\n            </div>\n            \n            <div class=\"tab-pane fade\" id=\"employees\" role=\"tabpanel\" aria-labelledby=\"employees-tab\">\n                <div class=\"row actions\">\n                    <div class=\"col-sm-12\">\n                        <a class=\"btn btn-primary\" href=\"#employer/${employer.Id}/employee\" role=\"button\">Add a new employee</a>\n                    </div>\n                </div>\n    \n                <table class=\"table\" if.bind=\"employer.Employees.length > 0\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Code</th>\n                            <th scope=\"col\">Name</th>\n                            <th width=\"50px\"></th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr repeat.for=\"employee of employer.Employees\">\n                            <th scope=\"row\">\n                                <a href=\"#employer/${employer.Id}/employee/${employee.Id}\">\n                                    ${employee.Code}\n                                </a>\n                            </th>\n                            <td>${employee | employeeName}</td>\n                            <td>\n                                <button type=\"button\" \n                                    class=\"btn btn-danger btn-sm\" \n                                    click.delegate=\"deleteEmployee(employer.Id, employee.Id)\">\n                                    Delete\n                                </button>                             \n                            </td>\n                        </tr>\n                    </tbody>\n                </table>                           \n            </div>\n            \n            <div class=\"tab-pane fade\" id=\"schedules\" role=\"tabpanel\" aria-labelledby=\"schedules-tab\">\n                <div class=\"row actions\">\n                    <div class=\"col-sm-12\">\n                        <a class=\"btn btn-primary\"\n                            href=\"#\" \n                            role=\"button\" \n                            click.delegate=\"addAPaySchedule()\">Add a Pay Schedule</a>\n                    </div>\n                </div>\n    \n                <table class=\"table\" if.bind=\"employer.PaySchedules.length > 0\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Id</th>\n                            <th scope=\"col\">Name</th>\n                            <th scope=\"col\">Frequency</th>\n                            <th scope=\"col\">Employees</th>\n                            <th scope=\"col\">Last Pay Day</th>\n                            <th scope=\"col\">Next Pay Day</th>\n                            <th width=\"50px\"></th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr repeat.for=\"schedule of employer.PaySchedules\">\n                            <th scope=\"row\">\n                                <a href=\"#\" click.delegate=\"editPaySchedule(schedule)\">\n                                    ${schedule.Key}\n                                </a>\n                            </th>\n                            <td>${schedule.Name}</td>\n                            <td>${schedule.PayFrequency}</td>\n                            <td>${schedule.EmployeeCount}</td>\n                            <td>\n                                <span if.bind=\"schedule.LastPayDay\">${schedule.LastPayDay}</span>\n\n                                <span if.bind=\"!schedule.LastPayDay\">\n                                    <em>Never</em>\n                                </span>\n                            </td>\n                            <td>\n                                <span if.bind=\"schedule.NextPayDay\">${schedule.NextPayDay}</span>\n\n                                <span if.bind=\"!schedule.NextPayDay\">-</span>\n                            </td>\n                            <td>\n                                <button type=\"button\" \n                                    class=\"btn btn-danger btn-sm btn-delete-pay-schedule\" \n                                    click.delegate=\"deletePaySchedule(schedule)\">\n                                    Delete\n                                </button>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n    \n            <div class=\"tab-pane fade\" id=\"runs\" role=\"tabpanel\" aria-labelledby=\"runs-tab\">\n                <div class=\"card bg-light\" if.bind=\"!canAddPayRun(employer)\">\n                    <div class=\"card-header\">Pay Runs</div>\n                    <div class=\"card-body\">\n                        <p class=\"card-text\">\n                            Add a <strong>Pay Schedule</strong> and an <strong>Employee</strong> before starting a pay run.\n                        </p>\n                    </div>\n                </div>\n        \n                <div class=\"card bg-light\" repeat.for=\"schedule of employer.PaySchedules\" if.bind=\"canAddPayRun(employer)\">\n                    <div class=\"card-header\">\n                        <h6 class=\"float-left\">${schedule.Name}</h6>\n                    </div>\n                    <div class=\"card-body\">\n                        <table class=\"table\" if.bind=\"schedule.PayRuns.length > 0\">\n                            <thead>\n                                <tr>\n                                    <th scope=\"col\">Payment Date</th>\n                                    <th scope=\"col\">Tax Period</th>\n                                    <th scope=\"col\">Pay Period</th>\n                                    <th scope=\"col\">Supplementary</th>\n                                    <th scope=\"col\">\n                                        <button class=\"btn btn-sm btn-primary launch-modal float-right\" \n                                            type=\"button\" \n                                            role=\"button\" \n                                            click.delegate=\"openAddPayRunModal(employer.Id, schedule.Key)\">Add PayRun</button>\n                                    </th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr repeat.for=\"payrun of schedule.PayRuns\">\n                                    <th scope=\"row\">\n                                        <a href=\"#\" click.delegate=\"openPayRunInfoModal(employer.Id, schedule.Key, payrun.Key)\">\n                                            ${payrun.PaymentDate | shortDate}\n                                        </a>\n                                    </th>\n                                    <td>${payrun.TaxYear}/${payrun.TaxPeriod}</td>\n                                    <td>${payrun.PeriodStart | shortDate} - ${payrun.PeriodEnd | shortDate}</td>\n                                    <td>${payrun.IsSupplementary}</td>\n                                    <td class=\"text-right\">\n                                        <button if.bind=\"schedule.HeadSequence == payrun.Sequence\"\n                                            type=\"button\" \n                                            class=\"btn btn-sm btn-rerun-pay-run launch-modal\" \n                                            data-modal-title=\"Rerun PayRun\" \n                                            click.delegate=\"openRerunPayRunModal(employer.Id, schedule.Key, payrun)\">Rerun</button>\n                                        </button>\n                                        \n                                        <button if.bind=\"schedule.HeadSequence == payrun.Sequence\"\n                                            type=\"button\" \n                                            class=\"btn btn-danger btn-sm btn-delete-pay-run\" \n                                            click.delegate=\"deletePayRun(employer.Id, schedule.Key, payrun.Key)\">Delete</button>          \n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n\n                        <p class=\"card-text\" if.bind=\"schedule.PayRuns.length === 0\">\n                            There are currently no payruns for this pay schedule.\n                            \n                            <a class=\"btn btn-sm btn-primary launch-modal\" \n                                href=\"#employer/${employer.Id}/payRun?paySchedule=${schedule.Key}\" \n                                data-modal-title=\"Create PayRun\"\n                                role=\"button\">Add PayRun</a>\n                        </p>\n                    </div>\n                </div>\n            </div>\n    \n            <div class=\"tab-pane fade\" id=\"pensions\" role=\"tabpanel\" aria-labelledby=\"pensions-tab\">\n                <div class=\"row actions\">\n                    <div class=\"col-sm-12\">\n                        <button class=\"btn btn-primary\" type=\"button\" role=\"button\" click.delegate=\"addAPension()\">Add a Pension</button>\n                    </div>\n                </div>\n    \n                <table class=\"table\" if.bind=\"employer.Pensions.length > 0\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Id</th>\n                            <th scope=\"col\">Scheme</th>\n                            <th scope=\"col\">Provider</th>\n                            <th scope=\"col\">Provider Employer Ref</th>\n                            <th width=\"200px\"></th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr repeat.for=\"pension of employer.Pensions\">\n                            <th scope=\"row\">\n                                <a href=\"#\" click.delegate=\"editPension(pension)\">\n                                    ${pension.Id}\n                                </a>                            \n                            </th>\n                            <td>${pension.SchemeName}</td>\n                            <td>${pension.ProviderName}</td>\n                            <td>${pension.ProviderEmployerRef}</td>\n                            <td>\n                                <button if.bind=\"!pension.UseForAutoEnrolment\"\n                                    type=\"button\" \n                                    class=\"btn btn-primary btn-sm btn-default-for-ae\" \n                                    click.delegate=\"defaultPensionForAE(employer.Id, pension.Id)\">\n                                    Default for AE\n                                </button>\n    \n                                <button type=\"button\" \n                                    class=\"btn btn-danger btn-sm btn-delete-pension\" \n                                    click.delegate=\"deletePension(employer.Id, pension.Id)\">\n                                    Delete\n                                </button>                             \n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n\n            <div class=\"tab-pane fade\" id=\"pay-codes\" role=\"tabpanel\" aria-labelledby=\"pay-codes-tab\">\n                <div class=\"row actions\">\n                    <div class=\"col-sm-12\">\n                        <button class=\"btn btn-primary\" type=\"button\" role=\"button\" click.delegate=\"addAPayCode()\">Add a Pay code</button>\n                    </div>\n                </div>\n    \n                <table class=\"table\" if.bind=\"employer.PayCodes.length > 0\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Code</th>\n                            <th scope=\"col\">Scheme</th>\n                            <th scope=\"col\">Provider</th>\n                            <th scope=\"col\">Provider Employer Ref</th>\n                            <th width=\"200px\"></th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr repeat.for=\"code of employer.PayCodes\">\n                            <th scope=\"row\">\n                                <a href=\"#\" click.delegate=\"editPayCode(code)\">\n                                    ${code.Code}\n                                </a>                            \n                            </th>\n                            <td>${code.Description}</td>\n                            <td>${code.Type}</td>\n                            <td>\n                                <button type=\"button\" \n                                    class=\"btn btn-danger btn-sm btn-delete-pay-code\" \n                                    click.delegate=\"deletePayCode(employer.Id, code.Id)\">\n                                    Delete\n                                </button>                             \n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>            \n    \n            <div class=\"tab-pane fade\" id=\"rti-submissions\" role=\"tabpanel\" aria-labelledby=\"rti-submissions-tab\">\n                <div class=\"row actions\" if.bind=\"employer.PayRuns\">\n                    <div class=\"col-sm-12\">\n                        <button class=\"btn btn-primary launch-modal\" \n                            type=\"button\" \n                            click.delegate=\"openAddRtiSubmissionModal(employer.Id)\">Make FPS Submission</button>\n                    </div>\n                </div>\n\n                <div class=\"card bg-light\" if.bind=\"!employer.PayRuns\">\n                    <div class=\"card-header\">RTI submissions</div>\n                    <div class=\"card-body\">\n                        <p class=\"card-text\">\n                            Start a new <strong>Pay Run</strong> before creating an RTI submission.\n                        </p>\n                    </div>\n                </div>\n    \n                <table class=\"table\" if.bind=\"employer.RTITransactions.length > 0\">\n                    <thead>\n                        <tr>\n                            <th scope=\"col\">Id</th>\n                            <th scope=\"col\">Tax Year</th>\n                            <th scope=\"col\">Transmission Date</th>\n                            <th scope=\"col\">Transaction Status</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr repeat.for=\"transaction of employer.RTITransactions\">\n                            <th scope=\"row\">\n                                <a href=\"/api/employer/${employer.Id}/rtiTransaction/${transaction.Id}\" target=\"_blank\">\n                                    ${transaction.Id}\n                                </a>\n                            </th> \n                            <td>${transaction.TaxYear}</td>\n                            <td>${transaction.TransmissionDate | longDateTime}</td>\n                            <td>${transaction.TransactionStatus}</td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>    \n    \n            <div class=\"tab-pane fade\" id=\"reports\" role=\"tabpanel\" aria-labelledby=\"reports-tab\">\n                <div class=\"coming-soon\">\n                    <h4>Coming soon!</h4>\n                    <p>Check soon to see this functionality wired up with the API</p>\n                </div>\n            </div>\n    \n        </div>\n    </div>\n\n    <div if.bind=\"!employer\">\n        <employer-form employer.bind=\"employer\"></employer-form>\n    </div>\n    \n    <input id=\"employer-id\" type=\"hidden\" value=\"${employer.Id}\">  \n</template>"; });
define('employer/employer-form',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-http-client", "aurelia-validation", "aurelia-dialog", "../dialogs/confirm"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaHttpClient, _aureliaValidation, _aureliaDialog, _confirm) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.EmployerForm = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var EmployerForm = exports.EmployerForm = (_dec = (0, _aureliaFramework.customElement)("employer-form"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationControllerFactory, _aureliaDialog.DialogService), _dec(_class = _dec2(_class = (_class2 = function () {
        function EmployerForm(EventAggregator, controllerFactory, dialogService) {
            _classCallCheck(this, EmployerForm);

            _initDefineProp(this, "employer", _descriptor, this);

            this.validationSetup = false;

            this.ea = EventAggregator;
            this.client = new _aureliaHttpClient.HttpClient();
            this.validationController = controllerFactory.createForCurrentScope();
            this.dialogService = dialogService;
            this.showSaveButton = true;
        }

        EmployerForm.prototype.attached = function attached() {
            if (!this.employer) {
                this.employer = {
                    Territory: "UnitedKingdom",
                    Region: "NotSet"

                };
            }

            this.setupTabEvents();
            this.setupValidationRules();
        };

        EmployerForm.prototype.detached = function detached() {};

        EmployerForm.prototype.save = function save() {
            var _this = this;

            this.validationController.validate().then(function (result) {
                if (result.valid) {
                    _this.ea.publish("request:processing");

                    _this.client.post("/api/Employer", _this.employer).then(function (res) {
                        _this.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this.apiErrors = null;
                        _this.status = null;

                        if (parsedResponse.errors) {
                            _this.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this.status = parsedResponse.status;

                        _this.ea.publish("employer:reload", {
                            employerId: parsedResponse.employerId
                        });
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        EmployerForm.prototype.setupTabEvents = function setupTabEvents() {
            var _this2 = this;

            $("a[data-toggle='tab']").on("shown.bs.tab", function (e) {
                _this2.showSaveButton = e.target.id !== "revisions-tab";
            });
        };

        EmployerForm.prototype.setupValidationRules = function setupValidationRules() {
            _aureliaValidation.ValidationRules.ensure("Name").required().withMessage("Details > Name is required").ensure("EffectiveDate").required().withMessage("Details > Effective date is required").on(this.employer);
        };

        EmployerForm.prototype.deleteRevision = function deleteRevision(revision) {
            var _this3 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this revision?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var employerId = _this3.employer.Id;
                    var effectiveDate = revision.EffectiveDate;
                    var url = "/api/employer/" + employerId + "/revision/" + effectiveDate;

                    _this3.ea.publish("request:processing");

                    _this3.client.delete(url).then(function (res) {
                        _this3.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this3.apiErrors = null;
                        _this3.status = null;

                        if (parsedResponse.errors) {
                            _this3.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this3.status = parsedResponse.status;
                        _this3.employer.Revisions = _this3.employer.Revisions.filter(function (rev) {
                            return rev.Revision !== revision.Revision;
                        });

                        _this3.ea.publish("employer:reload", { employerId: employerId });
                    });
                }
            });
        };

        return EmployerForm;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "employer", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class);
});
define('text!employer/employer-form.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../resources/elements/bank-account-form/bank-account-form\"></require>\n    <require from=\"../resources/elements/address-form/address-form\"></require>\n    <require from=\"../resources/elements/rule-exclusions/rule-exclusions\"></require>\n    <require from=\"../resources/elements/pay-schedule-dropdown/pay-schedule-dropdown\"></require>\n    <require from=\"../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n    <require from=\"../resources/elements/status/status\"></require>\n        \n    <validation-errors errors.bind=\"validationController.errors\"></validation-errors>\n    \n    <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n    <status status.bind=\"status\"></status>\n\n    <form>    \n        <ul class=\"nav nav-pills nav-fill\" id=\"subTab\" role=\"tablist\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link active\" id=\"details-tab\" data-toggle=\"tab\" href=\"#details\" role=\"tab\" aria-controls=\"details\" aria-selected=\"true\">Details</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"hmrc-tab\" data-toggle=\"tab\" href=\"#hmrc\" role=\"tab\" aria-controls=\"hmrc\" aria-selected=\"false\">RTI Settings</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"ae-tab\" data-toggle=\"tab\" href=\"#ae\" role=\"tab\" aria-controls=\"ae\" aria-selected=\"false\">Auto Enrolment</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"bankaccount-tab\" data-toggle=\"tab\" href=\"#bankaccount\" role=\"tab\" aria-controls=\"bankaccount\" aria-selected=\"false\">Bank Account</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"advanced-tab\" data-toggle=\"tab\" href=\"#advanced\" role=\"tab\" aria-controls=\"advanced\" aria-selected=\"false\">Advanced</a>\n            </li>\n            <li class=\"nav-item\" if.bind=\"employer.Id\">\n                <a class=\"nav-link\" id=\"revisions-tab\" data-toggle=\"tab\" href=\"#revisions\" role=\"tab\" aria-controls=\"revisions\" aria-selected=\"false\">Revisions</a>\n            </li>\n        </ul>\n    \n        <div class=\"tab-content\" id=\"mySubTabContent\">\n    \n            <div class=\"tab-pane fade show active\" id=\"details\" role=\"tabpanel\" aria-labelledby=\"details-tab\">\n    \n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-8\">\n                        <div class=\"form-group\">\n                            <label for=\"name\">Name</label>\n                            <input type=\"text\" \n                                class=\"form-control form-control-lg\" \n                                id=\"Name\" \n                                name=\"Name\" \n                                value.bind=\"employer.Name\" \n                                placeholder=\"Legal name of the employer\"\n                                maxlength=\"35\" />\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-4\">\n                        <div class=\"form-group\">\n                            <label for=\"EffectiveDate\">Effective date</label>\n                            <input type=\"date\" \n                                class=\"form-control form-control-lg\" \n                                id=\"EffectiveDate\" \n                                name=\"EffectiveDate\" \n                                value.bind=\"employer.EffectiveDate\"\n                                placeholder=\"Date the revision will come into effect\" />\n                        </div>\n                    </div>\n                </div>\n    \n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"TaxOfficeNumber\">Tax office number</label>\n    \n                            <input type=\"number\" class=\"form-control\" id=\"TaxOfficeNumber\" name=\"HmrcSettings[TaxOfficeNumber]\" value.bind=\"employer.HmrcSettings.TaxOfficeNumber\"\n                                placeholder=\"Tax office number\" step=\"1\" maxlength=\"3\">\n    \n                            <span class=\"notes\">\n                                The Tax Office Number is the first part of your employer's PAYE reference issued by HMRC; it consists of 3 numbers. Required\n                                to make RTI submissions.\n                            </span>\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"TaxOfficeReference\">Tax office reference</label>\n    \n                            <input type=\"text\" class=\"form-control\" id=\"TaxOfficeReference\" name=\"HmrcSettings[TaxOfficeReference]\" value.bind=\"employer.HmrcSettings.TaxOfficeReference\"\n                                placeholder=\"Tax office reference\" maxlength=\"10\" />\n    \n                            <span class=\"notes\">\n                                The Tax Office Reference is the second part of your employer's PAYE refernce issued by HMRC; it consists of up to 10 apha-numeric\n                                charaters. Required to make RTI submissions.\n                            </span>\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"AccountingOfficeRef\">Accounting office ref</label>\n    \n                            <input type=\"text\" class=\"form-control\" id=\"AccountingOfficeRef\" name=\"HmrcSettings[AccountingOfficeRef]\" value.bind=\"employer.HmrcSettings.AccountingOfficeRef\"\n                                placeholder=\"Tax office reference\">\n    \n                            <span class=\"notes\">\n                                The Accounting Office Reference is issued by HMRC; typically it is found on employer's P30BC Employer Payment Booklet. Required\n                                to make RTI submissions.\n                            </span>\n                        </div>\n    \n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"ClaimEmploymentAllowance\" name=\"ClaimEmploymentAllowance\" checked.bind=\"employer.ClaimEmploymentAllowance\">\n    \n                            <label class=\"form-check-label\" for=\"ClaimEmploymentAllowance\">\n                                Claim employment allowance\n    \n                                <span class=\"notes\">\n                                    See\n                                    <a href=\"https://developer.payrun.io/docs/payroll-help/claiming-employment-allowance.html\" target=\"_blank\">Claiming the Employment Allowance</a> for more details.\n                                </span>\n                            </label>\n                        </div>\n    \n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"ClaimSmallEmployerRelief\" name=\"ClaimSmallEmployerRelief\" checked.bind=\"employer.ClaimSmallEmployerRelief\">\n    \n                            <label class=\"form-check-label\" for=\"ClaimSmallEmployerRelief\">\n                                Claim small employer relief\n    \n                                <span class=\"notes\">\n                                    See\n                                    <a href=\"https://developer.payrun.io/docs/payroll-help/claiming-small-employer-relief.html\" target=\"_blank\">Claiming Small Employer Relief</a> for more details.\n                                </span>\n                            </label>\n                        </div>\n    \n                    </div>\n                    <div class=\"col-sm-12 col-md-6\">\n                        <address-form address.bind=\"employer.Address\"></address-form>\n                    </div>\n                </div>\n            </div>\n    \n            <div class=\"tab-pane fade\" id=\"bankaccount\" role=\"tabpanel\" aria-labelledby=\"bankaccount-tab\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <bank-account-form bankaccount.bind=\"employer.BankAccount\"></bank-account-form>\n                    </div>\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"BacsServiceUserNumber\">Bacs service user number</label>\n    \n                            <input type=\"number\" class=\"form-control\" id=\"BacsServiceUserNumber\" name=\"BacsServiceUserNumber\" value.bind=\"employer.BacsServiceUserNumber\"\n                                placeholder=\"Unique identifier making payments throught the BACS network\" step=\"1\" />\n                        </div>\n                    </div>\n                </div>\n            </div>\n    \n            <div class=\"tab-pane fade\" id=\"hmrc\" role=\"tabpanel\" aria-labelledby=\"hmrc-tab\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"Sender\">Sender</label>\n    \n                            <select class=\"form-control\" id=\"Sender\" name=\"HmrcSettings[Sender]\" value.bind=\"employer.HmrcSettings.Sender\">\n                                <option value=\"Individual\">Individual</option>\n                                <option value=\"Company\">Company</option>\n                                <option value=\"Agent\">Agent</option>\n                                <option value=\"Bureau\">Bureau</option>\n                                <option value=\"Partnership\">Partnership</option>\n                                <option value=\"Trust\">Trust</option>\n                                <option value=\"Employer\">Employer</option>\n                                <option value=\"Government\">Government</option>\n                                <option value=\"ActingInCapacity\">ActingInCapacity</option>\n                                <option value=\"Other\">Other</option>\n                            </select>\n    \n                            <span class=\"notes\">The entity type that is making the RTI submission on behalf of the employer. Required to make\n                                RTI submissions.</span>\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"SenderId\">Sender Id</label>\n    \n                            <input type=\"text\" class=\"form-control\" id=\"SenderId\" name=\"HmrcSettings[SenderId]\" value.bind=\"employer.HmrcSettings.SenderId\" placeholder=\"Government gateway username issued to the employer by HMRC\"\n                                maxlength=\"35\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"Password\">Password</label>\n    \n                            <input type=\"text\" class=\"form-control\" id=\"Password\" name=\"HmrcSettings[Password]\" value.bind=\"employer.HmrcSettings.Password\" placeholder=\"Government gateway password issued to the employer by HMRC\"\n                                maxlength=\"35\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"SAUTR\">SAUTR</label>\n    \n                            <input type=\"number\" class=\"form-control\" id=\"SAUTR\" name=\"HmrcSettings[SAUTR]\" value.bind=\"employer.HmrcSettings.SAUTR\" placeholder=\"Self Assessment Unique Tax reference; only applicable to sole proprietors or partnerships.\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"COTAXRef\">COTAX Ref</label>\n    \n                            <input type=\"number\" class=\"form-control\" id=\"COTAXRef\" name=\"HmrcSettings[COTAXRef]\" value.bind=\"employer.HmrcSettings.COTAXRef\" placeholder=\"Corporation Tax reference; applicable to limited companies.\">\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-6\">\n    \n                        <div class=\"form-group\">\n                            <label for=\"ContactFirstName\">Contact first name</label>\n    \n                            <input type=\"text\" class=\"form-control\" id=\"ContactFirstName\" name=\"HmrcSettings[ContactFirstName]\" value.bind=\"employer.HmrcSettings.ContactFirstName\"\n                                placeholder=\"Designated HMRC contact person's first name\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"ContactLastName\">Contact last name</label>\n    \n                            <input type=\"text\" class=\"form-control\" id=\"ContactLastName\" name=\"HmrcSettings[ContactLastName]\" value.bind=\"employer.HmrcSettings.ContactLastName\"\n                                placeholder=\"Designated HMRC contact person's last name\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"ContactEmail\">Contact email</label>\n    \n                            <input type=\"email\" class=\"form-control\" id=\"ContactEmail\" name=\"HmrcSettings[ContactEmail]\" value.bind=\"employer.HmrcSettings.ContactEmail\"\n                                placeholder=\"Contact email\">\n    \n                            <span class=\"notes\">The designated HMRC contact person's email address; RTI submission acknowledgements will be sent\n                                to this address.</span>\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"ContactTelephone\">Contact telephone</label>\n    \n                            <input type=\"tel\" class=\"form-control\" id=\"ContactTelephone\" name=\"HmrcSettings[ContactTelephone]\" value.bind=\"employer.HmrcSettings.ContactTelephone\"\n                                placeholder=\"Designated HMRC contact person's telephone number\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"ContactFax\">Contact fax</label>\n    \n                            <input type=\"tel\" class=\"form-control\" id=\"ContactFax\" name=\"HmrcSettings[ContactFax]\" value.bind=\"employer.HmrcSettings.ContactFax\"\n                                placeholder=\"Designated HMRC contact person's fax number\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n    \n            <div class=\"tab-pane fade\" id=\"advanced\" role=\"tabpanel\" aria-labelledby=\"advanced-tab\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12 col-md-8\">\n                                <div class=\"form-group\" >\n                                    <label for=\"Territory\">Territory</label>\n    \n                                    <select class=\"form-control\" id=\"Territory\" name=\"Territory\" value.bind=\"employer.Territory\">\n                                        <option value=\"UnitedKingdom\">United Kingdom</option>\n                                    </select>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-12 col-md-4\">\n                                <div class=\"form-group\">\n                                    <label for=\"Region\">Region</label>\n    \n                                    <select class=\"form-control\" id=\"Region\" name=\"Region\" value.bind=\"employer.Region\">\n                                        <option value=\"NotSet\">Not Set</option>\n                                        <option value=\"England\">England</option>\n                                        <option value=\"Scotland\">Scotland</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"ApprenticeshipLevyAllowance\">Apprenticeship levy allowance</label>\n    \n                            <input type=\"number\" class=\"form-control\" id=\"ApprenticeshipLevyAllowance\" name=\"ApprenticeshipLevyAllowance\" value.bind=\"employer.ApprenticeshipLevyAllowance\"\n                                placeholder=\"The employer's annual levy allowance\" min=\"0\" max=\"15000\" />\n    \n                            <span class=\"notes\">The apprenticeship levy will only apply to employers with annual paybill in excess of £3 million.</span>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 col-md-6\">\n                        <rule-exclusions ruleexclusions.bind=\"employer.RuleExclusions\"></rule-exclusions>\n                    </div>\n                </div>\n            </div>\n    \n            <div class=\"tab-pane fade\" id=\"ae\" role=\"tabpanel\" aria-labelledby=\"ae-tab\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"StagingDate\">Staging date</label>\n                            <input type=\"date\" class=\"form-control\" id=\"StagingDate\" name=\"AutoEnrolment[StagingDate]\" value.bind=\"employer.AutoEnrolment.StagingDate\"\n                                placeholder=\"Auto enrolment staging date\" />\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"PostponementDate\">Postponement date</label>\n                            <input type=\"date\" class=\"form-control\" id=\"PostponementDate\" name=\"AutoEnrolment[PostponementDate]\" value.bind=\"employer.AutoEnrolment.PostponementDate\"\n                                placeholder=\"Optional auto enrolment deferment date\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"ReEnrolmentDayOffset\">Re enrolment day offset</label>\n                            <input type=\"number\" class=\"form-control\" id=\"ReEnrolmentDayOffset\" name=\"AutoEnrolment[ReEnrolmentDayOffset]\" value.bind=\"employer.AutoEnrolment.ReEnrolmentDayOffset\"\n                                placeholder=\"Re enrolment day offset\" min=\"-31\" max=\"31\">\n    \n                            <span class=\"notes\">\n                                The optional employers auto enrolment re-enrolment day offset. Allows the tri-annual re-enrolment to be offset by a number\n                                of days. Supports positive and negative integers.\n                            </span>\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"ReEnrolmentMonthOffset\">Re enrolment month offset</label>\n                            <input type=\"number\" class=\"form-control\" id=\"ReEnrolmentMonthOffset\" name=\"AutoEnrolment[ReEnrolmentMonthOffset]\" value.bind=\"employer.AutoEnrolment.ReEnrolmentMonthOffset\"\n                                placeholder=\"Re enrolment month offset\" min=\"-3\" max=\"3\">\n    \n                            <span class=\"notes\">\n                                The optional employers auto enrolment re-enrolment month offset. Allows the tri-annual re-enrolment to be offset by a number\n                                of months. Supports positive and negative integers.\n                            </span>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"PrimaryFirstName\">Primary first name</label>\n                            <input type=\"number\" class=\"form-control\" id=\"PrimaryFirstName\" name=\"AutoEnrolment[PrimaryFirstName]\" value.bind=\"employer.AutoEnrolment.PrimaryFirstName\"\n                                placeholder=\"Auto enrolment primary contact first name\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"PrimaryLastName\">Primary last name</label>\n                            <input type=\"number\" class=\"form-control\" id=\"PrimaryLastName\" name=\"AutoEnrolment[PrimaryLastName]\" value.bind=\"employer.AutoEnrolment.PrimaryLastName\"\n                                placeholder=\"Auto enrolment primary contact last name\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"PrimaryEmail\">Primary email</label>\n                            <input type=\"number\" class=\"form-control\" id=\"PrimaryEmail\" name=\"AutoEnrolment[PrimaryEmail]\" value.bind=\"employer.AutoEnrolment.PrimaryEmail\"\n                                placeholder=\"Auto enrolment primary contact email address\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"PrimaryTelephone\">Primary telephone</label>\n                            <input type=\"tel\" class=\"form-control\" id=\"PrimaryTelephone\" name=\"AutoEnrolment[PrimaryTelephone]\" value.bind=\"employer.AutoEnrolment.PrimaryTelephone\"\n                                placeholder=\"Auto enrolment primary contact telephone number\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"PrimaryJobTitle\">Primary job title</label>\n                            <input type=\"tel\" class=\"form-control\" id=\"PrimaryJobTitle\" name=\"AutoEnrolment[PrimaryJobTitle]\" value.bind=\"employer.AutoEnrolment.PrimaryJobTitle\"\n                                placeholder=\"Auto enrolment primary contact job title\" maxlength=\"50\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"SecondaryFirstName\">Secondary first name</label>\n                            <input type=\"number\" class=\"form-control\" id=\"SecondaryFirstName\" name=\"AutoEnrolment[SecondaryFirstName]\" value.bind=\"employer.AutoEnrolment.SecondaryFirstName\"\n                                placeholder=\"Auto enrolment secondary contact first name\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"SecondaryLastName\">Secondary last name</label>\n                            <input type=\"number\" class=\"form-control\" id=\"SecondaryLastName\" name=\"AutoEnrolment[SecondaryLastName]\" value.bind=\"employer.AutoEnrolment.SecondaryLastName\"\n                                placeholder=\"Auto enrolment secondary contact last name\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"SecondaryEmail\">Secondary email</label>\n                            <input type=\"number\" class=\"form-control\" id=\"SecondaryEmail\" name=\"AutoEnrolment[SecondaryEmail]\" value.bind=\"employer.AutoEnrolment.SecondaryEmail\"\n                                placeholder=\"Auto enrolment secondary contact email address\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"SecondaryTelephone\">Secondary telephone</label>\n                            <input type=\"tel\" class=\"form-control\" id=\"SecondaryTelephone\" name=\"AutoEnrolment[SecondaryTelephone]\" value.bind=\"employer.AutoEnrolment.SecondaryTelephone\"\n                                placeholder=\"Auto enrolment secondary contact telephone number\">\n                        </div>\n    \n                        <div class=\"form-group\">\n                            <label for=\"SecondaryJobTitle\">Secondary job title</label>\n                            <input type=\"tel\" class=\"form-control\" id=\"SecondaryJobTitle\" name=\"AutoEnrolment[SecondaryJobTitle]\" value.bind=\"employer.AutoEnrolment.SecondaryJobTitle\"\n                                placeholder=\"Auto enrolment secondary contact job title\" maxlength=\"50\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n    \n            <div class=\"tab-pane fade\" id=\"revisions\" role=\"tabpanel\" aria-labelledby=\"revisions-tab\" if.bind=\"employer.Id\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"Revision\">Revision</label>\n                            \n                            <input type=\"number\" class=\"form-control\" id=\"Revision\" name=\"Revision\" value.bind=\"employer.Revision\" placeholder=\"Revision number\"\n                                readonly step=\"1\" min=\"0\">\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 col-md-6\" if.bind=\"employer.Revisions\">\n                        <h5>Revision History</h5>\n                        <span class=\"notes\">Employer revisions must be deleted in order, validation rules will prevent revisions being deleted if they invalidate an existing payrun.</span>\n                        <table class=\"table table-sm\">\n                            <thead>\n                                <tr>\n                                    <th>Revision</th>\n                                    <th>Effective Date</th>\n                                    <th></th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr repeat.for=\"revision of employer.Revisions\">\n                                    <td>${revision.Revision}</td>\n                                    <td>${revision.EffectiveDate}</td>\n                                    <td class=\"text-right\">\n                                        <a class=\"btn btn-sm btn-danger\" \n                                            href=\"#\" \n                                            role=\"button\" \n                                            click.delegate=\"deleteRevision(revision)\">Delete</a>\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>         \n                    </div>\n                </div>\n            </div>\n    \n            <div class=\"row\" if.bind=\"showSaveButton\">\n                <div class=\"col-sm-12\">\n                    <hr>\n                </div>\n            </div>\n\n            <div class=\"row\" if.bind=\"showSaveButton\">\n                <div class=\"col-sm-12 text-right\">\n                    <button class=\"btn btn-primary\" click.delegate=\"save()\">Save</button>\n                </div>\n            </div>\n        </div>\n    </form>    \n</template>"; });
define('employee/employee',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-http-client", "aurelia-dialog", "aurelia-router", "../dialogs/confirm", "../pay-instruction/pay-instruction-modal", "../base-view-model"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaHttpClient, _aureliaDialog, _aureliaRouter, _confirm, _payInstructionModal, _baseViewModel) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Employee = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _dec, _class;

    var Employee = exports.Employee = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaDialog.DialogService, _aureliaRouter.Router), _dec(_class = function (_BaseViewModel) {
        _inherits(Employee, _BaseViewModel);

        function Employee(eventAggregator, dialogService, router) {
            _classCallCheck(this, Employee);

            var _this = _possibleConstructorReturn(this, _BaseViewModel.call(this, router));

            _this.employee = null;
            _this.ea = eventAggregator;
            _this.dialogService = dialogService;
            _this.client = new _aureliaHttpClient.HttpClient();

            _this.typesOfPayInstruction = ["AoePayInstruction", "BenefitPayInstruction", "NiAdjustmentPayInstruction", "NiPayInstruction", "PensionPayInstruction", "PrimitivePayInstruction", "RatePayInstruction", "SalaryPayInstruction", "ShppPayInstruction", "SspPayInstruction", "StudentLoanPayInstruction", "TaxPayInstruction"];

            _this.typesOfYTDPayInstruction = ["NiYtdPayInstruction", "PensionYtdPayInstruction", "PrimitiveYtdPayInstruction", "SapYtdPayInstruction", "ShppYtdPayInstruction", "SmpYtdPayInstruction", "SppYtdPayInstruction", "SspYtdPayInstruction", "StudentLoanYtdPayInstruction", "TaxYtdPayInstruction"];
            return _this;
        }

        Employee.prototype.activate = function activate(params) {
            this.getPayInstructionTypes();

            $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                scrollTop: 0
            }, 100);

            if (params && params.employerId && params.employeeId) {
                return this.getEmployeeDetails(params.employerId, params.employeeId);
            } else {
                this.employee = {
                    EmployerId: params.employerId
                };
            }
        };

        Employee.prototype.attached = function attached() {
            if (this.employee) {
                _BaseViewModel.prototype.setTitle.call(this, this.employee.Code);
            } else {
                _BaseViewModel.prototype.setTitle.call(this, "New Employee");
            }
        };

        Employee.prototype.deactivate = function deactivate() {
            if (this.reloadEmployeeSubscriber) {
                this.reloadEmployeeSubscriber.dispose();
            }
        };

        Employee.prototype.getEmployeeDetails = function getEmployeeDetails(employerId, employeeId) {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.ea.publish("request:processing");

                _this2.client.get("/api/employer/" + employerId + "/employee/" + employeeId).then(function (res) {
                    _this2.ea.publish("request:complete");

                    _this2.employee = JSON.parse(res.response);

                    _this2.employee.EmployerId = employerId;

                    resolve();
                });
            });
        };

        Employee.prototype.getPayInstructionTypes = function getPayInstructionTypes() {
            var _this3 = this;

            return new Promise(function (resolve) {
                _this3.ea.publish("request:processing");

                _this3.client.get("/api/pay-instructions").then(function (res) {
                    _this3.ea.publish("request:complete");

                    var response = JSON.parse(res.response);

                    _this3.typesOfPayInstruction = response.filter(function (pi) {
                        return pi.group === "normal";
                    });
                    _this3.typesOfYTDPayInstruction = response.filter(function (pi) {
                        return pi.group === "year-to-date";
                    });

                    resolve();
                });
            });
        };

        Employee.prototype.openAddPayInstructionModal = function openAddPayInstructionModal(piType) {
            var _this4 = this;

            var employerId = this.employee.EmployerId;
            var employeeId = this.employee.Id;
            var opts = {
                viewModel: _payInstructionModal.PayInstructionModal,
                model: {
                    type: piType,
                    employerId: employerId,
                    employeeId: employeeId
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this4.status = response.output;

                    _this4.getEmployeeDetails(employerId, employeeId);
                }
            });
        };

        Employee.prototype.openEditPayInstructionModal = function openEditPayInstructionModal(pi) {
            var _this5 = this;

            var employerId = this.employee.EmployerId;
            var employeeId = this.employee.Id;
            var opts = {
                viewModel: _payInstructionModal.PayInstructionModal,
                model: {
                    id: pi.Id,
                    employerId: employerId,
                    employeeId: employeeId
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    _this5.status = response.output;

                    _this5.getEmployeeDetails(employerId, employeeId);
                }
            });
        };

        Employee.prototype.deleteInstruction = function deleteInstruction(pi) {
            var _this6 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this pay instruction?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var employerId = _this6.employee.EmployerId;
                    var employeeId = _this6.employee.Id;
                    var payInstructionId = pi.Id;
                    var url = "/api/employer/" + employerId + "/employee/" + employeeId + "/payInstruction/" + payInstructionId;

                    _this6.ea.publish("request:processing");

                    _this6.client.delete(url).then(function (res) {
                        _this6.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this6.apiErrors = null;
                        _this6.status = null;

                        if (parsedResponse.errors) {
                            _this6.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this6.status = parsedResponse.status;
                        _this6.getEmployeeDetails(employerId, employeeId);
                    });
                }
            });
        };

        return Employee;
    }(_baseViewModel.BaseViewModel)) || _class);
});
define('text!employee/employee.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./elements/employee-form\"></require>\n    <require from=\"./elements/p45-pay-instruction\"></require>\n    <require from=\"../resources/elements/status/status\"></require>\n    <require from=\"../resources/elements/api-errors/api-errors\"></require>\n    \n    <status status.bind=\"status\"></status>\n    \n    <api-errors errors.bind=\"apiErrors\"></api-errors>    \n    \n    <div if.bind=\"employee.Id\">\n        <ul class=\"nav nav-tabs nav-fill\" id=\"myTab\" role=\"tablist\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link active\" \n                    id=\"home-tab\" \n                    data-toggle=\"tab\" \n                    href=\"#home\" \n                    role=\"tab\" \n                    aria-controls=\"home\" \n                    aria-selected=\"true\">Employee</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" \n                    id=\"instructions-tab\" \n                    data-toggle=\"tab\" \n                    href=\"#instructions\" \n                    role=\"tab\" \n                    aria-controls=\"instructions\" \n                    aria-selected=\"false\">Pay Instructions</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" \n                    id=\"p45-instruction-tab\" \n                    data-toggle=\"tab\" \n                    href=\"#p45-instruction\" \n                    role=\"tab\" \n                    aria-controls=\"p45-instruction\" \n                    aria-selected=\"false\">P45</a>\n            </li>   \n            <li class=\"nav-item\">\n                <a class=\"nav-link\" \n                    id=\"year-to-date-instructions-tab\" \n                    data-toggle=\"tab\" \n                    href=\"#year-to-date-instructions\" \n                    role=\"tab\" \n                    aria-controls=\"year-to-date-instructions\" \n                    aria-selected=\"false\">YTD Pay Instructions</a>\n            </li>         \n        </ul>\n\n        <div class=\"tab-content\" id=\"myTabContent\">\n            <div class=\"tab-pane fade show active\" id=\"home\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\n                <employee-form employee.bind=\"employee\"></employee-form>\n            </div>\n\n            <div class=\"tab-pane fade\" id=\"instructions\" role=\"tabpanel\" aria-labelledby=\"instructions-tab\">\n                <div class=\"row actions\">\n                    <div class=\"col-sm-6\">\n                        <div class=\"dropdown show\">\n                            <a class=\"btn btn-primary dropdown-toggle\" \n                                href=\"#\" \n                                role=\"button\" \n                                id=\"addNewPayInstruction\" \n                                data-toggle=\"dropdown\" \n                                aria-haspopup=\"true\" \n                                aria-expanded=\"false\">\n                                Add New Pay Instruction\n                            </a>\n\n                            <div class=\"dropdown-menu\" aria-labelledby=\"addNewPayInstruction\">\n                                <a class=\"dropdown-item launch-modal\" \n                                    href=\"#\" \n                                    repeat.for=\"pi of typesOfPayInstruction\" \n                                    click.delegate=\"openAddPayInstructionModal(pi.type)\">${pi.name}</a>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-6\">\n                        <p class=\"text-right\">\n                            <a href=\"http://developer.payrun.io/docs/key-concepts/understanding-pay-instructions.html\" target=\"_blank\">\n                                Understanding Pay Instructions\n                            </a>\n                        </p>\n                    </div>\n                </div>\n\n                <div class=\"row\" repeat.for=\"pi of employee.GroupedPayInstructions\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"card bg-light\">\n                            <div class=\"card-header\">\n                                <h6>${pi.InstructionFriendlyName}</h6>\n                            </div>\n                            <div class=\"card-body\">\n                                <compose view=\"../pay-instruction/pay-instructions/lists/${pi.InstructionType}.html\"></compose>\n                            </div>\n                        </div> \n                    </div>\n                </div>                                 \n            </div>\n\n            <div class=\"tab-pane fade\" id=\"p45-instruction\">\n                <p45-pay-instruction employeeid.bind=\"employee.Id\" \n                    employerid.bind=\"employee.EmployerId\" \n                    p45payinstruction.bind=\"employee.P45PayInstruction\"></p45-pay-instruction>\n            </div>               \n\n            <div class=\"tab-pane fade\" id=\"year-to-date-instructions\">\n                <div class=\"row actions\">\n                    <div class=\"col-sm-6\">\n                        <div class=\"dropdown show\">\n                            <a class=\"btn btn-primary dropdown-toggle\" \n                                href=\"#\" \n                                role=\"button\" \n                                id=\"addNewYTDPayInstruction\" \n                                data-toggle=\"dropdown\" \n                                aria-haspopup=\"true\" \n                                aria-expanded=\"false\">\n                                Add New YTD Pay Instruction\n                            </a>\n\n                            <div class=\"dropdown-menu\" aria-labelledby=\"addNewYTDPayInstruction\">\n                                <a class=\"dropdown-item launch-modal\" \n                                    href=\"#\" \n                                    repeat.for=\"pi of typesOfYTDPayInstruction\" \n                                    click.delegate=\"openAddPayInstructionModal(pi.type)\">${pi.name}</a>                           \n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-6\">\n                        <p class=\"text-right\">\n                            <a href=\"http://developer.payrun.io/docs/key-concepts/understanding-pay-instructions.html\" target=\"_blank\">\n                                Understanding Pay Instructions\n                            </a>\n                        </p>\n                    </div>\n                </div>\n\n                <div class=\"row\" repeat.for=\"pi of employee.GroupedYTDPayInstructions\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"card bg-light\">\n                            <div class=\"card-header\">\n                                <h6>${pi.InstructionFriendlyName}</h6>\n                            </div>\n                            <div class=\"card-body\">\n                                <compose view=\"../pay-instruction/ytd-pay-instructions/lists/${pi.InstructionType}.html\"></compose>\n                            </div>\n                        </div> \n                    </div>\n                </div>          \n            </div> \n        </div>\n    </div>\n\n    <div if.bind=\"!employee.Id\">\n        <employee-form employee.bind=\"employee\"></employee-form>\n    </div> \n</template>"; });
define('employee/elements/p45-pay-instruction',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-dialog", "aurelia-validation", "aurelia-http-client", "../../dialogs/confirm"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaDialog, _aureliaValidation, _aureliaHttpClient, _confirm) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.P45PayInstruction = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

    var P45PayInstruction = exports.P45PayInstruction = (_dec = (0, _aureliaFramework.customElement)("p45-pay-instruction"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationControllerFactory, _aureliaDialog.DialogService), _dec(_class = _dec2(_class = (_class2 = function () {
        function P45PayInstruction(EventAggregator, controllerFactory, dialogService) {
            _classCallCheck(this, P45PayInstruction);

            _initDefineProp(this, "employerid", _descriptor, this);

            _initDefineProp(this, "employeeid", _descriptor2, this);

            _initDefineProp(this, "p45payinstruction", _descriptor3, this);

            this.ea = EventAggregator;
            this.validationController = controllerFactory.createForCurrentScope();
            this.dialogService = dialogService;
            this.client = new _aureliaHttpClient.HttpClient();
        }

        P45PayInstruction.prototype.setupValidationRules = function setupValidationRules() {
            _aureliaValidation.ValidationRules.ensure("StartDate").required().withMessage("Start date is required").ensure("TaxablePay").required().withMessage("Taxable pay is required").ensure("TaxPaid").required().withMessage("Tax paid is required").ensure("TaxCode").required().withMessage("Tax code is required").ensure("LeavingDate").required().withMessage("Leaving date is required").on(this.p45payinstruction);
        };

        P45PayInstruction.prototype.add = function add() {
            this.p45payinstruction = {
                TaxBasis: "Cumulative",
                StudentLoan: "Off",
                PayFrequency: "Weekly"
            };
        };

        P45PayInstruction.prototype.save = function save() {
            var _this = this;

            this.validationController.validate().then(function (result) {
                if (result.valid) {
                    var data = {
                        StartDate: _this.p45payinstruction.StartDate,
                        EndDate: _this.p45payinstruction.EndDate,
                        Description: _this.p45payinstruction.Description,
                        TaxablePay: _this.p45payinstruction.TaxablePay,
                        TaxPaid: _this.p45payinstruction.TaxPaid,
                        TaxCode: _this.p45payinstruction.TaxCode,
                        TaxBasis: _this.p45payinstruction.TaxBasis,
                        StudentLoan: _this.p45payinstruction.StudentLoan,
                        PayFrequency: _this.p45payinstruction.PayFrequency,
                        LeavingDate: _this.p45payinstruction.LeavingDate,
                        PreviousEmployerPayeRef: _this.p45payinstruction.PreviousEmployerPayeRef
                    };
                    var url = "/api/employer/" + _this.employerid + "/Employee/" + _this.employeeid + "/P45Instruction";

                    _this.ea.publish("request:processing");

                    _this.client.post(url, data).then(function (res) {
                        _this.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this.apiErrors = null;
                        _this.status = null;

                        if (parsedResponse.errors) {
                            _this.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this.status = parsedResponse.status;
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        P45PayInstruction.prototype.delete = function _delete() {
            var _this2 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this pay instruction?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var employerId = _this2.employerid;
                    var employeeId = _this2.employeeid;
                    var payInstructionId = _this2.p45payinstruction.Id;
                    var url = "/api/employer/" + employerId + "/employee/" + employeeId + "/payInstruction/" + payInstructionId;

                    _this2.ea.publish("request:processing");

                    _this2.client.delete(url).then(function (res) {
                        _this2.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this2.apiErrors = null;
                        _this2.status = null;

                        if (parsedResponse.errors) {
                            _this2.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this2.p45payinstruction = null;
                        _this2.status = parsedResponse.status;
                    });
                }
            });
        };

        P45PayInstruction.prototype.p45payinstructionChanged = function p45payinstructionChanged() {
            if (this.p45payinstruction) {
                this.setupValidationRules();
            }
        };

        return P45PayInstruction;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "employerid", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "employeeid", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "p45payinstruction", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class);
});
define('text!employee/elements/p45-pay-instruction.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../../resources/elements/api-errors/api-errors\"></require>\n    <require from=\"../../resources/elements/status/status\"></require>\n        \n    <validation-errors errors.bind=\"validationController.errors\"></validation-errors>\n    \n    <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n    <status status.bind=\"status\"></status>\n\n    <div id=\"add-p45-pay-instruction-container\" class=\"row actions\" if.bind=\"!p45payinstruction\">\n        <div class=\"col-sm-12\">\n            <button id=\"add-p45-pay-instruction\" type=\"button\" class=\"btn btn-primary btn-lg btn-block\" click.delegate=\"add()\">Add a P45 pay instruction</button>\n        </div>\n    </div>\n    \n    <div id=\"p45-pay-instruction-container\" if.bind=\"p45payinstruction\">\n        <form>\n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <div class=\"form-group\">\n                        <label for=\"StartDate\">Start date</label>\n    \n                        <input type=\"date\" \n                            class=\"form-control\" \n                            id=\"StartDate\" \n                            name=\"StartDate\" \n                            value.bind=\"p45payinstruction.StartDate & validate\">\n    \n                        <span class=\"notes\">\n                            The date the instruction will come into effect.\n                        </span>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label for=\"EndDate\">End date</label>\n    \n                        <input type=\"date\" \n                            class=\"form-control\" \n                            id=\"EndDate\" \n                            name=\"EndDate\" \n                            value.bind=\"p45payinstruction.EndDate\">\n    \n                        <span class=\"notes\">\n                            The date the instruction will end, open ended instructions will run forever.\n                        </span>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label for=\"Description\">Description</label>\n    \n                        <input type=\"text\" \n                            class=\"form-control\" \n                            id=\"Description\" \n                            name=\"Description\" \n                            value.bind=\"p45payinstruction.Description\" \n                            maxlength=\"200\">\n    \n                        <span class=\"notes\">\n                            This description will override the default description from the pay code. \n                            See <a href=\"http://developer.payrun.io/docs/key-concepts/customising-the-payslip.html\" target=\"_blank\">Customising the Payslip</a> for more information on customising the payslip output and using runtime variables.\n                        </span>\n                    </div> \n    \n                    <div class=\"form-group\">\n                        <label for=\"TaxablePay\">Taxable pay</label>\n    \n                        <input type=\"number\" \n                            class=\"form-control\" \n                            id=\"TaxablePay\" \n                            name=\"TaxablePay\" \n                            value.bind=\"p45payinstruction.TaxablePay & validate\" \n                            step=\"0.01\">\n    \n                        <span class=\"notes\">\n                            The year to date taxable pay from the previous employment.\n                        </span>\n                    </div> \n    \n                    <div class=\"form-group\">\n                        <label for=\"TaxPaid\">Tax paid</label>\n    \n                        <input type=\"number\" \n                            class=\"form-control\" \n                            id=\"TaxPaid\" \n                            name=\"TaxPaid\" \n                            value.bind=\"p45payinstruction.TaxPaid & validate\" \n                            step=\"0.01\">\n    \n                        <span class=\"notes\">\n                            The year to date tax paid from the previous employment.\n                        </span>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label for=\"TaxCode\">Tax code</label>\n    \n                        <input type=\"text\" \n                            class=\"form-control\" \n                            id=\"TaxCode\" \n                            name=\"TaxCode\" \n                            pattern=\"^(SD1|SD2|D1|BR|SBR|SD0|D0|NT)$|^[S]?((K{1}[0-9]{1,6})|([0-9]{1,6}[LMNPTYV]{1})$)\" \n                            minlength=\"2\" \n                            maxlength=\"7\" \n                            value.bind=\"p45payinstruction.TaxCode & validate\">\n    \n                        <span class=\"notes\">\n                            The tax code from the previous employment.\n                        </span>\n                    </div>                                  \n                </div>\n    \n                <div class=\"col-sm-6\">\n                    <div class=\"form-group\">\n                        <label for=\"TaxBasis\">Tax basis</label>\n    \n                        <select id=\"TaxBasis\" name=\"TaxBasis\" class=\"form-control\" value.bind=\"p45payinstruction.TaxBasis\">\n                            <option value=\"Cumulative\">Cumulative</option>\n                            <option value=\"Week1Month1\">Week1Month1</option>\n                        </select>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label for=\"StudentLoan\">Student loan</label>\n    \n                        <select id=\"StudentLoan\" name=\"StudentLoan\" class=\"form-control\" value.bind=\"p45payinstruction.StudentLoan\">\n                            <option value=\"Off\">Off</option>\n                            <option value=\"Plan1\">Plan 1</option>\n                            <option value=\"Plan2\">Plan 2</option>\n                        </select>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label for=\"PayFrequency\">Pay frequency</label>\n    \n                        <select id=\"PayFrequency\" name=\"PayFrequency\" class=\"form-control\" value.bind=\"p45payinstruction.PayFrequency\">\n                            <option value=\"Weekly\">Weekly</option>\n                            <option value=\"Monthly\">Monthly</option>\n                            <option value=\"TwoWeekly\">Two weekly</option>\n                            <option value=\"FourWeekly\">Four weekly</option>\n                            <option value=\"Yearly\">Yearly</option>\n                        </select>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label for=\"LeavingDate\">Leaving date</label>\n    \n                        <input type=\"date\" \n                            class=\"form-control\" \n                            id=\"LeavingDate\" \n                            name=\"LeavingDate\" \n                            value.bind=\"p45payinstruction.LeavingDate & validate\">\n    \n                        <span class=\"notes\">\n                            The leaving date from the previous employment.\n                        </span>\n                    </div>\n    \n                    <div class=\"form-group\">\n                        <label for=\"PreviousEmployerPayeRef\">Previous employer Paye ref</label>\n    \n                        <input type=\"text\" \n                            class=\"form-control\" \n                            id=\"PreviousEmployerPayeRef\" \n                            name=\"PreviousEmployerPayeRef\" \n                            value.bind=\"p45payinstruction.PreviousEmployerPayeRef\" \n                            maxlength=\"14\" \n                            pattern=\"([0-9]{3})/([A-Za-z0-9]{1,10})\">\n    \n                        <span class=\"notes\">\n                            The previous employer's PAYE scheme reference if known.\n                        </span>\n                    </div>                  \n                </div>            \n            </div>\n    \n            <div class=\"row\">\n                <div class=\"col-sm-6\">\n                    <button type=\"button\"  \n                        class=\"btn btn-danger\" \n                        click.delegate=\"delete()\" \n                        if.bind=\"p45payinstruction.Id\">Delete</button>\n                </div>\n    \n                <div class=\"col-sm-6 text-right\">\n                    <button class=\"btn btn-primary\" click.delegate=\"save()\">Save</button>\n                </div>\n            </div>        \n        </form>\n    </div>    \n</template>"; });
define('employee/elements/employee-form',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-http-client", "aurelia-validation", "aurelia-dialog", "../../dialogs/confirm"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaHttpClient, _aureliaValidation, _aureliaDialog, _confirm) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.EmployeeForm = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var EmployeeForm = exports.EmployeeForm = (_dec = (0, _aureliaFramework.customElement)("employee-form"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationControllerFactory, _aureliaDialog.DialogService), _dec(_class = _dec2(_class = (_class2 = function () {
        function EmployeeForm(EventAggregator, controllerFactory, dialogService) {
            _classCallCheck(this, EmployeeForm);

            _initDefineProp(this, "employee", _descriptor, this);

            this.ea = EventAggregator;
            this.paySchedules = null;
            this.client = new _aureliaHttpClient.HttpClient();
            this.validationController = controllerFactory.createForCurrentScope();
            this.dialogService = dialogService;
            this.showSaveButton = true;
        }

        EmployeeForm.prototype.attached = function attached() {
            this.setupTabEvents();
            this.setupValidationRules();
        };

        EmployeeForm.prototype.detached = function detached() {};

        EmployeeForm.prototype.save = function save() {
            var _this = this;

            this.validationController.validate().then(function (result) {
                if (result.valid) {
                    var url = "/api/employer/" + _this.employee.EmployerId + "/employee";
                    var data = _this.employee;

                    _this.ea.publish("request:processing");

                    _this.client.post(url, data).then(function (res) {
                        _this.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this.apiErrors = null;
                        _this.status = null;

                        if (parsedResponse.errors) {
                            _this.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this.status = parsedResponse.status;
                        _this.employee.Id = parsedResponse.employeeId;

                        _this.ea.publish("employee:reload", {
                            employerId: _this.employee.EmployerId,
                            employeeId: parsedResponse.employeeId
                        });
                    });
                } else {
                    $("html, body, ux-dialog-container, ux-dialog, ux-dialog-body").animate({
                        scrollTop: 0
                    }, 500);
                }
            });
        };

        EmployeeForm.prototype.employeeChanged = function employeeChanged() {
            var _this2 = this;

            if (!this.employee.HoursPerWeek) {
                this.employee.HoursPerWeek = 40;
            }

            if (!this.employee.EmployeePartner) {
                this.employee.EmployeePartner = {
                    Title: "",
                    FirstName: "",
                    Initials: "",
                    MiddleName: "",
                    LastName: "",
                    NiNumber: ""
                };
            }

            if (!this.paySchedules) {
                var employerId = this.employee.EmployerId;

                this.ea.publish("request:processing");

                this.client.get("/api/employer/" + employerId + "/pay-schedules").then(function (res) {
                    _this2.ea.publish("request:complete");

                    _this2.paySchedules = JSON.parse(res.response);
                });
            }
        };

        EmployeeForm.prototype.setupTabEvents = function setupTabEvents() {
            var _this3 = this;

            $("a[data-toggle='tab']").on("shown.bs.tab", function (e) {
                _this3.showSaveButton = e.target.id !== "revisions-tab";
            });
        };

        EmployeeForm.prototype.setupValidationRules = function setupValidationRules() {
            _aureliaValidation.ValidationRules.ensure("LastName").required().withMessage("Last name is required").ensure("Code").required().withMessage("Code is required").ensure("EffectiveDate").required().withMessage("Effective date is required").ensure("DateOfBirth").required().withMessage("Date of birth is required").ensure("Gender").required().withMessage("Gender is required").ensure("StarterDeclaration").required().withMessage("Starter declaration is required").ensure("Territory").required().withMessage("Territory is required").ensure("Region").required().withMessage("Region is required").ensure("HoursPerWeek").required().withMessage("Hours per week is required").ensure("AEAssessmentOverride").required().withMessage("AEAssessment override is required").on(this.employee);
        };

        EmployeeForm.prototype.deleteRevision = function deleteRevision(revision) {
            var _this4 = this;

            var opts = {
                viewModel: _confirm.Confirm,
                model: {
                    title: "Are you sure?",
                    message: "Are you sure you want to delete this revision?"
                }
            };

            this.dialogService.open(opts).whenClosed(function (response) {
                if (!response.wasCancelled) {
                    var employerId = _this4.employee.EmployerId;
                    var employeeId = _this4.employee.Id;
                    var effectiveDate = revision.EffectiveDate;
                    var url = "/api/employer/" + employerId + "/employee/" + employeeId + "/revision/" + effectiveDate;

                    _this4.ea.publish("request:processing");

                    _this4.client.delete(url).then(function (res) {
                        _this4.ea.publish("request:complete");

                        var parsedResponse = JSON.parse(res.response);

                        _this4.apiErrors = null;
                        _this4.status = null;

                        if (parsedResponse.errors) {
                            _this4.apiErrors = parsedResponse.errors;
                            return;
                        }

                        _this4.status = parsedResponse.status;
                        _this4.employer.Revisions = _this4.employee.Revisions.filter(function (rev) {
                            return rev.Revision !== revision.Revision;
                        });

                        _this4.ea.publish("employee:reload", {
                            employerId: employerId,
                            employeeId: employeeId
                        });
                    });
                }
            });
        };

        return EmployeeForm;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "employee", [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class) || _class);
});
define('text!employee/elements/employee-form.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"../../resources/elements/bank-account-form/bank-account-form\"></require>\n    <require from=\"../../resources/elements/address-form/address-form\"></require>\n    <require from=\"../../resources/elements/rule-exclusions/rule-exclusions\"></require>\n    <require from=\"../../resources/elements/pay-schedule-dropdown/pay-schedule-dropdown\"></require>\n    <require from=\"../../resources/elements/validation-errors/validation-errors\"></require>\n    <require from=\"../../resources/elements/api-errors/api-errors\"></require>\n    <require from=\"../../resources/elements/status/status\"></require>\n        \n    <validation-errors errors.bind=\"validationController.errors\"></validation-errors>\n    \n    <api-errors errors.bind=\"apiErrors\"></api-errors>\n\n    <status status.bind=\"status\"></status>\n\n    <form>\n        <ul class=\"nav nav-pills nav-fill\" id=\"subTab\" role=\"tablist\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link active\" id=\"details-tab\" data-toggle=\"tab\" href=\"#details\" role=\"tab\" aria-controls=\"details\" aria-selected=\"true\">Details</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"tax-tab\" data-toggle=\"tab\" href=\"#tax\" role=\"tab\" aria-controls=\"tax\" aria-selected=\"false\">Tax &amp; NI</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"ae-tab\" data-toggle=\"tab\" href=\"#ae\" role=\"tab\" aria-controls=\"ae\" aria-selected=\"false\">Auto Enrolment</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"partner-tab\" data-toggle=\"tab\" href=\"#partner\" role=\"tab\" aria-controls=\"partner\" aria-selected=\"false\">Partner Details</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" id=\"advanced-tab\" data-toggle=\"tab\" href=\"#advanced\" role=\"tab\" aria-controls=\"advanced\" aria-selected=\"false\">Advanced</a>\n            </li>\n            <li class=\"nav-item\" if.bind=\"employee.Id\">\n                <a class=\"nav-link\" id=\"revisions-tab\" data-toggle=\"tab\" href=\"#revisions\" role=\"tab\" aria-controls=\"revisions\" aria-selected=\"false\">Revisions</a>\n            </li>            \n        </ul>\n\n        <div class=\"tab-content\" id=\"mySubTabContent\">\n\n            <div class=\"tab-pane fade show active\" id=\"details\" role=\"tabpanel\" aria-labelledby=\"details-tab\">\n\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-4\">\n                        <div class=\"form-group\">\n                            <label for=\"LastName\">Last name</label>\n                            <input type=\"text\" \n                                class=\"form-control form-control-lg\" \n                                id=\"LastName\" \n                                name=\"LastName\" \n                                value.bind=\"employee.LastName & validate\" \n                                placeholder=\"Last name\"\n                                maxlength=\"35\">\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-2\">\n                        <div class=\"form-group\">\n                            <label for=\"Code\">Code</label>\n                            <input type=\"text\" \n                                class=\"form-control form-control-lg\" \n                                id=\"Code\" \n                                name=\"Code\" \n                                value.bind=\"employee.Code & validate\" \n                                placeholder=\"Unique code also known as the Payroll Id\"\n                                maxlength=\"35\">\n\n                            <span class=\"notes\" The code must be unique to Employer and never reused.></span>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-3\">\n                        <div class=\"form-group\">\n                            <label for=\"StartDate\">Start date</label>\n                            <input type=\"date\" \n                                class=\"form-control form-control-lg\" \n                                id=\"StartDate\" \n                                name=\"StartDate\" \n                                value.bind=\"employee.StartDate\" \n                                placeholder=\"Start date\">\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-3\">\n                        <div class=\"form-group\">\n                            <label for=\"EffectiveDate\">Effective date</label>\n                            <input type=\"date\" \n                                class=\"form-control form-control-lg\" \n                                id=\"EffectiveDate\" \n                                name=\"EffectiveDate\" \n                                value.bind=\"employee.EffectiveDate & validate\"\n                                placeholder=\"Date the revision will come into effect\">\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-1\">\n                        <div class=\"form-group\">\n                            <label for=\"Title\">Title</label>\n                            <input type=\"text\" \n                                class=\"form-control title\" \n                                id=\"Title\" \n                                name=\"Title\" \n                                value.bind=\"employee.Title\" \n                                placeholder=\"Title\" \n                                maxlength=\"35\">\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-5\">\n                        <div class=\"form-group\">\n                            <label for=\"FirstName\">First name</label>\n                            <input type=\"text\" \n                                class=\"form-control\" \n                                id=\"FirstName\" \n                                name=\"FirstName\" \n                                value.bind=\"employee.FirstName\" \n                                placeholder=\"First name\" \n                                maxlength=\"35\">\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-1\">\n                        <div class=\"form-group\">\n                            <label for=\"Initials\">Initials</label>\n                            <input type=\"text\" \n                                class=\"form-control initials\" \n                                id=\"Initials\" \n                                name=\"Initials\" \n                                value.bind=\"employee.Initials\" \n                                placeholder=\"Initials\"\n                                maxlength=\"35\">\n                        </div>\n                    </div>\n                    <div class=\"col-sm-12 col-md-5\">\n                        <div class=\"form-group\">\n                            <label for=\"MiddleName\">Middle name(s)</label>\n                            <input type=\"text\" \n                                class=\"form-control\" \n                                id=\"MiddleName\" \n                                name=\"MiddleName\" \n                                value.bind=\"employee.MiddleName\" \n                                placeholder=\"Middle name(s) if any\"\n                                maxlength=\"35\">\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n\n                        <div class=\"row\">\n                            <div class=\"col-sm-12 col-md-6\">\n                                <div class=\"form-group\">\n                                    <label for=\"DateOfBirth\">Date of birth</label>\n                                    <input type=\"date\" \n                                        class=\"form-control\" \n                                        id=\"DateOfBirth\" \n                                        name=\"DateOfBirth\" \n                                        value.bind=\"employee.DateOfBirth & validate\" \n                                        placeholder=\"Date of birth\">\n                                </div>\n                            </div>\n                            <div class=\"col-sm-12 col-md-6\">\n                                <div class=\"form-group\">\n                                    <label for=\"Gender\">Gender</label>\n\n                                    <select class=\"form-control\" \n                                        id=\"Gender\" \n                                        name=\"Gender\" \n                                        value.bind=\"employee.Gender & validate\">\n                                        <option value=\"\"></option>\n                                        <option value=\"Unknown\">Unknown</option>\n                                        <option value=\"Male\">Male</option>\n                                        <option value=\"Female\">Female</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        \n                        <pay-schedule-dropdown payschedule.bind=\"employee.PaySchedule\" payschedules.bind=\"paySchedules\"></pay-schedule-dropdown>\n\n                        <bank-account-form bankaccount.bind=\"employee.BankAccount\"></bank-account-form>\n                    </div>\n\n                    <div class=\"col-sm-12 col-md-6\">\n                        <address-form address.bind=\"employee.Address\"></address-form>\n                    </div>\n                </div>\n\n            </div>\n\n            <div class=\"tab-pane fade\" id=\"tax\" role=\"tabpanel\" aria-labelledby=\"tax-tab\">\n\n                <div class=\"form-group\">\n                    <label for=\"StarterDeclaration\">Starter declaration</label>\n\n                    <select class=\"form-control\" \n                        id=\"StarterDeclaration\" \n                        name=\"StarterDeclaration\" \n                        value.bind=\"employee.StarterDeclaration & validate\">\n                        <option value=\"\"></option>\n                        <option value=\"A\">A</option>\n                        <option value=\"B\">B</option>\n                        <option value=\"C\">C</option>\n                        <option value=\"NA\">N/A</option>\n                    </select>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"NiNumber\">Ni Number</label>\n                    <input type=\"text\" class=\"form-control\" id=\"NiNumber\" name=\"NiNumber\" value.bind=\"employee.NiNumber\" placeholder=\"Ni Number\">\n\n                    <span class=\"notes\">The employee's National Insurance number issued by HMRC. Temporary NI numbers should no longer be used\n                        for payroll.</span>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"DirectorshipAppointmentDate\">Directorship appointment date</label>\n                    <input type=\"date\" \n                        class=\"form-control\" \n                        id=\"DirectorshipAppointmentDate\" \n                        name=\"DirectorshipAppointmentDate\" \n                        value.bind=\"employee.DirectorshipAppointmentDate\"\n                        placeholder=\"Directorship appointment date\">\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"NicLiability\">Nic Liability</label>\n\n                    <select class=\"form-control\" id=\"NicLiability\" name=\"NicLiability\" multiple value.bind=\"employee.NicLiability\">\n                        <option value=\"IsFullyLiable\">IsFullyLiable</option>\n                        <option value=\"HasOtherJob\">HasOtherJob</option>\n                        <option value=\"IsFemaleEntitledToReducedRate\">IsFemaleEntitledToReducedRate</option>\n                        <option value=\"IsNotLiable\">IsNotLiable</option>\n                        <option value=\"IsContractedOut\">IsContractedOut</option>\n                        <option value=\"IsApprentice\">IsApprentice</option>\n                        <option value=\"LeaverBeyond6Weeks\">LeaverBeyond6Weeks</option>\n                    </select>\n\n                    <span class=\"notes\">\n                        The NIC liability flags are used to ensure the correct NI letter is assigned. See\n                        <a href=\"http://developer.payrun.io/docs/getting-started/using-the-correct-ni-letter-code.html\" target=\"_blank\">Using the correct NI letter code</a> for more information on setting the correct NIC liability flags.\n                    </span>\n                </div>\n            </div>\n\n            <div class=\"tab-pane fade\" id=\"ae\" role=\"tabpanel\" aria-labelledby=\"ae-tab\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"form-group\">\n                            <label for=\"AEAssessmentOverride\">AEAssessment override</label>\n\n                            <select class=\"form-control\" id=\"AEAssessmentOverride\" name=\"AEAssessmentOverride\" value.bind=\"employee.AEAssessmentOverride\">\n                                <option value=\"\"></option>\n                                <option value=\"None\">Not set</option>\n                                <option value=\"OptOut\">Opt out</option>\n                                <option value=\"OptIn\">Opt in</option>\n                                <option value=\"VoluntaryJoiner\">Voluntary joiner</option>\n                                <option value=\"ContractualPension\">Contractual pension</option>\n                                <option value=\"CeasedMembership\">Ceased membership</option>\n                                <option value=\"Leaver\">Leaver</option>\n                                <option value=\"Excluded\" Excluded></option>\n                            </select>\n\n                            <span class=\"notes\">\n                                The auto enrolment assessment override value. Enables the auto enrolment assessment result to be overridden\n                            </span>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"AEAssessmentOverrideDate\">Assessment override date</label>\n                            <input type=\"date\" \n                                class=\"form-control\" \n                                id=\"AEAssessmentOverrideDate\" \n                                name=\"AEAssessmentOverrideDate\" \n                                value.bind=\"employee.AEAssessmentOverrideDate\"\n                                placeholder=\"Assessment override date\">\n\n                            <span class=\"notes\">\n                                The auto enrolment assessment override date. Determines the date when auto enrolment assessment override applies.\n                            </span>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"AEPostponementDate\">Postponement date</label>\n                            <input type=\"date\" \n                                class=\"form-control\" \n                                id=\"AEPostponementDate\" \n                                name=\"AEPostponementDate\" \n                                value.bind=\"employee.AEPostponementDate\"\n                                placeholder=\"Postponement date\">\n\n                            <span class=\"notes\">\n                                The auto enrolment deferment date. Indicates the date when auto enrolment assessments are deferred to.\n                            </span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"tab-pane fade\" id=\"partner\" role=\"tabpanel\" aria-labelledby=\"partner-tab\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <span class=\"intro\">The details of the employee's partner only need be provided when claiming ShPP.</span>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col-sm-6\">                \n                        <div class=\"form-group\">\n                            <label for=\"EmployeePartner_Title\">Title</label>\n                            <input type=\"text\" \n                                class=\"form-control title\" \n                                id=\"EmployeePartner_Title\" \n                                name=\"EmployeePartner[Title]\" \n                                value.bind=\"employee.EmployeePartner.Title\"\n                                placeholder=\"Title\" \n                                maxlength=\"35\">\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"EmployeePartner_FirstName\">First name</label>\n                            <input type=\"text\" \n                                class=\"form-control\" \n                                id=\"EmployeePartner_FirstName\" \n                                name=\"EmployeePartner[FirstName]\" \n                                value.bind=\"employee.EmployeePartner.FirstName\"\n                                placeholder=\"First name\" \n                                maxlength=\"35\">\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"EmployeePartner_Initials\">Initials</label>\n                            <input type=\"text\" \n                                class=\"form-control initials\" \n                                id=\"EmployeePartner_Initials\" \n                                name=\"EmployeePartner[Initials]\" \n                                value.bind=\"employee.EmployeePartner.Initials\"\n                                placeholder=\"Initials\" \n                                maxlength=\"35\">\n\n                            <span class=\"notes\">The employee's initial, if not supplying a first name</span>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-6\"> \n                        <div class=\"form-group\">\n                            <label for=\"EmployeePartner_MiddleName\">Middle name(s)</label>\n                            <input type=\"text\" \n                                class=\"form-control\" \n                                id=\"EmployeePartner_MiddleName\" \n                                name=\"EmployeePartner[MiddleName]\" \n                                value.bind=\"employee.EmployeePartner.MiddleName\"\n                                placeholder=\"Middle name(s) if any\" \n                                maxlength=\"35\">\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"EmployeePartner_LastName\">Last name</label>\n                            <input type=\"text\" \n                                class=\"form-control\" \n                                id=\"EmployeePartner_LastName\" \n                                name=\"EmployeePartner[LastName]\" \n                                value.bind=\"employee.EmployeePartner.LastName\"\n                                placeholder=\"Last name\" \n                                maxlength=\"35\">\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"EmployeePartner_NiNumber\">Ni Number</label>\n                            <input type=\"text\" \n                                class=\"form-control\" \n                                id=\"EmployeePartner_NiNumber\" \n                                name=\"EmployeePartner[NiNumber]\" \n                                value.bind=\"employee.EmployeePartner.NiNumber\"\n                                placeholder=\"Ni Number\">\n\n                            <span class=\"notes\">The employee's National Insurance number issued by HMRC. Temporary NI numbers should no longer\n                                be used for payroll.</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"tab-pane fade\" id=\"advanced\" role=\"tabpanel\" aria-labelledby=\"advanced-tab\">\n\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-12 col-md-8\">\n                                <div class=\"form-group\" >\n                                    <label for=\"Territory\">Territory</label>\n\n                                    <select class=\"form-control\" id=\"Territory\" name=\"Territory\" value.bind=\"employee.Territory & validate\">\n                                        <option value=\"\"></option>\n                                        <option value=\"UnitedKingdom\">United Kingdom</option>\n                                    </select>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-12 col-md-4\">\n                                <div class=\"form-group\">\n                                    <label for=\"Region\">Region</label>\n\n                                    <select class=\"form-control\" id=\"Region\" name=\"Region\" value.bind=\"employee.Region & validate\">\n                                        <option value=\"\"></option>\n                                        <option value=\"England\">England</option>\n                                        <option value=\"Scotland\">Scotland</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"PaymentMethod\">Payment method</label>\n\n                            <select class=\"form-control\" id=\"PaymentMethod\" name=\"PaymentMethod\" value.bind=\"employee.PaymentMethod\">\n                                <option value=\"\"></option>\n                                <option value=\"NotSet\">Not set</option>\n                                <option value=\"Cash\">Cash</option>\n                                <option value=\"Cheque\">Cheque</option>\n                                <option value=\"BACS\">BACS</option>\n                            </select>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"MaritalStatus\">Marital status</label>\n\n                            <select class=\"form-control\" id=\"MaritalStatus\" name=\"MaritalStatus\" value.bind=\"employee.MaritalStatus\">\n                                <option value=\"\"></option>\n                                <option value=\"NotSet\">Not set</option>\n                                <option value=\"Single\">Single</option>\n                                <option value=\"Married\">Married</option>\n                                <option value=\"Divorced\">Divorced</option>\n                                <option value=\"Widowed\">Widowed</option>\n                            </select>\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"PassportNumber\">Passport number</label>\n                            <input type=\"text\" class=\"form-control\" id=\"PassportNumber\" name=\"PassportNumber\" value.bind=\"employee.PassportNumber\" placeholder=\"Passport number (if applicable)\"\n                                maxlength=\"10\">\n                        </div>\n\n                        <div class=\"form-group\">\n                            <label for=\"HoursPerWeek\">Hours per week</label>\n                            <input type=\"number\" class=\"form-control\" id=\"HoursPerWeek\" name=\"HoursPerWeek\" value.bind=\"employee.HoursPerWeek & validate\" placeholder=\"Hours per week\"\n                                min=\"0\" max=\"168\" step=\"0.5\">\n\n                            <span class=\"notes\">\n                                The employee's normal number of hours worked per week (irrespective of pay frequency).\n                            </span>\n                        </div>\n\n                        <rule-exclusions ruleexclusions.bind=\"employee.RuleExclusions\"></rule-exclusions>\n\n                        <div class=\"form-group\">\n                            <label for=\"Seconded\">Seconded</label>\n\n                            <select class=\"form-control\" id=\"Seconded\" name=\"Seconded\" value.bind=\"employee.Seconded\">\n                                <option value=\"\"></option>\n                                <option value=\"NotSet\">Not set</option>\n                                <option value=\"Stay183DaysOrMore\">Stay 183 days or more</option>\n                                <option value=\"StayLessThan183Days\">Stay less than 183 days</option>\n                                <option value=\"InOutUk\">In out Uk</option>\n                            </select>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"EEACitizen\" name=\"EEACitizen\" checked.bind=\"employee.EEACitizen\">\n\n                            <label class=\"form-check-label\" for=\"EEACitizen\">\n                                Is a citizen of the European Economic Area?\n                            </label>\n\n                            <span class=\"notes\">\n                                Indicates if the seconded employee is a citizen of the European Economic Area.\n                            </span>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"EPM6\" name=\"EPM6\" checked.bind=\"employee.EPM6\">\n\n                            <label class=\"form-check-label\" for=\"EPM6\">\n                                Indicates if the seconded employee is under an EPM6 (Modified) Scheme for tax equalised expatriate employees.\n                            </label>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"WorkingWeek\">Working week pattern</label>\n\n                            <select class=\"form-control\" id=\"WorkingWeek\" name=\"WorkingWeek\" multiple value.bind=\"employee.WorkingWeek\">\n                                <option value=\"AllWeekDays\">All week days</option>\n                                <option value=\"Monday\">Monday</option>\n                                <option value=\"Tuesday\">Tuesday</option>\n                                <option value=\"Wednesday\">Wednesday</option>\n                                <option value=\"Thursday\">Thursday</option>\n                                <option value=\"Friday\">Friday</option>\n                                <option value=\"Saturday\">Saturday</option>\n                                <option value=\"Sunday\">Sunday</option>\n                                <option value=\"AllDays\">All days</option>\n                                <option value=\"None\">None</option>\n                            </select>\n\n                            <span class=\"notes\">\n                                The employee's normal working week pattern.\n                            </span>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"IsAgencyWorker\" name=\"IsAgencyWorker\" checked.bind=\"employee.IsAgencyWorker\">\n\n                            <label class=\"form-check-label\" for=\"IsAgencyWorker\">\n                                Is an agency worker?\n                            </label>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"PaymentToANonIndividual\" name=\"PaymentToANonIndividual\" checked.bind=\"employee.PaymentToANonIndividual\">\n\n                            <label class=\"form-check-label\" for=\"PaymentToANonIndividual\">\n                                Indicates where payments are made to a body, such as personal representative, trustee or corporate organisation.\n                            </label>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"IrregularEmployment\" name=\"IrregularEmployment\" checked.bind=\"employee.IrregularEmployment\">\n\n                            <label class=\"form-check-label\" for=\"IrregularEmployment\">\n                                Indicates if the employee is paid on an irregular basis.\n                            </label>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input\" type=\"checkbox\" id=\"OnStrike\" name=\"OnStrike\" checked.bind=\"employee.OnStrike\">\n\n                            <label class=\"form-check-label\" for=\"OnStrike\">\n                                Indicates if the employee's pay in this pay period has been reduced due to being on strike.\n                            </label>\n                        </div>\n\n                        <div class=\"form-check\">\n                            <input class=\"form-check-input form-control-lg\" type=\"checkbox\" id=\"Deactivated\" name=\"Deactivated\" checked.bind=\"employee.Deactivated\">\n                            <label class=\"form-check-label\" for=\"Deactivated\">\n                                Indicates if the employee is deactivated.\n                            </label>\n                            <span class=\"notes\">Deactivated employees cannot be included in a pay run.</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"tab-pane fade\" id=\"revisions\" role=\"tabpanel\" aria-labelledby=\"revisions-tab\" if.bind=\"employee.Id\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 col-md-6\">\n                        <div class=\"form-group\">\n                            <label for=\"Revision\">Revision</label>\n                            \n                            <input type=\"number\" class=\"form-control\" id=\"Revision\" name=\"Revision\" value.bind=\"employee.Revision\" placeholder=\"Revision number\"\n                                readonly step=\"1\" min=\"0\">\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 col-md-6\" if.bind=\"employee.Revisions\">\n                        <h5>Revision History</h5>\n                        <span class=\"notes\">Employer revisions must be deleted in order, validation rules will prevent revisions being deleted if they invalidate an existing payrun.</span>\n                        <table class=\"table table-sm\">\n                            <thead>\n                                <tr>\n                                    <th>Revision</th>\n                                    <th>Effective Date</th>\n                                    <th></th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr repeat.for=\"revision of employee.Revisions\">\n                                    <td>${revision.Revision}</td>\n                                    <td>${revision.EffectiveDate}</td>\n                                    <td class=\"text-right\">\n                                        <a class=\"btn btn-sm btn-danger\" \n                                            href=\"#\" \n                                            role=\"button\" \n                                            click.delegate=\"deleteRevision(revision)\">Delete</a>\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>         \n                    </div>\n                </div>\n            </div>            \n\n            <div class=\"row\" if.bind=\"showSaveButton\">\n                <div class=\"col-sm-12\">\n                    <hr>\n                </div>\n            </div>\n\n            <div class=\"row\" if.bind=\"showSaveButton\">\n                <div class=\"col-sm-12 text-right\">\n                    <button class=\"btn btn-primary\" click.delegate=\"save()\">Save</button>\n                </div>\n            </div>\n        </div>\n    </form>\n</template>"; });
define('dialogs/confirm',["exports", "aurelia-framework", "aurelia-dialog"], function (exports, _aureliaFramework, _aureliaDialog) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Confirm = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Confirm = exports.Confirm = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
        function Confirm(dialogController) {
            _classCallCheck(this, Confirm);

            this.dialogController = dialogController;
        }

        Confirm.prototype.activate = function activate(state) {
            this.state = state;
        };

        Confirm.prototype.yes = function yes() {
            this.dialogController.ok();
        };

        Confirm.prototype.no = function no() {
            this.dialogController.cancel();
        };

        return Confirm;
    }()) || _class);
});
define('text!dialogs/confirm.html', ['module'], function(module) { module.exports = "<template>\n    <ux-dialog>\n        <ux-dialog-header>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h5>${state.title}</h5>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-header>\n        <ux-dialog-body>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12 text-left\">\n                        <p>${state.message}</p>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-body>\n\n        <ux-dialog-footer>\n            <div class=\"container-fluid\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 text-left\">\n                        <button class=\"btn btn-secondary\" click.trigger=\"no()\">No</button>\n                    </div>\n                    <div class=\"col-sm-6 text-right\">\n                        <button class=\"btn btn-danger\" click.trigger=\"yes()\">Yes</button>\n                    </div>\n                </div>\n            </div>\n        </ux-dialog-footer>\n    </ux-dialog>\n</template>"; });
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
define('app',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-dialog", "job/job-details-modal", "aurelia-pal", "aurelia-http-client", "aurelia-router"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaDialog, _jobDetailsModal, _aureliaPal, _aureliaHttpClient, _aureliaRouter) {
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
            var _this = this;

            this.ea.subscribe("app:view-job", function (job) {
                var opts = {
                    viewModel: _jobDetailsModal.JobDetailsModal,
                    model: job
                };

                _this.dialogService.open(opts);
            });
        };

        App.prototype.configureRouter = function configureRouter(config, router) {
            config.title = "PayRun.io Demo";

            config.map([{
                name: "get-started",
                route: "",
                moduleId: _aureliaPal.PLATFORM.moduleName("welcome/welcome"),
                title: "Get started",
                auth: false,
                includeInBreadcrumbs: true
            }, {
                name: "setup",
                route: "setup",
                moduleId: _aureliaPal.PLATFORM.moduleName("welcome/setup"),
                title: "Setup",
                auth: false,
                previousInstruction: "get-started"
            }, {
                name: "employers",
                route: "employers",
                moduleId: _aureliaPal.PLATFORM.moduleName("employer/list"),
                title: "Employers",
                auth: true,
                includeInBreadcrumbs: true,
                previousInstruction: "get-started"
            }, {
                name: "employer",
                route: "employer/:id?",
                moduleId: _aureliaPal.PLATFORM.moduleName("employer/employer"),
                title: "Employer",
                auth: true,
                includeInBreadcrumbs: true,
                previousInstruction: "employers"
            }, {
                name: "employee",
                route: "employer/:employerId/employee/:employeeId?",
                moduleId: _aureliaPal.PLATFORM.moduleName("employee/employee"),
                title: "Employee",
                auth: true,
                includeInBreadcrumbs: true,
                previousInstruction: "employer"
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

                client.get("/api/has-been-setup").then(function (res) {
                    var parsedResponse = JSON.parse(res.response);
                    var currentRoute = navigationInstruction.config;
                    var loginRequired = currentRoute.auth && currentRoute.auth === true;

                    if (!parsedResponse.hasBeenSetup && loginRequired) {
                        return resolve(next.cancel(new _aureliaRouter.Redirect("setup")));
                    }

                    return resolve(next());
                });
            });
        };

        return AuthorizeStep;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"./header/header\"></require>\t\n\t<require from=\"./footer/footer\"></require>\n\t<require from=\"./api-calls/api-calls\"></require>\n\t<require from=\"./resources/elements/router-progress-indicator/router-progress-indicator\"></require>\n\t<require from=\"./resources/elements/breadcrumbs/breadcrumbs\"></require>\n\t<require from=\"./resources/elements/request-indicator/request-indicator\"></require>\n\n\t<router-progress-indicator></router-progress-indicator>\n\n\t<header></header>\n\n\t<breadcrumbs></breadcrumbs>\n\n\t<div class=\"container content-container\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t<router-view></router-view>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<footer></footer>\n\n\t<api-calls></api-calls>\n\n\t<request-indicator></request-indicator>\n</template>"; });
define('api-calls/api-calls',["exports", "aurelia-framework", "aurelia-event-aggregator", "aurelia-http-client"], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.APICalls = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _dec2, _class;

    var APICalls = exports.APICalls = (_dec = (0, _aureliaFramework.customElement)("api-calls"), _dec2 = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = function () {
        function APICalls(EventAggregator) {
            _classCallCheck(this, APICalls);

            this.ea = EventAggregator;
            this.visible = false;
            this.calls = [];
            this.client = new _aureliaHttpClient.HttpClient();
        }

        APICalls.prototype.attached = function attached() {
            var _this = this;

            this.toggleAPICallsSubscriber = this.ea.subscribe("toggleAPICalls", function () {
                _this.visible = !_this.visible;
            });

            this.loadCalls();
        };

        APICalls.prototype.loadCalls = function loadCalls() {
            var _this2 = this;

            this.client.get("/api/api-calls").then(function (res) {
                var response = res.response;

                if (response === "") {
                    return;
                }

                var calls = JSON.parse(response);

                if (_this2.calls.length !== calls.length) {
                    _this2.calls = calls;
                }

                window.setTimeout(function () {
                    _this2.loadCalls();
                }, 1500);
            });
        };

        APICalls.prototype.showCallDetails = function showCallDetails(call) {
            this.selectedCall = call;

            $(".api-calls-container").animate({ scrollTop: 0 }, 500);
        };

        APICalls.prototype.copyTextToClipboard = function copyTextToClipboard(e) {
            var _this3 = this;

            var $btn = $(e.target);
            var $code = $btn.parent().find("code");
            var text = $code.text();

            if (!navigator.clipboard) {
                this.fallbackCopyTextToClipboard(text);
                return;
            }

            navigator.clipboard.writeText(text).then(function () {}, function () {
                _this3.fallbackCopyTextToClipboard(text);
            });
        };

        APICalls.prototype.fallbackCopyTextToClipboard = function fallbackCopyTextToClipboard(text) {
            var textarea = document.createElement("textarea");

            textarea.textContent = text;
            document.body.appendChild(textarea);

            var selection = document.getSelection();
            var range = document.createRange();

            range.selectNode(textarea);
            selection.removeAllRanges();
            selection.addRange(range);

            selection.removeAllRanges();

            document.body.removeChild(textarea);
        };

        APICalls.prototype.detached = function detached() {
            this.toggleAPICallsSubscriber.dispose();
        };

        APICalls.prototype.close = function close() {
            this.visible = false;
        };

        return APICalls;
    }()) || _class) || _class);
});
define('text!api-calls/api-calls.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"api-calls\" if.bind=\"visible\">\n        <div class=\"rui-resizable-content\">\n            <div class=\"container-fluid\">\n                <div class=\"row title\">\n                    <div class=\"col-sm-11\">\n                        API calls\n                    </div>\n\n                    <div class=\"col-sm-1 text-right close-api-calls\" click.delegate=\"close()\">\n                        <i class=\"fas fa-times\"></i>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <div class=\"api-calls-container\">\n                            <div class=\"container-fluid\">\n                                <div class=\"row\">\n                                    <div class=\"col-sm-4\">\n                                        <div class=\"row\" repeat.for=\"call of calls\">\n                                            <div class=\"col-sm-12\">\n                                                <div class=\"summary\" click.delegate=\"showCallDetails(call)\">\n                                                    <span>\n                                                        ${call.method}\n                                                        <strong>/${call.relativeUri}</strong>\n                                                    </span>\n\n                                                    <em>\n                                                        <i class=\"fas fa-chevron-right\"></i>\n                                                    </em>\n                                                </div>\n                                            </div>\n\n                                            <div class=\"col-sm-12\">\n                                                <hr>\n                                            </div>\n                                        </div>\n                                    </div>\n\n                                    <div class=\"col-sm-8 request-and-response\">\n                                        <div if.bind=\"selectedCall\">\n                                            <h4>\n                                                ${selectedCall.method}\n                                                <strong>/${selectedCall.relativeUri}</strong>\n                                            </h4>\n\n                                            <nav>\n                                                <div class=\"nav nav-tabs\" id=\"nav-tab\" role=\"tablist\">\n                                                    <a class=\"nav-item nav-link active\" data-toggle=\"tab\" href=\"#nav-request\">Request</a>\n                                                    <a class=\"nav-item nav-link\" data-toggle=\"tab\" href=\"#nav-response\">Response</a>\n                                                </div>\n                                            </nav>\n                                            <div class=\"tab-content\" id=\"nav-tabContent\">\n                                                <div class=\"tab-pane fade show active\" id=\"nav-request\">\n                                                    <div class=\"code-container\">\n                                                        <button type=\"button\" class=\"btn btn-secondary btn-sm btn-copy\"\n                                                            click.delegate=\"copyTextToClipboard($event)\">Copy</button>\n\n                                                        <code>\n                                                        curl -X ${selectedCall.method} \\\n                                                            <span>${selectedCall.uri} \\</span>\n                                                            <span>-H 'Accept: ${selectedCall.headers.Accept}' \\</span>\n                                                            <span>-H 'Api-Version: default' \\</span>\n                                                            <span>-H 'Authorization: ${selectedCall.headers.Authorization}' \\</span>\n                                                            <span>-H 'Cache-Control: no-cache' \\</span>\n                                                            <span>-H 'Content-type: ${selectedCall.headers.Accept}' \\</span>\n                                    \n                                                            <span if.bind=\"selectedCall.hasRequestBody\" \n                                                                innerhtml.bind=\"selectedCall.requestBody\"></span>\n                                                    </code>\n                                                    </div>\n                                                </div>\n                                                <div class=\"tab-pane fade\" id=\"nav-response\">\n                                                    <div class=\"code-container\">\n                                                        <code innerhtml.bind=\"selectedCall.response\"></code>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n\n                                        <div class=\"initial-request-and-response-explanation\" if.bind=\"!selectedCall\">\n                                            <p>Click on a request to view the request and response details here</p>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map