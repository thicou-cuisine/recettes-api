import User from './../../models/User'

const destroyFakeUser = async () => {
  const fakeUser = await User.findOne({ where: { email: userData.email } })
  if (fakeUser) {
    await fakeUser.destroy()
  }
  return true
}

const createFakeUser = async () => {
  const userInstance = await User.create(userData)
  return userInstance
}

const userData: any = {
  name: 'testman',
  email: 'test@test.com',
  password: 'Thisisatest123!!'
}


export { userData, createFakeUser, destroyFakeUser }

