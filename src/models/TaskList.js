import { Schema, model } from 'mongoose';

const TaskListSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		tasks: {
			type: Schema.Types.ObjectId,
			ref: 'Task'
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

module.exports = model('TaskList', TaskListSchema);
