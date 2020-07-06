import mongoose, { mongo } from 'mongoose';

const { MONGO_HOST, MONGO_DBNAME } = process.env;
const MONGO_URI = `mongodb://${MONGO_HOST}/${MONGO_DBNAME}`;

export async function connect() {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true
		});
		console.log('Database is connected');
	} catch (error) {
		console.log('An error ocurred', error);
	}
}
