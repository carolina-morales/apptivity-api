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
const tasksRoutes = require('./routes/tasks.routes');
app.use('/user', userRoutes);
app.use('/tasks', tasksRoutes);

export default app;
