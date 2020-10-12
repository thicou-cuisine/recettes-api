import request from 'supertest'
import app from './../app'

describe('/STATUS/*', () => {
  const server = request(app);
  it('Checks up if Database is running', async () => {
    const response = await server.get('/status/database')
    expect(response.status).toBe(200);
  });
  it('Checks up if API is running', async () => {
    const response = await server.get('/status/api')
    expect(response.status).toBe(200);
  });
});
