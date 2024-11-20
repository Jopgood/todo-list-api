import { Router } from 'express';
import { TodosController } from '@/controllers/todos.controller';
import { authenticate } from '@/middleware/auth';

const todosRouter = Router();
const todosController = new TodosController();

todosRouter.use(authenticate);
todosRouter.get('/', todosController.list);
todosRouter.post('/', todosController.create);
todosRouter.put('/:id', todosController.update);
todosRouter.delete('/:id', todosController.delete);

export { todosRouter };
