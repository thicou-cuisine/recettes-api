import dbclient from "./../utils/database-connector"

const express = require('express');
const router = express.Router();

// Create a user
router.post("/create", async (req, res) => {
  const { userName, userEmail} = req.body
  const newUser = await dbclient.user.create({
    data: {
      name: userName,
      email: userEmail,
    },
  })
  res.log.info(`User - create => `{userName, userEmail})
  return res.send(newUser).status(200)
})

export default router