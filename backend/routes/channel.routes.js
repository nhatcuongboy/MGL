const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const channelRouter = express.Router();
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

let Channel = require('../models/Channel');

// Create-channel
channelRouter.post("/channel/create",
    [
        check('campaign', 'campaign is required')
            .not()
            .isEmpty(),
        check('type', 'type is required')
            .not()
            .isEmpty(),
        check('from', 'from is required')
            .not()
            .isEmpty(),
        check('fromName', 'fromName is required')
            .not()
            .isEmpty(),
        check('subject', 'subject is required')
            .not()
            .isEmpty(),
        check('content', 'content is required')
            .not()
            .isEmpty()
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            Channel.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.json(data)
                }
            })
        }
    });

// List channel
channelRouter.route('/channel/channels').get((req, res) => {
    Channel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//Get channel by campaign 
channelRouter.route('/channel/campaign/:id').get((req, res) => {
    Channel.find({ 'campaign': req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//Get channel by account
channelRouter.route('/channel/account/:id').get((req, res) => {
    Channel.find({ 'account': req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single channel
channelRouter.route('/channel/read/:id').get((req, res) => {
    Channel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update channel
channelRouter.route('/channel/update/:id').put((req, res, next) => {
    Channel.findByIdAndUpdate(req.params.id, {
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

// Delete channel
channelRouter.route('/channel/delete/:id').delete((req, res, next) => {
    Channel.findOneAndDelete({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


module.exports = channelRouter;