var mongoose = require('mongoose');
var scheme = mongoose.Schema;
var schema = new scheme({ 
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = mongoose.model('Activity', schema);//accessing a model