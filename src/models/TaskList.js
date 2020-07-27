import { Schema, model } from 'mongoose';

const TaskListSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		tasks: {
			type: Array,
			default: []
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		board: {
			type: Schema.Types.ObjectId,
			ref: 'Board'
		}
	},
	{ timestamps: true }
);

module.exports = model('TaskList', TaskListSchema);
