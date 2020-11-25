const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Attribute = new Schema({
    attribut: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    contactId: {
        type: Schema.Types.ObjectId,
        ref: "contact",
        required: true,
    }
});


module.exports = mongoose.model('attribute', Attribute);
