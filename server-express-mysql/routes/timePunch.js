var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/punchIn', function (req, res, next) {
    models.time
        .Create({
            where: {
                UserId: req.body.UserId
            },
            defaults: {
                clock_in: Date.now()
            }
        })
        .spread(function (result, created) {
            if (created) {
                res.send('User successfully created');
            } else {
                res.send('This user already exists');
            }
        });
});