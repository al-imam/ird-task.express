"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("$/app");
var _db_1 = require("$db");
var port = process.env.PORT || 5000;
_db_1.db.sequelize.sync().then(function () {
    app_1.app.listen(port, function () {
        /* eslint-disable no-console */
        console.log("Listening: http://localhost:".concat(port));
        /* eslint-enable no-console */
    });
});
