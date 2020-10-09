import request from 'supertest'
import app from './../app'
import { userData } from './utils'

describe('Can register a user', () => {
  const server = request(app)

  it('validates input completion', async () => {
    let response
    const emptyUserInput = {}
    let badNameInput = userData
    userData.name = 'Bob Kelso'
    let badPasswordInput = userData
    badPasswordInput.password = 'password'
    let badEmailInput = userData
    badEmailInput.email = `bollock""\t@killyourself.awawd`

    response = await server.post('/register').send(emptyUserInput)
    expect(response.status).toEqual(401)
    response = await server.post('/register').send(badNameInput)
    expect(response.status).toEqual(401)
    response = await server.post('/register').send(badPasswordInput)
    expect(response.status).toEqual(401)
    response = await server.post('/register').send(badEmailInput)
    expect(response.status).toEqual(401)
   
    // TODO : return valid jwt token

    response = await server.post('/register').send(userData)
    expect(response.status).toEqual(200)

  })
