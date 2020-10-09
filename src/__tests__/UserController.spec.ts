import request from 'supertest'
import app from './../app'
import User from './../models/User'
import { destroyFakeUser, userData, createFakeUser } from './utils'

describe('It performs CRUD operations on User Model', () => {
  const server = request(app)

  it('Creates a User', async () => {
    const response = await server.post('/users/create/').send(userData)
    expect(response.status).toEqual(200)
  })

  it('Reads a user', async () => {
    await createFakeUser()
    const response = await server
      .post(`/users/read`)
      .send({ email: userData.email })
    expect(response.status).toEqual(200)
  })

  it('Deletes a user', async () => {
    await createFakeUser()
    const response = await server
      .delete('/users/delete')
      .send({ email: userData.email })
    expect(response.status).toEqual(200)
  })

  it('Updates a User', async () => {
    await createFakeUser()
    const response = await server
      .put('/users/update')
      .send({ email: userData.email, 'new-name': 'Bob' })
    const userInstance: any = await User.findOne({
      where: { email: userData.email }
    })
    expect(userInstance.name).toEqual('Bob')
    expect(response.status).toEqual(200)
  })
})

afterEach(async () => {
  destroyFakeUser()
})
