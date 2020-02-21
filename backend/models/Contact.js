const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let contactSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: String
    },
    firstName: {
        type: String
    },
	lastName: {
        type: String
    },
    birthday: {
        type: Date
    },
    gender: {
        type: String
    },
	hobbies: {
        type: Array
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
    account: {
        type: Schema.Types.ObjectId
    }
}, {
    collection: 'contacts'
})

contactSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('Contact', contactSchema)