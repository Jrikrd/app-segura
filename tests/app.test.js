import request from 'supertest';
import app from '../app/app.js';

describe('App segura', () => {
  it('GET /health debe responder ok:true', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
