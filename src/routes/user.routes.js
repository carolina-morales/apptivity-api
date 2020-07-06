import { Router } from 'express';
import { check } from 'express-validator';

const {
	signup,
	login,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	blockUser
} = require('../controllers/user.controller.js');
const router = Router();

// get
router.get('/', getUsers);

router.get('/:id', getUser);

// post
router.post(
	'/signup',
	[
		check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio'),
		check('lastname').not().isEmpty().trim().escape().withMessage('Los apellidos son obligatorios'),
		check('email').isEmail().trim().escape().withMessage('Correo no valido'),
		check('password')
			.isLength({ min: 8 })
			.trim()
			.escape()
			.withMessage('La contraseña debe ser minimo de 8 caracteres')
	],
	signup
);

router.post(
	'/login',
	[
		check('email').isEmail().trim().escape().withMessage('Correo no valido'),
		check('password')
			.isLength({ min: 8 })
			.trim()
			.escape()
			.withMessage('La contraseña debe ser minimo de 8 caracteres')
	],
	login
);

// put
router.put(
	'/update/:id',
	[
		check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio'),
		check('lastname').not().isEmpty().trim().escape().withMessage('Los apellidos son obligatorios')
	],
	updateUser
);

router.put('/block/:id', blockUser);

// delete
router.put('/delete/:id', deleteUser);

module.exports = router;
