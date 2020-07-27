import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		lastname: {
			type: String,
			required: true
		},
		username: {
			type: String,
			unique: true,
			default: ''
		},
		birthdate: {
			type: Date,
			required: false,
			default: null
		},
		email: {
			type: String,
			unique: true,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		boards: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Board'
			}
		],
		block: {
			type: Boolean,
			required: false,
			default: false
		},
		isAdmin: {
			type: Boolean,
			required: false,
			default: false
		},
		image: {
			type: String,
			required: false,
			default: ''
		}
	},
	{ timestamps: true }
);

UserSchema.methods.encryptPassword = async (password) => {
	const salt = await bcryptjs.genSalt(10);
	return await bcryptjs.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
	return await bcryptjs.compare(password, this.password);
};

module.exports = model('User', UserSchema);
