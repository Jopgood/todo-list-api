import { Response } from 'express';
import { db } from '@/database';
import { Todo } from '@/database/types';
import { AuthRequest } from '@/middleware/auth';

export class TodosController {
  public list = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    // Default values for pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const status = req.query.status as string;
    const search = req.query.search as string;

    // Calculate offset
    const offset = (page - 1) * limit;

    // Build the base query and params array
    let baseQuery = 'SELECT * FROM todos WHERE user_id = ?';
    let countQuery = 'SELECT COUNT(*) as count FROM todos WHERE user_id = ?';
    const params: (string | number | undefined)[] = [userId];

    // Add filters if provided
    if (status) {
      baseQuery += ' AND status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      baseQuery += ' AND (title LIKE ? OR description LIKE ?)';
      countQuery += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // Add ordering and pagination to base query
    baseQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    // Get total count of filtered todos
    const totalCount = db.prepare(countQuery).get(...params) as { count: number };

    // Get paginated and filtered todos
    const todos = db.prepare(baseQuery).all(...params, limit, offset) as Todo[];

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount.count / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    res.json({
      status: 'success',
      data: {
        todos,
        pagination: {
          total: totalCount.count,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage,
          hasPreviousPage,
        },
      },
    });
  };

  public create = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;

    const { title, description } = req.body;

    const result = db
      .prepare(
        'INSERT INTO todos (title, description, status, user_id) VALUES (?, ?, ?, ?) RETURNING ID',
      )
      .run(title, description, 'todo', userId);

    res.json({
      status: 'success',
      data: {
        id: result.lastInsertRowid,
        title,
        description,
      },
    });
  };

  public update = async (req: AuthRequest, res: Response): Promise<void> => {
    const todoId = req.params.id;
    const updatedDate = new Date().toISOString();
    const { title, description } = req.body;

    db.prepare('UPDATE todos SET title = ?, description = ?, updated_at = ? WHERE id = ?').run(
      title,
      description,
      updatedDate,
      todoId,
    );

    res.json({
      status: 'success',
      data: {
        id: todoId,
        title,
        description,
        updatedDate,
      },
    });
  };

  public delete = async (req: AuthRequest, res: Response): Promise<void> => {
    const todoId = req.params.id;

    db.prepare('DELETE FROM todos WHERE id = ?').run(todoId);

    res.status(204);
  };
}
