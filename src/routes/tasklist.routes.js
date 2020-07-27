import { Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../helpers/auth';

const {
	addTaskList,
	getTaskLists,
	getTaskList,
	updateTaskList,
	deleteTaskList,
	getTaskListsByUser
} = require('../controllers/tasklist.controller');
const router = Router();

router.get('/', isAuthenticated, getTaskLists);
router.get('/:taskListId', isAuthenticated, getTaskList);
router.get('/user/:id_user', isAuthenticated, getTaskListsByUser);

router.post(
	'/:id_board',
	[
		check('id_user').not().isEmpty().trim().escape().withMessage('Especifique el usuario'),
		check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio')
	],
	addTaskList
);

router.put(
	'/:taskListId',
	[
		check('userId').not().isEmpty().withMessage('Debe especificar el usuario'),
		check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio')
	],
	updateTaskList
);

router.delete('/:taskListId', deleteTaskList);

module.exports = router;
