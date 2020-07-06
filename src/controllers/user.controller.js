import User from '../models/User';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { json } from 'express';

const userCtrl = {};

userCtrl.signup = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { name, lastname, birthdate, username, email, password, confirm_password, isAdmin } = req.body;

	if (password !== confirm_password) return res.status(400).json({ msg: 'Las contaseñas no coinciden' });

	try {
		const emailUser = await User.findOne({ email });
		if (emailUser) return res.status(400).json({ msg: 'El email ya está en uso' });
		const newUser = new User({
			name,
			lastname,
			birthdate,
			username,
			email,
			password,
			isAdmin
		});
		newUser.password = await newUser.encryptPassword(password);
		await newUser.save();

		return res.status(200).json({ msg: 'Cuenta creada' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

userCtrl.login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) return res.status(400).json({ msg: 'No hay cuenta asociada con este correo' });

		const successPassword = await bcryptjs.compare(password, user.password);
		if (!successPassword) return res.status(400).json({ msg: 'Contraseña incorrecta' });

		// jwt
		const payload = { user };
		jwt.sign(
			payload,
			process.env.SECRET_KEY,
			{
				expiresIn: 3600
			},
			(error, token) => {
				if (error) throw error;
				return res.status(200).json({ token });
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

userCtrl.getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		if (!users) res.status(400).json({ msg: 'No hay usuarios disponibles' });

		return res.json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

userCtrl.getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);
		if (!user) res.status(400).json({ msg: 'No se encontraron usuarios' });

		return res.json({ user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

userCtrl.updateUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { id } = req.params;
	const data = req.body;

	try {
		const user = await User.findByIdAndUpdate(id, data, { new: true });
		return res.json({ msg: 'Datos actualizados', user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

userCtrl.deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const resp = await User.findByIdAndDelete(id);
		if (!resp) return res.status(400).json({ msg: 'No fue posible eliminar la cuenta' });
		return res.json({ msg: 'Cuenta eliminada' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

userCtrl.blockUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);
		if (!user) return res.status(400).json({ msg: 'No se encontró la cuenta' });
		const block = !user.block;
		const userUpdate = await User.findByIdAndUpdate(id, { block }, { new: true });
		return res.json({ msg: 'Datos actualizados', user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

module.exports = userCtrl;
