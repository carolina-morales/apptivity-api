import { Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../helpers/auth';

const { createTask, updateTask } = require('../controllers/task.controller');
const router = Router();

router.post(
	'/:id_tasklist',
	isAuthenticated,
	[ check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio') ],
	createTask
);

router.put(
	'/:id_task',
	isAuthenticated,
	[ check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio') ],
	updateTask
);

module.exports = router;
