const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

let Contact = new Schema({
    imgUrl: {
        type: String,
    },
    createdAt: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD'),
    },
    attributes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'attribute',
            required: true,
        },
    ],
});


module.exports = mongoose.model('contact', Contact);
