/**
 * Created by adityamangipudi1 on 4/22/15.
 */
var mongoose = require('mongoose')
var ContactModel = mongoose.model('contact', {
    name: String,
    email:{
        type: String,
        unique: true
    }
})
module.exports = ContactModel