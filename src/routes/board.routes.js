import { Router } from 'express';
import { check } from 'express-validator';
import { isAuthenticated } from '../helpers/auth';

const { getBoard, getBoardsByUser, createBoard } = require('../controllers/boards.controller');
const router = Router();

router.get('/:id_board', isAuthenticated, getBoard);
router.get('/user/:id_user', isAuthenticated, getBoardsByUser);

router.post(
	'/:id_user',
	isAuthenticated,
	[ check('name').not().isEmpty().trim().escape().withMessage('El nombre es obligatorio') ],
	createBoard
);

module.exports = router;
