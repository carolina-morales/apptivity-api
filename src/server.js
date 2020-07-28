import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads-files', express.static(path.join(__dirname, './uploads')));
app.use(morgan('dev'));

// Routes
app.use('/user', require('./routes/user.routes'));
app.use('/tasklist', require('./routes/tasklist.routes'));
app.use('/board', require('./routes/board.routes'));
app.use('/task', require('./routes/task.routes'));
app.use('/files', require('./routes/files.routes'));

export default app;
