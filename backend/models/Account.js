const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let accountSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    country: {
        type: String
    },
    timezone: {
        type: String
    },
	currency: {
        type: String
    },
    monthlyFee: {
        type: Number
    },
    emailInclusion: {
        type: Number
    },
	smsInclusion: {
        type: Number
    },
	contactInclusion: {
        type: Number
    },
	emailFee: {
        type: Number
    },
	smsFee: {
        type: Number
    },
	contactFee: {
        type: Number
    },
	startupFee: {
        type: Number
    },
	parent: {
        type: Schema.Types.ObjectId
    }
}, {
    collection: 'accounts'
})

accountSchema.plugin(uniqueValidator, { message: 'Account name already in use.' });
module.exports = mongoose.model('Account', accountSchema)