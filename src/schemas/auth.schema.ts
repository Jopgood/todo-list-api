import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>['body'];
export type LoginSchema = z.infer<typeof loginSchema>['body'];
