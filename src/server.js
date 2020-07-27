import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(json());
app.use(morgan('dev'));

// Routes
app.use('/user', require('./routes/user.routes'));
app.use('/tasklist', require('./routes/tasklist.routes'));
app.use('/board', require('./routes/board.routes'));
app.use('/task', require('./routes/task.routes'));

export default app;
