var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
	title		: { type: String, required: true },
	description	: { type: String, required: false },
	completed	: { type: Boolean, default: false },
	created_at	: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Todo', ItemSchema);
