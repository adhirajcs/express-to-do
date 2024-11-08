import express from 'express';
import { fetchTodos, insertTodo } from '../controllers/todosController';

const router = express.Router();

// Route to fetch all todos
router.get('/', fetchTodos);

// Route to insert a new todo
router.post('/', insertTodo);

export default router;
