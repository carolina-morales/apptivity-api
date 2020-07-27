import Task from '../models/Task';
import TaskList from '../models/TaskList';
import { validationResult } from 'express-validator';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const taskCtrl = {};

taskCtrl.createTask = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(200).json({ ok: false, errors: errors.array() });

	const { id_tasklist } = req.params;
	const { name } = req.body;
	try {
		const newTask = new Task({ name });
		const tasklist = await TaskList.findById(id_tasklist);
		tasklist.tasks.push(newTask);
		await tasklist.save();

		res.status(200).json({ ok: true, msg: 'Tarea creada', task: newTask });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

module.exports = taskCtrl;
