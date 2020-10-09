import request from 'supertest'
import app from './../app'
import { userData } from './utils'

describe('Can register a user', () => {
  const server = request(app)
  const url = '/auth/register'

  it('validates user input', async () => {
    let response: any
    const emptyUserInput = {}
    const badNameInput = userData
    userData.name = 'Bob Kelso'
    const badPasswordInput = userData
    badPasswordInput.password = 'password'
    const badEmailInput = userData
    badEmailInput.email = `bollock""\t@killyourself.awawd`

    response = await server.post(url).send(emptyUserInput)
    expect(response.status).toEqual(401)
    response = await server.post(url).send(badNameInput)
    expect(response.status).toEqual(401)
    response = await server.post(url).send(badPasswordInput)
    expect(response.status).toEqual(401)
    response = await server.post(url).send(badEmailInput)
    expect(response.status).toEqual(401)
  })
  it('Returns a valid JWT token', async () => {
    const response = await server.post(url).send(userData)
    expect(response.status).toEqual(200)
  })
})
