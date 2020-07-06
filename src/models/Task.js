import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		list: {
			type: Schema.Types.ObjectId,
			ref: 'TaskList'
		}
	},
	{ timestamps: true }
);

module.exports = model('Task', TaskSchema);
