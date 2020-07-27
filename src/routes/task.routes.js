import { Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../helpers/auth';

const { createTask } = require('../controllers/task.controller');
const router = Router();

router.post(
	'/:id_tasklist',
	isAuthenticated,
	[ check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio') ],
	createTask
);

module.exports = router;
