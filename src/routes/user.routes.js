import { Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../helpers/auth';

const {
	signup,
	login,
	getUsers,
	getUser,
	createUser,
	updateUser,
	updatePassword,
	deleteUser,
	blockUser
} = require('../controllers/user.controller.js');
const router = Router();

// get
router.get('/', isAuthenticated, getUsers);
router.get('/:id', isAuthenticated, getUser);

// post
router.post(
	'/',
	[
		check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio'),
		check('lastname').not().isEmpty().trim().escape().withMessage('Los apellidos son obligatorios'),
		check('email').isEmail().trim().escape().withMessage('Correo no valido')
	],
	createUser
);

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
	'/:id',
	[
		check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio'),
		check('lastname').not().isEmpty().trim().escape().withMessage('Los apellidos son obligatorios')
	],
	updateUser
);

router.put(
	'/:id/password',
	[
		check('old_password').not().isEmpty().trim().escape().withMessage('Especifique la contraseña anterior'),
		check('new_password').not().isEmpty().trim().escape().withMessage('Especifique la contraseña nueva'),
		check('confirm_password').not().isEmpty().trim().escape().withMessage('Confirme la contraseña nueva'),
		check('old_password')
			.isLength({ min: 8 })
			.withMessage('La contraseña anterior debe ser minimo de 8 caracteres'),
		check('new_password').isLength({ min: 8 }).withMessage('La contraseña nueva debe ser minimo de 8 caracteres'),
		check('confirm_password')
			.isLength({ min: 8 })
			.withMessage('La contraseña confirmada debe ser minimo de 8 caracteres')
	],
	updatePassword
);

router.put('/block/:id', blockUser);

// delete
router.delete('/:id', deleteUser);

module.exports = router;
