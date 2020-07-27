import { Schema, model } from 'mongoose';

const BoardSchema = new Schema(
	{
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		name: {
			type: String,
			required: true,
			default: 'My Board'
		},
		taskLists: [
			{
				type: Schema.Types.ObjectId,
				ref: 'TaskList'
			}
		]
	},
	{ timestamps: true }
);

module.exports = model('Board', BoardSchema);
