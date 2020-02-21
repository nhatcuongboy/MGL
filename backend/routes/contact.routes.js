const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const contactRouter = express.Router();
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

let Contact = require('../models/Contact');

// Create-contact
contactRouter.post("/contact/create",
    [
        check('account', 'Account is required')
            .not()
            .isEmpty()
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else if (!req.body.email && !req.body.mobile) {
            return res.status(422).json({
                massage: 'The contact must have at least one of email or mobile'
            });
        } else {
            Contact.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.json(data)
                }
            })
        }
    });

// List contact
contactRouter.route('/contact/contacts').get((req, res) => {
    Contact.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//Get contact by account 
contactRouter.route('/contact/account/:id').get((req, res) => {
    Contact.find({ 'account': req.params.id }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

// Get single contact
contactRouter.route('/contact/read/:id').get((req, res) => {
    Contact.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update contact
contactRouter.route('/contact/update/:id').put((req, res, next) => {
    Contact.findByIdAndUpdate(req.params.id, {
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

// Delete contact
contactRouter.route('/contact/delete/:id').delete((req, res, next) => {
    Contact.findOneAndDelete({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


module.exports = contactRouter;