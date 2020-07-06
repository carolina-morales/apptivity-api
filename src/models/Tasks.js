import { Schema, model } from 'mongoose';
import { TaskSchema } from './Task';

const TasksSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		tasks: {
			type: [ TaskSchema ],
			default: []
		}
	},
	{ timestamps: true }
);

module.exports = model('Tasks', TasksSchema);
