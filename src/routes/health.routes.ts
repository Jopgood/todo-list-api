import { Router } from 'express';
import { HealthController } from '@/controllers/health.controller';

const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get('/', healthController.check);

export { healthRouter };
