import { Router } from 'express';
import { check } from 'express-validator';

const {
	addTaskList,
	getTaskLists,
	getTaskList,
	updateTaskList,
	deleteTaskList
} = require('../controllers/tasklist.controller');
const router = Router();

router.get('/', [ check('userId').not().isEmpty().withMessage('Debe especificar el usuario') ], getTaskLists);
router.get('/:taskListId', getTaskList);

router.post(
	'/add/:userId',
	[ check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio') ],
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
