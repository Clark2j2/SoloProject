const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	dateIn: {
		type: Date
		// required: [true, "Date is required"]
	},
	dateOut: {
		type: Date
		// required: [true, "Date is required"],
	},
	whoDonated: {
		type: String
		// required: [true, "Donor is required"],
		// minlength: [3, "More than 3 characters needed"]
	},
	donorEmail: {
		type: String
		// required: [true, "Email is required"],
		// minlength: [5, "More than 5 characters needed"]
	},
	donorPhonenumber: {
		type: String
		// required: [true, "Phone number is required"],
		// minlength: [6, "More than 6 characters needed"]
	},
	donorAddress: {
		type: String
		// required: [true, "Address is required"],
		// minlength: [3, "More than 3 characters needed"]
	},
	item: {
		type: String
		// required: [true, "Item is required"],
		// minlength: [3, "More than 3 characters needed"]
	},
	brand: {
		type: String
	},
	description: {
		type: String
		// required: [true, "Description is required"],
		// minlength: [3, "More than 3 characters needed"]
	},
	serialNumber: {
		type: String
	},
	value: {
		type: String
	},
	donateToName: {
		type: String
	},
	donateToEmail: {
		type: String
	},
	donateToPhonenumber: {
		type: String
	},
	donateToAddress: {
		type: String
	},
	taxForm: {
		type: Boolean
	},
	thankYou: {
		type: Boolean
	},
	quickBooks: {
		type: Boolean
	},
	physicalLocation: {
		type: String
	},
	notes: {
		type: String
	},
}, {timestamps:true});

const User = mongoose.model("User", UserSchema);

module.exports = User;