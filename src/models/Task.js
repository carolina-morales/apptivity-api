import mongoose, { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId,
		required: true,
		default: new mongoose.Types.ObjectId()
	},
	name: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date()
	}
});

module.exports = model('Task', TaskSchema);
