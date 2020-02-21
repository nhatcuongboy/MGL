const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

let User = require('../models/User');

// Create-user
userRouter.post("/user/create",
    [
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 8 to 20 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 8, max: 20 }),
        check('confirmPassword', 'confirmPassword should be between 8 to 20 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 8, max: 20 }),
        check('role')
            .not()
            .isEmpty(),
        check('account')
            .not()
            .isEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            if (req.body.password === req.body.confirmPassword) {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    const user = new User({
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: hash,
                        role: req.body.role,
                        account: req.body.account
                    });
                    user.save().then((response) => {
                        res.status(201).json({
                            message: "User successfully created!",
                            result: response
                        });
                    }).catch(error => {
                        res.status(500).json({
                            error: error
                        });
                    });
                });
            } else {
                res.status(500).json({
                    error: "Passwords do not match"
                });
            }
        }
    });


// Sign-in
userRouter.post("/user/login", (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id,
            role: getUser.role
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});
	
// List Users
userRouter.route('/user/users').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Get user by account 
userRouter.route('/user/account/:id').get((req, res) => {
  User.find({ 'account': req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single user
userRouter.route('/user/read/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update User
userRouter.route('/user/update/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
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

// Delete User
userRouter.route('/user/delete/:id').delete((req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRouter;