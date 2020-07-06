import Tasks from '../models/Tasks';
import { validationResult } from 'express-validator';

const tasksCtrl = {};

tasksCtrl.addTasks = async (req, res) => {
	console.log('create tasks works');
	res.json({ msg: 'success' });
};

module.exports = tasksCtrl;
