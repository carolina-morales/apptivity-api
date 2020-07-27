import User from '../models/User';
import Board from '../models/Board';
import TaskList from '../models/TaskList';
import { validationResult } from 'express-validator';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const taskListCtrl = {};

taskListCtrl.addTaskList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(200).json({ ok: false, errors: errors.array() });

	const { id_board } = req.params;
	const { name, id_user } = req.body;
	try {
		const nameTaskList = await TaskList.findOne({ name, author: ObjectId(id_board) });
		if (nameTaskList)
			return res.status(200).json({ ok: false, errors: [ { msg: 'Ya hay una tarea con este nombre' } ] });

		const newTaskList = new TaskList({ name });
		const board = await Board.findById(id_board);
		const user = await User.findById(id_user);
		newTaskList.author = user;
		newTaskList.board = board;

		await newTaskList.save();
		board.taskLists.push(newTaskList);
		await board.save();

		res.status(200).json({ ok: true, msg: 'Lista de tareas creada', list: newTaskList });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

taskListCtrl.getTaskListsByUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(400).json({ errors: errors.array() });

	const { id_user } = req.params;
	try {
		const user = await User.findById(id_user).populate('taskLists');
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

taskListCtrl.getTaskLists = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(400).json({ errors: errors.array() });

	try {
		// const user = await User.findById(userId).populate('taskLists');
		// if (!user) return res.status(400).json({ msg: 'No se encontró el usuario' });
		res.status(200).json({ taskLists: 'tasklists' });
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
