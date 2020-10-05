import express from 'express'
import User from './../models/User'

const router = express.Router()

// Create a user
router.post('/create', async (req: any, res: any) => {
  const { userName, userEmail, userPassword } = req.body
  const newUser = await User.create({
    name: userName,
    email: userEmail,
    password: userPassword
  })
  res.log.info(`User - create => `, `${userName} ${userEmail}`)
  return res.send(newUser).status(200)
})

router.delete('/delete', async (req: any, res: any) => {
  const { userEmail } = req.body
  const userInstance = await User.findOne({ where: { email: userEmail } })
  if (userInstance) {
    const action = await userInstance.destroy()
    res.log.info(`User - destroy => `, `${action}`)
    return res.send(action).status(200)
  }
  return res.send('Error with your query').status(401)
})
export default router
