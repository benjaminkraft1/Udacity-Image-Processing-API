import request from 'supertest';
import { app } from '../index';

describe('Test Endpoints', () => {
  it("Request '/' should return staus 200", async () => {
    const result = await request(app)
      .get('/')
      .send();

    expect(result.status).toBe(200);
  });
  it("Request '/api' should return staus 200", async () => {
    const result = await request(app)
      .get('/api')
      .send();

    expect(result.status).toBe(200);
  });
});
