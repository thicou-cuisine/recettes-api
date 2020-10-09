import express from 'express'
import { Request, Response, NextFunction } from 'express'
import User from './../models/User'

const router = express.Router()

// TODO : add a roles & permissions layer

// Create a user
router.post('/create', async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(401).send('Invalid input')
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
    return res.status(401).send('Invalid Input')
  }
  req.log.info(`User - create => `, `${name} ${email}`)

  return res.status(200).send('User created')
})

// Deletes a user by email
router.delete('/delete', async (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    return res.status(401).send('Invalid Input')
  }
  const userInstance = await User.findOne({ where: { email } })

  if (userInstance) {
    const action = await userInstance.destroy()
    req.log.info(`User - destroy => `, `${action}`)
    return res.status(200).send('User deleted')
  }

  return res.status(401).send('Invalid Input')
})

// Update a user by email, pass 'new-${paramName}' to req.body
router.put('/update/', async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) {
    return res.status(401).send('Invalid Input')
  }
  const userInstance: any = await User.findOne({ where: { email } })

  if (!userInstance) {
    return res.status(401).send('Invalid Input')
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
  await userInstance.save().catch(() => res.status(401).send('Invalid Input'))
  return res.status(200).send(userInstance)
})

router.post('/read', async (req: Request, res: Response) => {
  const { email } = req.body
  if (!email) {
    return res.status(401).send('Invalid Input')
  }
  const userInstance = User.findOne({ where: { email } })
  if (!userInstance) {
    return res.status(401).send('Invalid Input')
  }
  return res.status(200).send(userInstance)
})

export default router
