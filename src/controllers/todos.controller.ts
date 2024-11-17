import { Response } from 'express';
import { db } from '@/database';
import { Todo } from '@/database/types';
import { AuthRequest } from '@/middleware/auth';

export class TodosController {
  public list = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    const todos = db
      .prepare('SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC')
      .all(userId) as Todo[];

    res.json({
      status: 'success',
      data: {
        todos,
      },
    });
  };
}
