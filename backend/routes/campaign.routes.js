const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const campaignRouter = express.Router();
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

let Campaign = require('../models/Campaign');

// Create-campaign
campaignRouter.post("/campaign/create",
    [
        check('account', 'Account is required')
            .not()
            .isEmpty(),
        check('name', 'name is required')
            .not()
            .isEmpty()
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            Campaign.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.json(data)
                }
            })
        }
    });

// List campaign
campaignRouter.route('/campaign/campaigns').get((req, res) => {
    Campaign.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//Get campaign by account 
campaignRouter.route('/campaign/account/:id').get((req, res) => {
    Campaign.find({ 'account': req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single campaign
campaignRouter.route('/campaign/read/:id').get((req, res) => {
    Campaign.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update campaign
campaignRouter.route('/campaign/update/:id').put((req, res, next) => {
    Campaign.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

// Delete campaign
campaignRouter.route('/campaign/delete/:id').delete((req, res, next) => {
    Campaign.findOneAndDelete({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


module.exports = campaignRouter;