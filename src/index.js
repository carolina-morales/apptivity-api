import '@babel/polyfill';
import colors from 'colors';

require('dotenv').config();

import app from './server';
require('./database').connect();

(async () => {
	await app.listen(app.get('port'));
	console.log('Server is running on port'.green, app.get('port'));
})();
