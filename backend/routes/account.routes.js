const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const accountRouter = express.Router();
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

let Account = require('../models/Account');

// Create-account
accountRouter.post("/account/create",
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('country', 'country is required')
      .not()
      .isEmpty(),
    check('timezone', 'timezone is required')
      .not()
      .isEmpty(),
    check('currency', 'currency is required')
      .not()
      .isEmpty(),
    check('monthlyFee', 'monthlyFee is required')
      .not()
      .isEmpty(),
    check('emailInclusion', 'emailInclusion is required')
      .not()
      .isEmpty(),
    check('smsInclusion', 'smsInclusion is required')
      .not()
      .isEmpty(),
    check('contactInclusion', 'contactInclusion is required')
      .not()
      .isEmpty(),
    check('emailFee', 'emailFee is required')
      .not()
      .isEmpty(),
    check('smsFee', 'smsFee is required')
      .not()
      .isEmpty(),
    check('contactFee', 'contactFee is required')
      .not()
      .isEmpty(),
    check('startupFee', 'startupFee is required')
      .not()
      .isEmpty()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }
    else {
      Account.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    }
  });

// List Account
accountRouter.route('/account/accounts').get((req, res) => {
  Account.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Account
accountRouter.route('/account/read/:id').get((req, res) => {
  Account.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get children
accountRouter.route('/account/children/:id').get((req, res) => {
    Account.find({'parent': req.params.id}, (error, data) => {
        console.log(req.params.id)
        if (error) {
            return next(error)
        } else {
            if(data.length === 0){
                res.json({
                    hasChild: false
                })
            } else {
                res.json({
                    hasChild: true,
                    data: data
                })
            }
    }
    })
})



// Update Account
accountRouter.route('/account/update/:id').put((req, res, next) => {
  Account.findByIdAndUpdate(req.params.id, {
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

// Delete Account
accountRouter.route('/account/delete/:id').delete((req, res, next) => {
  Account.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = accountRouter;