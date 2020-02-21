const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let channelSchema = new Schema({
    campaign: {
        type: Schema.Types.ObjectId,
        unique: true
    },
    type: {
        type: String
    },
    from: {
        type: String
    },
	fromName: {
        type: String
    },
    subject: {
        type: String
    },
	content: {
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
	sent: {
		type: Date
	},
	// search: {
	// 	join: {
	// 		type: String
	// 	},
    //     fields: {
	// 		type: Array
	// 	}
    // },
    contacts: {
      type: Array
    },
	statistics: {
		emailsSent: {
			type: Number
		},
        smsSent: {
			type: Number
		}
    }
}, {
    collection: 'channels'
})

channelSchema.plugin(uniqueValidator, { message: 'Campaign already in use.' });
module.exports = mongoose.model('Channel', channelSchema)