import express from 'express'
import User from './../models/User'

const router = express.Router()

// Create a user
router.post('/create', async (req: any, res: any) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.send('Invalid input').status(401)
  }

  const newUser = await User.create({
    name,
    email,
    password
  }).catch((err: any) => {
    req.log.error(`User - create failed`)
    req.log.error(err)
  })

  if (!newUser) {
    return res.send('Invalid Input').status(401)
  }
  req.log.info(`User - create => `, `${name} ${email}`)

  return res.send('User created').status(200)
})

// Deletes a user by email
router.delete('/delete', async (req: any, res: any) => {
  const { email } = req.body

  if (!email) {
    return res.send('Invalid Input').status(401)
  }
  const userInstance = await User.findOne({ where: { email } })

  if (userInstance) {
    const action = await userInstance.destroy()
    res.log.info(`User - destroy => `, `${action}`)
    return res.send('User deleted').status(200)
  }

  return res.send('Invalid Input').status(401)
})

// Update a user by email, pass 'new-${paramName}' to req.body
router.put('/update/', async (req: any, res: any) => {
  const { email } = req.body
  if (!email) {
    return res.send('Invalid Input').status(401)
  }
  const userInstance: any = await User.findOne({ where: { email } })

  if (!userInstance) {
    return res.send('Invalid Input').status(401)
  }
  const keys = Object.keys(userInstance.dataValues)
  // console.log(userInstance)
  for (let item in keys) {
    const prop = `new-${keys[item]}`
    // console.log(prop, keys[item])
    if (req.body[prop]) {
      userInstance[keys[item]] = req.body[prop]
    }
  }
  await userInstance
    .save()
    .catch(() => res.send('Invalid Input').status(401))
  return res.send(userInstance).status(200)
})

router.post('/read', async (req: any, res: any) => {
  const { email } = req.body
  if (!email) {
    return res.send('Invalid Input').status(401)
  }
  const userInstance = User.findOne({ where: { email } })
  if (!userInstance) {
    return res.send('Invalid Input').status(401)
  }
  return res.send(userInstance).code(200)
})

export default router
