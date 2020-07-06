import { Router } from 'express';
import { check } from 'express-validator';

const { addTasks } = require('../controllers/tasks.controller');
const router = Router();

router.post('/add', [], addTasks);

module.exports = router;
