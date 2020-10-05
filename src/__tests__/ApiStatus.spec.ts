import request from 'supertest'
import app from './../app'

describe('Testing the Status API', () => {
  const server = request(app);
  it('Checks up if API is running', async () => {
    const response = await server.get('/status/database/');
    expect(response.status).toBe(200);
  });
});
