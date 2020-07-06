import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = model('Task', TaskSchema);
