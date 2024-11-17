import request from 'supertest';
import { app } from '../app';

describe('Health Check Endpoint', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });
});