import { Router } from 'express';
import { TodosController } from '@/controllers/todos.controller';
import { authenticate } from '@/middleware/auth';

const todosRouter = Router();
const todosController = new TodosController();

todosRouter.use(authenticate);
todosRouter.get('/', todosController.list);

export { todosRouter };
