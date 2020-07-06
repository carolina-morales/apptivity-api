import express, { json } from 'express';
import morgan from 'morgan';
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(json());
app.use(morgan('dev'));

// Routes
const userRoutes = require('./routes/user.routes');
const tasksRoutes = require('./routes/tasklist.routes');
app.use('/user', userRoutes);
app.use('/tasklist', tasksRoutes);

export default app;
