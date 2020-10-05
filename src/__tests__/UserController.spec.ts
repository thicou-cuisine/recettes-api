import request from 'supertest'
import app from './../app'
import User from './../models/User'

const userData: any = {
  userName: 'testman',
  userEmail: 'test@test.com',
  userPassword: 'Thisisatest123!!'
}

describe('It performs CRUD operations on User Model', () => {
  const server = request(app)

  it('Creates a User', async () => {
    const response = await server.post('/users/create/').send(userData)
    expect(response.status).toBe(200)
  })

  it('Deletes a user', async () => {
    await User.create({
      name: userData.userName,
      email: userData.userEmail,
      password: userData.userPassword
    })
    const response = await server.delete('/users/delete').send(userData)
    expect(response.status).toBe(200)
  })
})

afterEach(async () => {
  const testUser = await User.findOne({ where: { email: userData.userEmail } })
  if (testUser) {
    await testUser.destroy()
  }
})
