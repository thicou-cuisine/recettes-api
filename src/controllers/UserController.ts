import dbclient from "./../utils/database-connector"
import express from "express"

const router = express.Router();

// Create a user
router.post("/create", async (req : any, res : any) => {
  const { userName, userEmail} = req.body
  const newUser = await dbclient.user.create({
    data: {
      name: userName,
      email: userEmail,
    },
  })
  res.log.info(`User - create => `, `${userName} ${userEmail}`)
  return res.send(newUser).status(200)
})

export default router
