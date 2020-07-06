import User from '../models/User';
import TaskList from '../models/TaskList';
import { validationResult } from 'express-validator';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const taskListCtrl = {};

taskListCtrl.addTaskList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(400).json({ errors: errors.array() });

	const { userId } = req.params;
	const { name } = req.body;
	try {
		const nameTaskList = await TaskList.findOne({ name, author: ObjectId(userId) });
		if (nameTaskList) return res.status(400).json({ msg: 'Ya hay una tarea con este nombre' });

		const newTaskList = new TaskList({ name });
		const user = await User.findById(userId);
		newTaskList.author = user;

		await newTaskList.save();
		user.taskLists.push(newTaskList);
		await user.save();

		res.status(200).json({ msg: 'Lista de tareas creada', list: newTaskList });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

taskListCtrl.getTaskLists = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(400).json({ errors: errors.array() });

	const { userId } = req.body;
	try {
		const user = await User.findById(userId).populate('taskLists');
		if (!user) return res.status(400).json({ msg: 'No se encontró el usuario' });
		res.status(200).json({ taskLists: user.taskLists });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

taskListCtrl.getTaskList = async (req, res) => {
	const { taskListId } = req.params;
	try {
		const taskList = await TaskList.findById(taskListId);
		if (!taskList) return res.status(400).json({ msg: 'No se encontró la lista de tareas' });
		return res.status(200).json({ taskList });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

taskListCtrl.updateTaskList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(400).json({ errors: errors.array() });

	const { taskListId } = req.params;
	const { userId, name } = req.body;
	try {
		taskList = await TaskList.findOne({ name, author: ObjectId(userId) });
		if (taskList) return res.status(400).json({ msg: 'Ya hay una tarea con este nombre' });

		taskList = await TaskList.findByIdAndUpdate(taskListId, { name }, { new: true });
		return res.status(200).json({ msg: 'Datos actualizados' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

taskListCtrl.deleteTaskList = async (req, res) => {
	const { taskListId } = req.params;
	try {
		const taskList = await TaskList.findByIdAndRemove(taskListId, { new: true });
		const user = await User.update({ taskLists: taskListId }, { $pull: { taskLists: taskListId } });
		res.status(200).json({ msg: 'Listaod de tareas borrado' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

module.exports = taskListCtrl;
