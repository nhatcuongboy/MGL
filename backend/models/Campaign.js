const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let campaignSchema = new Schema({
    account: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    created: {
        type: Date
    },
	createdBy: {
        type: Schema.Types.ObjectId
    },
    modified: {
        type: Date
    },
	modifiedBy: {
        type: Schema.Types.ObjectId
    },
	statistics: {
		channels: {
			type: Number
		},
        emailsRecipients: {
			type: Number
		},
		emailsSent: {
			type: Number
		},
		smsRecipients: {
			type: Number
		},
		smsSent: {
			type: Number
		}
    }
}, {
    collection: 'campaigns'
})

//campaignSchema.plugin(uniqueValidator, { message: 'Account already in use.' });
module.exports = mongoose.model('Campaign', campaignSchema)