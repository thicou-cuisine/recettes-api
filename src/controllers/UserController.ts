import dbclient from "./../utils/database-connector"

const express = require('express');
const router = express.Router();

// Create a user
router.post("/create", async (req, res) => {
  console.log('User create body', req.body)
  const { userName, userEmail} = req.body
  const newUser = await dbclient.user.create({
    data: {
      name: userName,
      email: userEmail,
    },
  })
  return res.send(newUser).status(200)
})

export default router