'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "time", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "time_migration",
    "created": "2020-08-03T00:53:51.321Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "time",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
