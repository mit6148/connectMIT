var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {
		type: String, 
		required: true, 
		// validate: {
		// 	validator: function(v) {
		// 		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) && v.endsWith('@mit.edu');
		// 	},
		// 	message: 'This is not an MIT email!'
		// },
		unique: true},
	password: {
		type: String, 
		required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;