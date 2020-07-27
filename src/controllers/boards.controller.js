import User from '../models/User';
import Board from '../models/Board';
import TaskList from '../models/TaskList';
import { validationResult } from 'express-validator';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const boardCtrl = {};

boardCtrl.getBoard = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(200).json({ ok: false, errors: errors.array() });

	const { id_board } = req.params;
	try {
		const board = await Board.findById(id_board).populate('taskLists');
		if (!board) return res.status(400).json({ msg: 'No se encontró el tablero' });

		res.status(200).json({ ok: true, board });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

boardCtrl.getBoardsByUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(200).json({ ok: false, errors: errors.array() });

	const { id_user } = req.params;
	try {
		const boards = await Board.find({ author: ObjectId(id_user) }).populate('taskLists');
		if (!boards) return res.status(200).json({ ok: false, errors: [ { msg: 'No se encontraron tableros' } ] });

		res.status(200).json({ ok: true, boards });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

boardCtrl.createBoard = async (req, res) => {
	const errors = validationResult(req);
	if (!errors) return res.status(200).json({ ok: false, errors: errors.array() });

	const { id_user } = req.params;
	const { name } = req.body;
	try {
		const isExists = await Board.findOne({ name, author: ObjectId(id_user) });
		if (isExists)
			return res.status(200).json({ ok: false, errors: [ { msg: 'Ya hay un tablero con este nombre' } ] });

		const newBoard = new Board({ name });
		const user = await User.findById(id_user);
		newBoard.author = user;

		await newBoard.save();
		user.boards.push(newBoard);
		await user.save();

		res.status(200).json({ ok: true, msg: 'Tablero creado', board: newBoard });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

module.exports = boardCtrl;
