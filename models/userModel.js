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
		required: true},
	name: {
		type: String,
		required: true},
	phoneNumber: {
		type: String,
		// validate: {
	 // 		validator: function(v) {
	 // 			if (v === "") {
	 // 				return true;
	 // 			} else {
	 // 				return /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/.test(v);
	 // 			}
	 // 		},
	 // 		message: 'This is not a valid phonenumber!'
	 // 	},
		required: true},
	address: {
		type: String,
		required: true},
	gradYear: {
		type: Number,
		required: true},
	workLoc: {
		type: String},
	workPosition: {
		type: String},
	course: {type: [String],
		required: true},
	activities: {type: [String]},
	connections: {type: [String]}
	//other things to have: phone number, name, course, year of grad, address, work
});

userSchema.methods.editInfo = function(course, phoneNumber, address, gradYear, workLoc, workPosition, activities) {
	this.course = course;
	this.phoneNumber = phoneNumber;
	this.address = address;
	this.gradYear = gradYear;
	this.workLoc = workLoc;
	this.workPosition = workPosition;
	this.activities = activities;
	return true;
}



var User = mongoose.model('User', userSchema);

module.exports = User;