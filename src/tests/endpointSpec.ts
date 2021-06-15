import request from 'supertest';
import images from '../routes/api/images';
import routes from '../routes/api/routes';

describe('Test Images Endpoint', () => {
  it("Request '/' should return staus 200", async () => {
    const result = await request(images).get('/').send();

    expect(result.status).toBe(200);
  });
});

describe('Test API Endpoint', () => {
    it("Request '/' should return staus 200", async () => {
        const result = await request(routes).get('').send();

        expect(result.status).toBe(200);
    });
});
  